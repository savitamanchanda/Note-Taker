const notes = require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');
const fs = require("fs");


notes.get('/', (req, res) => {
    console.info(`${req.method} request received for notes`);
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
  });

notes.post('/', (req, res) => {
    console.info(`${req.method} request received to add a note`);
  
    const { title, text } = req.body;
  
    if (req.body) {
      const newNote = {
        title,
        text,
        id: uuid(),
      };
  
      readAndAppend(newNote, './db/db.json');
      res.json(`Note added successfully!`);
    } else {
      res.error('Error in adding note');
    }
  });

notes.delete('/:id', (req, res) => {

    notesData = fs.readFileSync("./db/db.json", "utf8");

    notesData = JSON.parse(notesData);

    notesData = notesData.filter(function(note) {
      return note.id !== req.params.id;
    });

    notesData = JSON.stringify(notesData);

    fs.writeFile("./db/db.json", notesData, "utf8", function(err) {

      if (err) throw err;
    });

  
        console.info(`${req.method} request received for notes`);
        res.json('Note deleted successfully!') 

}); 


  module.exports = notes;