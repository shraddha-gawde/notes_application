const express = require("express");
const { noteModel } = require("../models/notes.model");
const { auth } = require("../middlewears/auth.middlewear");
const { access } = require("../middlewears/access.middlewear");

const noteRouter = express.Router();

noteRouter.use(auth);

noteRouter.post("/create", async (req, res) => {
  const payload = req.body;
  try {
    const book = new noteModel(payload);
    await book.save();
    res
      .status(200)
      .json({ msg: "a new note has been created", addedBook: payload });
  } catch (err) {
    res.status(400).json({ error: err });
  }
});
noteRouter.get("/", auth, async (req, res) => {
  try {
    const book = await noteModel.find({ userID: req.body.userID });
    res.status(200).json({ books_data: book });
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

noteRouter.patch("/update/:noteId", async (req, res) => {
    const noteId = req.params.noteId;
    try {
      const note = await noteModel.findById(noteId);

      if (note.userID === req.body.userID) {
        await noteModel.findByIdAndUpdate({ _id: noteId }, req.body);
        res.status(200).json({ msg: "note has been updated" });
      }
      else {
        res.status(200).json({ msg: "You are not authorized to update this note" });
      }
    } catch (err) {
      res.status(400).json({ error: err });
    }
  }
);

noteRouter.delete("/delete/:noteId", async (req, res) => {
    const noteId = req.params.noteId;
    try {
        const note = await noteModel.findById(noteId);

        if (note.userID === req.body.userID) {
          await noteModel.findByIdAndDelete({ _id: noteId }, req.body);
          res.status(200).json({ msg: "note has been deleted" });
        }
        else {
          res.status(200).json({ msg: "You are not authorized to delete this note" });
        }
    } catch (err) {
      res.status(400).json({ error: err });
    }
  }
);

module.exports = {
  noteRouter,
};
