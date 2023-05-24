'use strict';
const Post = require('../models/Post');
const adminLayout = '../views/layouts/admin';

const dashboard = async (req, res) => {
  const locals = {
    title: "Dashboard",
    description: "A blog built with NodeJS, Express and MongoDB",
  };

  res.render('post/dashboard', { locals, layout: adminLayout });
};

module.exports = {
  dashboard,
};
