const express = require('express');
const router = express.Router();
const {
  addToCart,
  removeFromCart,
  getCart,
} = require('../controllers/cartController');

router.post('/', addToCart);
router.delete('/:id', removeFromCart);
router.get('/', getCart);

module.exports = router;