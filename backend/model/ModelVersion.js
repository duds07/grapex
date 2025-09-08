const mongoose = require('mongoose');

const modelVersionSchema = new mongoose.Schema({
  version: { type: Number, required: true },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ModelVersion', modelVersionSchema);
