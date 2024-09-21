const express = require('express');
const restrictToLogin = require('../middleware/verificationtoken');
const {Create,Update,Delete,GetNotes} = require('../Controllers/NoteControllers');
const NoteRouter = express.Router();
NoteRouter.post("/create",restrictToLogin,Create)
NoteRouter.put("/update/:id",restrictToLogin,Update)
NoteRouter.delete('/delete/:id',restrictToLogin,Delete)
NoteRouter.get('/getnotes',restrictToLogin,GetNotes)


module.exports = NoteRouter