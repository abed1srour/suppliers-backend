const express = require('express');
const router = express.Router();
const {
  getAllCategories,
  createCategory,
  deleteCategory,
} = require('../controllers/categoryController');
const protect = require('../middleware/authMiddleware');

router.get('/', getAllCategories);
router.post('/', protect, createCategory);
router.delete('/:id', protect, deleteCategory);

module.exports = router;
