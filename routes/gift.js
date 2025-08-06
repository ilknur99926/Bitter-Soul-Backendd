
const express = require('express');
const router = express.Router();

const gifts = [];

router.get('/', (req, res) => {
  res.json(gifts);
});

router.post('/', (req, res) => {
  const gift = req.body;
  gifts.push(gift);
  console.log('Yeni qəhvə hədiyyə edildi:', gift);
  res.status(200).json({ message: 'Qəhvə əlavə olundu' });
});

module.exports = router;
