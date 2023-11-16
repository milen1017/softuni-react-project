const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const User = require("./models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const app = express();
require("dotenv").config();

const { DB_CONNECTION, PORT } = process.env;
const secretKey = crypto.randomBytes(32).toString("base64");


app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));

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

app.listen(PORT, () => {
	console.log(`Server is running at port ${PORT}`);
});
