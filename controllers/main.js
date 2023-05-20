'use strict';
const Post = require('../models/Post');

const home = async (req, res) => {
  // to-do how to handle async/await in express without the try/catch block
  const locals = {
    title: "ascribe",
    description: "A blog built with NodeJS, Express and MongoDB",
  };
  const { sort } = req.query;
  const queryObject = {};
  let result = Post.find(queryObject);

  // sort
  if (sort) {
    const sortList = result.split(',').join(' ');
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
  // Query.protype.count() deprecated -> countDocuments()
  const count = await Post.countDocuments({});
  const nextPage = page + 1;
  const hasNextPage = nextPage <= Math.ceil(count / limit);
  
  res.render('index', { 
    locals, 
    data,
    current: page,
    nextPage: hasNextPage ? nextPage : null
   });

};

function getPostData() {
  Post.insertMany([
    {
      title: "Blog One",
      body: "Blog post one",
    },
    {
      title: "Blog Two",
      body: "Blog post two",
    },
    {
      title: "Blog Three",
      body: "Blog post three",
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



const about = (req, res) => {
  res.render('about');
};

module.exports = { home, about };