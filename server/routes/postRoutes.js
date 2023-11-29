const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Entry = require('../models/Entry');
const User = require('../models/User');


const { secretKey } = require("../config");

//todo add guards

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
          { new: true } 
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
router.delete('/:id', async (req, res) => {
  const postId = req.params.id;

  try {
    const deletedPost = await Entry.findByIdAndDelete(postId);

    if (!deletedPost) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ error: 'Failed to delete post' });
  }
});

router.get('/', async (req, res) => {
  try {
    const searchTerm = req.query.q; // Get the search term from the query parameter

    let entries;
    if (searchTerm) {
      // If a search term is provided, perform a search query across multiple fields
      entries = await Entry.find({
        $or: [
          { title: { $regex: new RegExp(searchTerm, 'i') } },
          { summary: { $regex: new RegExp(searchTerm, 'i') } },
          { content: { $regex: new RegExp(searchTerm, 'i') } },
          { tags: { $regex: new RegExp(searchTerm, 'i') } }
          // Add more fields as needed for the search
        ]
      }).populate('author', ['username']);
    } else {
      // If no search term is provided, fetch all entries
      entries = await Entry.find().sort({ createdAt: -1 }).populate('author', ['username']);
    }

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

router.put('/:id/like', async (req, res) => {
  const { id } = req.params;

  // Retrieve the token from cookies
  const { token } = req.cookies;// Check the cookie name for the token

  try {
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }
    const decoded = jwt.verify(token, secretKey);
   
    const user = await User.findById(decoded.id);
    // Retrieve the post by ID
    const post = await Entry.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    if (user.likedPosts.includes(id)) {
      return res.status(400).json({ error: 'User has already liked the post' });
    }
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Check if the post is not already in the user's likedPosts array
    if (!user.likedPosts.includes(id)) {
      user.likedPosts.push(id);
      await user.save();
    }

    // Increment the like count by 1 (adjust based on your requirements)
    post.likes += 1;

    // Save the updated post with the incremented like count
    await post.save();

    res.json({ message: 'Like count updated successfully', likes: post.likes });
  } catch (error) {
    console.error('Error updating like count:', error.message);
    if (error.name === 'JsonWebTokenError') {
      res.status(401).json({ error: 'Unauthorized' });
    } else {
      res.status(500).json({ error: 'Server error' });
    }
  }
});

module.exports = router;
