const express = require('express');
const noteController = require('./notes.controller');

const router = express.Router();

router.post('/', noteController.createNote);
router.get('/:id', noteController.getNoteById);
router.get('/', noteController.queryNotesByTitle);
router.put('/:id', noteController.updateNote);

module.exports = router;
