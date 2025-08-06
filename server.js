const express = require('express');
console.log('🔌 Routes connected: /api/posts');

const cors = require('cors');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

const authRoutes = require('./routes/auth');
const orderRoutes = require('./routes/order');
const giftRoutes = require('./routes/gift');
const postsRoutes = require('./routes/posts'); 

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// route-lar
app.use('/api', authRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/gift', giftRoutes);
app.use('/api/posts', postsRoutes); 

// test route
app.get('/', (req, res) => {
  res.send('Bitter Soul Backend işləyir ☕');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server: http://localhost:${PORT}`);
});
