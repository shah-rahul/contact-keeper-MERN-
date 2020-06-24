const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); 
const { body, validationResult } = require('express-validator');
const User = require('../model/User');
// @route POST api/users
// @desc REgister a user
// @access PUblic
router.post(
  '/',
  [
    body('name', 'name is required').not().isEmpty(),
    body('email', 'please include a valid email').isEmail(),
    body(
      'password',
      'please enter a password with 6 or more character'
    ).isLength({
      min: 6,
    }),
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: 'user already exists' });
      }
      user = new User({
        name,
        email,
        password,
      });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();

      res.send('user saved')
    } catch (error) {
      console.error(error.message);
      res.status(500).send('sever error');
    }
  }
);
module.exports = router;
