'use strict';
require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts');

const app = express();
const port = process.env.PORT || 3000;

const mainRouter = require('./routes/main');

app.use(express.static('public'));

// Templating Engine
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

// routes
app.use('/', mainRouter);

app.listen(port, () => {
  console.log(`Server listening on port: ${port}...`);
});
