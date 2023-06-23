'use strict';
const Post = require('../models/Post');

/**
 * GET /
 * HOME
 */

const home = async (req, res) => {
  // to-do how to handle async/await in express without the try/catch block
  // to-do, possible to not repeat this variable in every route?
  const locals = {
    title: "ascribe",
    description: "A blog built with NodeJS, Express and MongoDB",
  };
  const { sort } = req.query;
  const queryObject = {};
  let result = Post.find(queryObject);

  // sort
  if (sort) {
    const sortList = sort.split(',').join(' ');
    result = result.sort(sortList);
  } else {
    // to-do how to sort -1 from this point
    result = result.sort({ createdAt: -1 });
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  result = result.skip(skip).limit(limit);

  const data = await result;
  // to-do research on mongoose count method on the schema
  // should we use a callback function/not necessarily
  // Query.prototype.count() deprecated -> countDocuments()
  const count = await Post.countDocuments({});
  const nextPage = page + 1;
  const hasNextPage = nextPage <= Math.ceil(count / limit);
  
  res.render('index', { 
    locals, 
    data,
    current: page,
    nextPage: hasNextPage ? nextPage : null,
    currentRoute: '/',
   });

};

/**
 * GET /
 * Post
 */

const post = async (req, res) => {
  const { id: postId } = req.params;
  const data =  await Post.findById({ _id: postId });
  const locals = {
    title: data.title,
    description: "A blog built with NodeJS, Express and MongoDB",
  };
  res.render('post', { locals, data, currentRoute: `/post/${postId}` });
};

/**
 * GET
 * Search
 */

const search = async (req, res) => {
  const locals = {
    title: "search results",
    description: "A blog built with NodeJS, Express and MongoDB",
  };

  const searchTerm = req.body.searchTerm;
  const searchNoSpecialChar = searchTerm.replace(/[^0-9A-Za-z]/g, "");
  const data = await Post.find({
    $or: [
      { title: { $regex: searchNoSpecialChar, $options: 'i' }},
      { body: { $regex: searchNoSpecialChar, $options: 'i' }},
    ]
  });
  
  res.render('search', {
    locals,
    data,
    currentRoute: '/',
  });
};

const about = (req, res) => {
  res.render('about', {currentRoute: '/about'} );
};

const contact = (req, res) => {
  res.render('contact', {currentRoute: '/contact'} );
};

function getPostData() {
  Post.insertMany([
    {
      title: "Blog One",
      body: "Blog post one",
      // categories: ['career', 'personal'],
    },
    {
      title: "Blog Two",
      body: "Blog post two",
      // categories: ['career', 'personal'],
    },
    {
      title: "Blog Three",
      body: "Blog post three",
      // categories: ['career', 'personal'],
    },
    {
      title: "Blog Four",
      body: "Blog post four",
    },
    {
      title: "Blog Five",
      body: "Blog post five",
    },
    {
      title: "Blog Six",
      body: "Blog post six",
    },
      {
      title: "Blog Seven",
      body: "Blog post seven",
    },
    {
      title: "Blog Eight",
      body: "Blog post eight",
    },
    {
      title: "Blog Nine",
      body: "Blog post nine",
    },
    {
      title: "Blog Ten",
      body: "Blog post ten",
    },
    {
      title: "Blog Eleven",
      body: "Blog post eleven",
    }
  ]);
}

// getPostData();

module.exports = { home, about, post, search, contact };