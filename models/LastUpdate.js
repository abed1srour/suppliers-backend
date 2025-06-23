const mongoose = require('mongoose');

const lastUpdateSchema = new mongoose.Schema({
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('LastUpdate', lastUpdateSchema);
