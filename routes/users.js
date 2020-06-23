const express = require('express');
const router = express.Router();
// @route POST api/users
// @desc REgister a user
// @access PUblic
router.post('/', (req, res) => {
  res.send('Register a user');
});
module.exports = router;
