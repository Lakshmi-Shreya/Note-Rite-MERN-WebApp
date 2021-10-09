const express = require("express");
const router = express.Router();
const NotesMod = require("../models/notesModel");
const requireLogin = require("../middleware/requireLogin");
// route with requireLogin middleware to create note
router.post("/createnote", requireLogin, async (req, res) => {
  const { title, body, category } = req.body;
  if (!title || !body || !category) {
    res.status(401).json({ msg: "Please Enter All The Fields" });
  } else {
    //   posting note in database
    const note = await new NotesMod({
      owner: req.user._id,
      title,
      body,
      category,
    });

    const createdNote = await note.save();

    res.status(201).json(createdNote);
  }
});
// route to read all notes
router.get("/allnotes", requireLogin, async (req, res) => {
  // Finding from database
  const notes = await NotesMod.find({ owner: req.user._id });
  // console.log(notes);

  res.json(notes);
});

//route to update an particular note
router.put("/updatenote/:id", requireLogin, async (req, res) => {
  // Finding from database
  const note = await NotesMod.findById(req.params.id);
  // checking if loggedin user is same as the owner of notes
  if (note.owner.toString() !== req.user._id.toString()) {
    res.status(422).json({ msg: "You cannot perform this action" });
  }
  const { title, body, category } = await req.body;
  if (note) {
    note.title = title;
    note.body = body;
    note.category = category;

    const updatedNote = await note.save();
    res.status(201).json(updatedNote);
  } else {
    res.status(422).json({ msg: "Note Not Found" });
  }
});
//route to get particular note
router.get("/note/:id", requireLogin, async (req, res) => {
  // Finding from database
  const note = await NotesMod.findById(req.params.id);
  if (note) {
    res.status(201).json(note);
  } else {
    res.status(422).json({ msg: "Note do not exists at all" });
  }
});
// route to delete particular note
router.delete("/deletenote/:id", requireLogin, async (req, res) => {
  // Finding from database
  const note = await NotesMod.findById(req.params.id);
  // checking if loggedin user is same as the owner of notes
  if (note.owner.toString() !== req.user._id.toString()) {
    return res.status(401).json({ msg: "You cannot perorm this action" });
  }
  if (note) {
    await note.remove();
    res.status(201).json({ msg: "Note deleted sucessfully" });
  } else {
    res.status(422).json({ msg: "Note do not exists at all" });
  }
});
module.exports = router;
