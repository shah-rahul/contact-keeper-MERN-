const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../model/User');

const auth = require('../middleware/auth');
const Contact = require('../model/Contact');
// @route get api/contacts
// @desc get all users contacts
// @access private
router.get('/', auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(contacts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('server error');
  }
});
// @route Post api/contacts
// @desc add the contacts
// @access private
router.post(
  '/',
  [auth, [body('name', 'name is requires').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, phone, type } = req.body;
    try {
      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id,
      });
      const contact = await newContact.save();
      res.json(contact);
    } catch (error) {
      console.error(error.mesasge);
      res.status(500).send('server error');
    }
  }
);
// @route put api/contacts: id
// @desc Update contact
// @access private
router.put('/:id', (req, res) => {
  res.send('update contact');
});
// @route Delete api/contacts: id
// @desc delte contact
// @access private
router.delete('/:id', (req, res) => {
  res.send('delete  contact');
});
module.exports = router;
