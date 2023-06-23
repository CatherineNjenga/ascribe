'use strict';
const { dashboard, addPost, createPost, deletePost, editPost, getEditPost, logout } = require('../controllers/post');
const express = require('express'),
  router = express.Router();

router.route('/dashboard').get(dashboard);
router.route('/add-post').get(addPost);
router.route('/add-post').post(createPost);
router.route('/delete-post/:id').delete(deletePost);
router.route('/edit-post/:id').put(editPost);
router.route('/edit-post/:id').get(getEditPost);
router.route('/logout').get(logout);


module.exports = router;


