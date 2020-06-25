const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  //   get toeken
  const token = req.header('x-auth-token');
  if (!token) {
    res.status(401).json({ msg: 'no token auth denied' });
  }
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: 'token not valid' });
  }
};
