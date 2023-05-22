'use strict';
const mongoose = require('mongoose');
const CategorySchema = new mongoose.Schema({
  title: {
    // type: String,
    // required: [true, 'Please provide blog category'],
    // enum: ['books', 'career', 'personal'],
  }
});

module.exports = mongoose.model('Category', CategorySchema);