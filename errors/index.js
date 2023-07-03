'use strict';

const BadRequestError = require('./bad-request');
const CustomError = require('./custom-api');
const NotFoundError = require('./not-found');
const UnauthenticatedError = require('./unauthenticated');

module.exports ={
  BadRequestError,
  CustomError,
  NotFoundError,
  UnauthenticatedError
};