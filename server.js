const express = require('express');
const path = require('path');

const { readFromFile, readAndAppend } = require('./helpers/fsUtils');


const PORT = process.env.PORT || 3001;

const app = express();

const uuid = require('./helpers/uuid');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) => {
    console.info(`${req.method} request received for notes`);
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
  });

  app.post('/notes', (req, res) => {
    console.info(`${req.method} request received to add a note`);
  
    const { title, text } = req.body;
  
    if (req.body) {
      const newNote = {
        title,
        text,
        note_id: uuid(),
      };
  
      readAndAppend(newNote, './db/db.json');
      res.json(`Note added successfully!`);
    } else {
      res.error('Error in adding note');
    }
  });

  app.delete('/notes/:id', (req, res) => {
    console.info(`${req.method} request received for notes`);
    res.json('Note deleted successfully!')
  });

  app.listen(PORT, () =>
  console.log(`Listening for requests on port ${PORT}!`)
);
