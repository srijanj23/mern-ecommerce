const Product = require('../models/Product');

exports.addProduct = async (req, res) => {
  try {
    if (Array.isArray(req.body)) {
      const products = await Product.insertMany(req.body);
      res.json(products);
    } else {
      const {
        name,
        price,
        size,
        category,
        quantity,
        isGST,
        imageURL,
        manufacturingDate,
        expiryDate,
      } = req.body;

      const newProduct = new Product({
        name,
        price,
        size,
        category,
        quantity,
        isGST,
        imageURL,
        manufacturingDate,
        expiryDate,
      });

      const product = await newProduct.save();
      res.json(product);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getOneProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Product not found' });
    }
    res.status(500).send('Server Error');
  }
};

exports.updateProduct = async (req, res) => {
  const {
    name,
    price,
    size,
    category,
    quantity,
    isGST,
    imageURL,
    manufacturingDate,
    expiryDate,
  } = req.body;

  try {
    let product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }

    product.name = name || product.name;
    product.price = price || product.price;
    product.size = size || product.size;
    product.category = category || product.category;
    product.quantity = quantity || product.quantity;
    product.isGST = isGST === undefined ? product.isGST : isGST;
    product.imageURL = imageURL || product.imageURL;
    product.manufacturingDate = manufacturingDate || product.manufacturingDate;
    product.expiryDate = expiryDate || product.expiryDate;

    product = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: product },
      { new: true }
    );

    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }

    product.isActive = false;
    await product.save();

    res.json({ msg: 'Product removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.restoreProduct = async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }

    product.isActive = true;
    await product.save();

    res.json({ msg: 'Product restored' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getProductsByCategory = async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.category, isActive: true });
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.sortProducts = async (req, res) => {
  try {
    const { field, order } = req.params;
    const sortOrder = order === 'desc' ? -1 : 1;
    const products = await Product.find({ isActive: true }).sort({ [field]: sortOrder });
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.filterProductsByDate = async (req, res) => {
  try {
    const { from, to } = req.body;
    const products = await Product.find({
      manufacturingDate: {
        $gte: new Date(from),
        $lte: new Date(to),
      },
      isActive: true,
    });
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};