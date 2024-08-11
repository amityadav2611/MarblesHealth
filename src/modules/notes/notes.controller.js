const Model = require('./notes.model');

// Create Note
exports.createNote = async (req, res) => {
  try {
    const note = new Model({
      title: req.body.title,
      body: req.body.body
    });
    await note.save();
    res.status(201).json({status: true, msg: "Data Created Successfully!",data:note});
  } catch (error) {
    return res.status(500).json({ status: false, error: 'Something went wrong' });
  }
};

// Fetch Note by ID
exports.getNoteById = async (req, res) => {
  try {
    const note = await Model.findById(req.params.id);
    if (!note) return res.status(404).json({ error: 'Note not found' });
    res.status(200).json({status: true, msg: "Retrieve Data Successfully!", data:note});
  } catch (error) {
    return res.status(500).json({ status: false, error: 'Something went wrong' });
  }
};

// Query Notes by Title Substring
exports.queryNotesByTitle = async (req, res) => {
  try {
    const notes = await Model.find({
      title: new RegExp(req.query.title, 'i')
    });
    res.status(200).json({status: true, msg: "Retrieve Data Successfully!",data:notes});
  } catch (error) {
    return res.status(500).json({ status: false, error: 'Something went wrong' });
  }
};

// Update Note
exports.updateNote = async (req, res) => {
  try {
    const note = await Model.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        body: req.body.body,
        updated_at: Date.now()
      },
      { new: true }
    );
    if (!note) return res.status(404).json({ error: 'Note not found' });
    res.status(200).json({status: true, msg: "Updated Successfully!", data:note});
  } catch (error) {
    return res.status(500).json({ status: false, error: 'Something went wrong' });
  }
};
