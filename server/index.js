const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const User = require("./models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require('crypto');
const app = express();
require("dotenv").config();

const { DB_CONNECTION } = process.env;
const secretKey = crypto.randomBytes(32).toString('base64');

app.use(cors({credentials:true,origin:"http://localhost:5173"}));
app.use(express.json());

mongoose
	.connect(process.env.DB_CONNECTION)
	.then(() => {
		console.log("Connected to database");
	})
	.catch((error) => {
		console.error("Error connecting to database:", error);
	});

app.post("/register", async (req, res) => {
	const { username, password } = req.body;
	const hashedPassword = await bcrypt.hash(password, 10);
	try {
		const userDoc = await User.create({
			username,
			hashedPassword,
		});
		res.json(userDoc);
	} catch (e) {
		console.log(e);
		res.status(400).json(e);
	}
});

app.post("/login", async (req, res) => {
	const { username, password } = req.body;
	const userData = await User.findOne({ username });

	const passOk = bcrypt.compareSync(password, userData.hashedPassword);
	if (passOk) {
		jwt.sign({ username, id: userData._id }, secretKey, {}, (err, token) => {
			if (err) throw err;
			res.cookie("token", token).json({
				id: userData._id,
				username,
			});
		});
	} else {
		res.status(400).json("Wrong credentials");
	}
});

app.listen(3000, console.log("Server is running at port 3000"));
