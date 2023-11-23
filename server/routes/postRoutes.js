const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const Entry = require('../models/Entry');

const { secretKey } = require("../config");

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

router.put('/:id', async (req, res) => {
  try {
    const { title, summary, content, cover, tags, likes } = req.body;
    const { token } = req.cookies;
    const postId = req.params.id; // Extract the post ID from the URL parameter

    jwt.verify(token, secretKey, async (err, decoded) => {
      if (err) {
        console.error("Token verification failed:", err.message);
        res.status(401).json({ error: 'Unauthorized' });
      } else {
        // Find the entry by ID and update its fields
        const updatedEntry = await Entry.findByIdAndUpdate(
          postId,
          {
            title,
            summary,
            content,
            cover,
            tags,
            likes,
            author: decoded.id,
          },
          { new: true } // Return the updated entry
        );

        if (!updatedEntry) {
          return res.status(404).json({ error: 'Entry not found' });
        }

        res.status(200).json(updatedEntry);
      }
    });
  } catch (error) {
    console.error("Error updating entry:", error);
    res.status(500).json({ error: "Failed to update entry" });
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

router.get('/:id', async (req, res) => {
  const {id} = req.params;
  const postDoc = await Entry.findById(id).populate('author', ['username']);
  res.json(postDoc);
})

module.exports = router;
