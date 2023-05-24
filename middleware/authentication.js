// const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');

const auth = async (req, res, next) => {
  const token = req.cookies.token;
  
  if (!token) {
    return res.status(StatusCodes.UNAUTHORIZED).send('Unauthorized');
  }

  jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
    if (err) {
      return res.status(StatusCodes.UNAUTHORIZED).send('Invalid Credentials');
    }
    req.user = { userId: decoded.userId, name: decoded.username };
    next();
  });
};

module.exports = auth;
