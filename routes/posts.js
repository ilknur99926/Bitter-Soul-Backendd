const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const postsFile = path.join(__dirname, '../data/posts.json');

//  Bütün postları al
router.get('/', (req, res) => {
  try {
    const posts = JSON.parse(fs.readFileSync(postsFile, 'utf-8'));
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Fayl oxunmadı', error: err.message });
  }
});

//  Yeni post əlavə et
router.post('/', (req, res) => {
  const { title, content, category, author, date } = req.body;

  if (!title || !content || !category || !author || !date) {
    return res.status(400).json({ success: false, message: 'Məlumatlar tam deyil' });
  }

  const posts = JSON.parse(fs.readFileSync(postsFile, 'utf-8'));
  const newPost = {
    id: Date.now().toString(),
    title,
    content,
    category,
    author,
    date,
    likes: 0,
    comments: []
  };

  posts.unshift(newPost);
  fs.writeFileSync(postsFile, JSON.stringify(posts, null, 2));

  res.status(201).json(newPost);
});

module.exports = router;
