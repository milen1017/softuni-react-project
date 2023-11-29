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
        avatar: userData.avatar
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

  try {
    jwt.verify(token, secretKey, async (err, decoded) => {
      if (err) {
        console.error("Token verification failed:", err.message);
        return res.status(401).json({ error: 'Unauthorized' });
      }

      
      const user = await User.findById(decoded.id);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Respond with the user data
      res.json({
        id: user._id,
        username: user.username,
        avatar: user.avatar
        // Add other user information you want to send
      });
    });
  } catch (error) {
    console.error("Error fetching user profile:", error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.put('/change-avatar', async (req, res) => {
  const { token } = req.cookies;
  const { avatar } = req.body;

  try {
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    const decoded = jwt.verify(token, secretKey);

   
    const updatedUser = await User.findByIdAndUpdate(decoded.id, { avatar }, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ avatar: updatedUser.avatar });
  } catch (error) {
    console.error("Error changing avatar:", error);
    res.status(500).json({ error: 'An error occurred while changing the avatar' });
  }
});


router.post('/logout', (req, res) => {
  res.cookie('token', '').json('ok');
  
});

module.exports = router;
