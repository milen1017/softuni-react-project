const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const Entry = require('../models/Entry');

const secretKey = crypto.randomBytes(32).toString('base64');

router.post('/', async (req, res) => {
  try {
    const { title, summary, content, cover, tags, likes } = req.body;
    const { token } = req.cookies;

    jwt.verify(token, secretKey, async (err, decoded) => {
      if (err) {
        console.error("Token verification failed:", err.message);
        res.status(401).json({ error: 'Unauthorized' });
      } else {
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
    res.status(500).json({ error: "Failed to create entry" });
  }
});

router.get('/', async (req, res) => {
  try {
    const entries = await Entry.find().populate('author', ['username']);
    res.json(entries);
  } catch (error) {
    console.error("Error fetching entries:", error);
    res.status(500).json({ error: "Failed to fetch entries" });
  }
});

module.exports = router;
