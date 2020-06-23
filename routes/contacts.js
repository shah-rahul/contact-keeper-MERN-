const express = require('express');
const router = express.Router();
// @route get api/contacts
// @desc get all users contacts
// @access private
router.get('/', (req, res) => {
  res.send('get all contacts');
});
// @route Post api/contacts
// @desc add the contacts
// @access private
router.post('/', (req, res) => {
  res.send('Add contatc');
});
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
