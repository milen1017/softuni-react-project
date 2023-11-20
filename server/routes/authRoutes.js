const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { secretKey } = require("../config");

router.post('/register', async (req, res) => {
  //todo create session redirect ro home 
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
    res.status(400).json(e.message || 'An error occurred during registration');
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const userData = await User.findOne({ username });

    if (!userData) {
      return res.status(400).json('User not found');
    }

    const passOk = bcrypt.compareSync(password, userData.hashedPassword);
    if (passOk) {
      const token = jwt.sign({ username, id: userData._id }, secretKey);
      res.cookie('token', token).json({
        id: userData._id,
        username,
      });
    } else {
      res.status(400).json('Wrong credentials');
    }
  } catch (e) {
    console.error(e);
    res.status(400).json(e.message || 'An error occurred during login');
  }
});


router.get('/profile', (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      console.error("Token verification failed:", err.message);
      res.status(401).json({ error: 'Unauthorized' });
    } else {
      //   console.log('Token verified. Decoded payload:', decoded);
      res.json(decoded);
    }
  });
});


router.post('/logout', (req, res) => {
  res.cookie('token', '').json('ok');
   //todo redirect ro home 
});

module.exports = router;
