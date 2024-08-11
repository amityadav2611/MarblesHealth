const router = require('express').Router();

//notes
const notesRoutes = require('../modules/notes/notes.route');

router.use('/notes', notesRoutes);

module.exports = router;
