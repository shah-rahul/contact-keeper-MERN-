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
// @route     PUT api/contacts/:id
// @desc      Update contact
// @access    Private
router.put('/:id', auth, async (req, res) => {
  const {name, email, phone, type} = req.body;

  // Build contact object
  const contactFields = {};
  if (name) contactFields.name = name;
  if (email) contactFields.email = email;
  if (phone) contactFields.phone = phone;
  if (type) contactFields.type = type;

  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) return res.status(404).json({msg: 'Contact not found'});

    // Make sure user owns contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({msg: 'Not authorized'});
    }

    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      {$set: contactFields},
      {new: true},
    );

    res.json(contact);
  } catch (err) {
    console.error(er.message);
    res.status(500).send('Server Error');
  }
});
// @route     DELETE api/contacts/:id
// @desc      Delete contact
// @access    Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) return res.status(404).json({msg: 'Contact not found'});

    // Make sure user owns contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({msg: 'Not authorized'});
    }

    await Contact.findByIdAndRemove(req.params.id);

    res.json({msg: 'Contact removed'});
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
module.exports = router;
