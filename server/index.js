const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const User = require("./models/User");
const bcrypt = require('bcrypt');
const app = express();

app.use(cors());
app.use(express.json());

 mongoose.connect(
	"mongodb+srv://softuni-react-project:TyR8e72pYssRxegY@cluster0.la2gkzx.mongodb.net/?retryWrites=true&w=majority"
);

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

