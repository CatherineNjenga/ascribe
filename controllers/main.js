'use strict';
const home = (req, res) => {
  const locals = {
    title: "ascribe",
    description: "A blog built with NodeJS, Express and MongoDB",
  };

  res.render('index', { locals });
};

const about = (req, res) => {
  res.render('about');
};

module.exports = { home, about };