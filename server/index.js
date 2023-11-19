const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const User = require("./models/User");
const Entry = require("./models/Entry");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const cookieParser = require("cookie-parser");
const { log } = require("console");
const app = express();
require("dotenv").config();

const { DB_CONNECTION, PORT } = process.env;
const secretKey = crypto.randomBytes(32).toString("base64");

app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(cookieParser());

mongoose
	.connect(`${DB_CONNECTION}`)
	.then(() => {
		console.log("Connected to database");
	})
	.catch((error) => {
		console.error("Error connecting to database:", error);
	});

app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send("Something broke!");
});

app.post("/register", async (req, res) => {
	const { username, password } = req.body;
	try {
		const hashedPassword = await bcrypt.hash(password, 10);
		const userDoc = await User.create({
			username,
			hashedPassword,
		});
		res.json(userDoc);
	} catch (e) {
		console.error(e);
		res.status(400).json(e.message || "An error occurred during registration");
	}
});

app.post("/login", async (req, res) => {
	const { username, password } = req.body;
	try {
		const userData = await User.findOne({ username });

		if (!userData) {
			return res.status(400).json("User not found");
		}

		const passOk = bcrypt.compareSync(password, userData.hashedPassword);
		if (passOk) {
			const token = jwt.sign({ username, id: userData._id }, secretKey);
			res.cookie("token", token).json({
				id: userData._id,
				username,
			});
		} else {
			res.status(400).json("Wrong credentials");
		}
	} catch (e) {
		console.error(e);
		res.status(400).json(e.message || "An error occurred during login");
	}
});

app.get("/profile", (req, res) => {
	const { token } = req.cookies;
	jwt.verify(token, secretKey, (err, decoded) => {
		if (err) {
			console.error("Token verification failed:", err.message);
		} else {
			//   console.log('Token verified. Decoded payload:', decoded);
			res.json(decoded);
		}
	});
});

app.post("/posts", async (req, res) => {
	//todo optimise getting author from cookie
	try {
		const { title, summary, content, cover, tags, likes } = req.body;
		const { token } = req.cookies;
		jwt.verify(token, secretKey, async (err, decoded) => {
			if (err) {
				console.error("Token verification failed:", err.message);
			} else {
				console.log("Token verified. Decoded payload:", decoded);
				
				const newEntry = new Entry({
					title,
					summary,
					content,
					cover,
					tags,
					likes,
					 author: decoded.id,
				});

				
				const savedEntry = await newEntry.save();

				res.status(201).json(savedEntry); 
			}
		});
	} catch (error) {
		console.error("Error creating entry:", error);
		res.status(500).json({ error: "Failed to create entry" }); // todo handle error response
	}
});

app.post("/logout", (req, res) => {
	res.cookie("token", "").json("ok");
});

app.listen(PORT, () => {
	console.log(`Server is running at port ${PORT}`);
});
