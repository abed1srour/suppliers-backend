const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getLastUpdate,
} = require('../controllers/productController');
const protect = require('../middleware/authMiddleware');

// Get last update date
router.get('/last-update', getLastUpdate);

router.get('/', getAllProducts);
router.post('/', protect, createProduct);
router.put('/:id', protect, updateProduct);
router.delete('/:id', protect, deleteProduct);

module.exports = router;
