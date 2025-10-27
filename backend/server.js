const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/mern-ecommerce")
    .then(() => console.log('MongoDB connected'))
    .catch(err => {
        console.error(err.message);
        
    });

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/cart', require('./routes/cartRoutes'));

const PORT = 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));