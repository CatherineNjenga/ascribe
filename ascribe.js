'use strict';
require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts');
const connectDB = require('./db/connect');

const app = express();
const port = process.env.PORT || 3000;


const mainRouter = require('./routes/main');
const adminRouter = require('./routes/admin');
const postRouter = require('./routes/post');
const authUser = require('./middleware/authentication');

// cookies
const cookieParser = require('cookie-parser');

// sessions
const expressSession = require('express-session');
const MongoStore = require('connect-mongo');

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(expressSession({
  cookie: { signed: true, maxAge: 3600000 },
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
  })
}));

app.use(express.static('public'));

// decode request params url, request body's json
app.use(express.urlencoded( { extended: false }));
app.use(express.json());

// Templating Engine
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

// routes
app.use('/', mainRouter);
app.use('/', adminRouter);
app.use('/', authUser, postRouter);

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