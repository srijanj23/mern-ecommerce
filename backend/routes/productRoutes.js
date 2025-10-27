const express = require('express');
const router = express.Router();
const {
  addProduct,
  getAllProducts,
  getOneProduct,
  updateProduct,
  deleteProduct,
  restoreProduct,
  getProductsByCategory,
  sortProducts,
  filterProductsByDate,
} = require('../controllers/productController');

router.post('/', addProduct);
router.get('/', getAllProducts);
router.get('/:id', getOneProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);
router.put('/restore/:id', restoreProduct);
router.get('/category/:category', getProductsByCategory);
router.get('/sort/:field/:order', sortProducts);
router.post('/filter-by-date', filterProductsByDate);

module.exports = router;