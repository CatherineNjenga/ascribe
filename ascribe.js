'use strict';
require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts');
const connectDB = require('./db/connect');

const app = express();
const port = process.env.PORT || 3000;

const mainRouter = require('./routes/main');
const { connect } = require('mongoose');

app.use(express.static('public'));
app.use(express.urlencoded( { extended: false }));
app.use(express.json());

// Templating Engine
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

// routes
app.use('/', mainRouter);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server listening on port: ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();

    


