'use strict';
const Post = require('../models/Post');
const adminLayout = '../views/layouts/admin';

const dashboard = async (req, res) => {
  const locals = {
    title: "Dashboard",
    description: "A blog built with NodeJS, Express and MongoDB",
  };
  const data = await Post.find({});
  res.render('post/dashboard', { 
    locals, 
    data,
    layout: adminLayout });
};

const addPost = async (req, res) => {
  const locals = {
    title: "Add Post",
    description: "A blog built with NodeJS, Express and MongoDB",
  };
  const data = await Post.find({});
  res.render('post/add-post', { 
    locals,
    data,
    layout: adminLayout });
};

const createPost = async (req, res) => {
  const newPost = new Post ({
    title: req.body.title,
    body: req.body.body,
  });
  await Post.create(newPost);
  res.redirect('/dashboard');
};

const getEditPost = async (req, res) => {
  const locals = {
    title: "Edit Post",
    description: "A blog built with NodeJS, Express and MongoDB",
  };

  const data = await Post.findOne({ _id: req.params.id});

  await Post.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    body: req.body.body,
    updatedAt: Date.now(),
  });
  res.render('post/edit-post', {
    locals,
    data,
    layout: adminLayout,
  });
};

const editPost = async (req, res) => {
  await Post.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    body: req.body.body,
    updatedAt: Date.now(),
  });
  res.redirect(`/edit-post/${req.params.id}`);
};

const deletePost = async (req, res) => {
  const locals = {
    title: "Edit Post",
    description: "A blog built with NodeJS, Express and MongoDB",
  };

  await Post.deleteOne({ _id: req.params.id});
  res.redirect('/dashboard');
};

const logout = async (req, res) => {
  res.clearCookie('token');
  res.redirect('/');
};

module.exports = {
  dashboard,
  addPost,
  createPost,
  deletePost,
  editPost,
  getEditPost,
  logout,
};
