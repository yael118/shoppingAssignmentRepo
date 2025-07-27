const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const orderRoutes = require('./routes/order');

const app = express();
const PORT = process.env.PORT || 3001;
//Yael mongo connection
mongoose.connect('mongodb+srv://kleinyael118:mQQAU2PAYvxyoUWl@cluster0.9vq7xva.mongodb.net/shoppingDetails?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/orders', orderRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Orders API server running on port ${PORT}`);
});