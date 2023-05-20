'use strict';

const mongoose = require('mongoose');
const PostSchema = new mongoose.Schema({
  categories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    // required: [true, 'Please input blog category'],
  }],
  title: {
    type: String,
    required: [true, 'Please input blog title'],
  },
  body: {
    type: String,
    required: [true, "Please provide the blog's body"],
  },
}, {timestamps: true});

module.exports = mongoose.model('Post', PostSchema);