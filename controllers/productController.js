const Product = require('../models/Product');
const LastUpdate = require('../models/LastUpdate');

// Helper to update the last update date
async function touchLastUpdate() {
  await LastUpdate.findOneAndUpdate({}, { updatedAt: Date.now() }, { upsert: true });
}

// @desc    Get last update date
exports.getLastUpdate = async (req, res) => {
  try {
    const last = await LastUpdate.findOne({});
    res.json({ updatedAt: last ? last.updatedAt : null });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc    Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('category');
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc    Create new product
exports.createProduct = async (req, res) => {
  try {
    console.log('🔍 Received request body:', req.body);
    console.log('�� Request headers:', req.headers);
    
    const product = new Product(req.body);
    console.log('🔍 Product object created:', product);
    
    await product.save();
    console.log('✅ Product saved successfully');
    await touchLastUpdate();
    res.status(201).json(product);
  } catch (err) {
    console.error('❌ Product creation error:', err);
    console.error('❌ Error message:', err.message);
    res.status(400).json({ error: err.message });
  }
};

// @desc    Update product
exports.updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ error: 'Product not found' });
    await touchLastUpdate();
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// @desc    Delete product
exports.deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Product not found' });
    await touchLastUpdate();
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};