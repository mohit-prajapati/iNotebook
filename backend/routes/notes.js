const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');

// ROUTE 1 get all the Notes GET "/api/notes/fetchallnotes". Login required

router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user_id: req.user.id });
        res.json(notes)
    } catch (error) {
        res.status(500).send("Internal server error");
    }
})

// ROUTE 2 Add a new Notes POST "/api/notes/addNotes". Login required
router.post('/addNotes', fetchuser, [
    body('title', 'Enter a valid Title').isLength({ min: 3 }),
    body('description', 'Description must be atieast 5 characteers').isLength({ min: 5 }),
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        // If validation is fail, return Bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const note = new Notes({
            title, description, tag, user_id: req.user.id
        });

        const saveNote = await note.save();
        if (saveNote) {
            res.status(200).json({ "status": true, "message": "Note has been added successfully" })
        } else {
            res.status(400).json({ "status": false, "message": "Note not added" })
        }
        // res.json(saveNote)
    } catch (error) {
        res.status(500).send("Internal server error");
    }
});

// ROUTE 3 Update an existion Notes PUT "/api/notes/updateNote". Login required
router.put('/updateNote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        // create a newNote object
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        // find the note to be updated and update it
        let note = await Notes.findById(req.params.id);

        if (!note) {
            return res.status(404).json({ 'status': false, "message": "No data found" })
        }

        if (note.user_id.toString() !== req.user.id) {
            return res.status(401).json({ 'status': false, "message": "Not Authorize" })
        }

        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        if (note) {
            res.status(200).json({ "status": true, "message": "Note has been updated successfully" })
        } else {
            res.status(400).json({ "status": false, "message": "Note not updated" })
        }
        //  res.json({note});
    } catch (error) {
        res.status(500).send("Internal server error");
    }
});

// ROUTE 4 Delete an existion Note DELETE "/api/notes/deleteNote". Login required
router.delete('/deleteNote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        // find the note to be deleted and deleted it
        let note = await Notes.findById(req.params.id);
        
        if (!note) {
            return res.status(404).json({ 'status': false, "message": "No data found" })
        }

        // Allow deletion only if user owns this Note
        if (note.user_id.toString() !== req.user.id) {
            return res.status(401).json({ 'status': false, "message": "Not Authorize" })
        }

        note = await Notes.findByIdAndDelete(req.params.id);
        if (note) {
            res.status(200).json({ "status": true, "message": "Note has been delete successfully" })
        } else {
            res.status(400).json({ "status": false, "message": "Note not delete" })
        }
        //  res.json({note});
    } catch (error) {
        res.status(500).send("Internal server error");
    }
});


module.exports = router;