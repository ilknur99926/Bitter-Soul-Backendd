
const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  const order = req.body;
  console.log('Yeni sifariş gəldi:', order);
  res.status(200).json({ message: 'Sifariş uğurla alındı' });
});

module.exports = router;
