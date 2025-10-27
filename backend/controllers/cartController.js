const Cart = require('../models/Cart');
const Product = require('../models/Product');

exports.addToCart = async (req, res) => {
  const { name, price } = req.body;

  try {
    const newCartItem = new Cart({
      name,
      price,
    });

    const cartItem = await newCartItem.save();
    res.json(cartItem);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const cartItem = await Cart.findById(req.params.id);

    if (!cartItem) {
      return res.status(404).json({ msg: 'Item not found in cart' });
    }

    await Cart.findByIdAndDelete(req.params.id);

    res.json({ msg: 'Item removed from cart' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getCart = async (req, res) => {
  try {
    const cartItems = await Cart.find();
    const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);
    res.json({ cartItems, totalPrice });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};