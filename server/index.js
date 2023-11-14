const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const User = require("./models/User");
const bcrypt = require('bcrypt');
const app = express();
require('dotenv').config();

const { DB_CONNECTION } = process.env;

app.use(cors());
app.use(express.json());



mongoose.connect(process.env.DB_CONNECTION)
  .then(() => {
    console.log('Connected to database');
  })
  .catch((error) => {
    console.error('Error connecting to database:', error);
  });

app.post('/register', async (req,res) => {
    const {username,password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try{
      const userDoc = await User.create({
        username,
        hashedPassword
      });
      res.json(userDoc);
    } catch(e) {
      console.log(e);
      res.status(400).json(e);
    }
  });

app.listen(3000);

