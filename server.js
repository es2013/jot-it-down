//add dependencies 
const dbnotes = require('./db/db.json');
const express = require('express');
const fs = require('fs');
const path = require('path');
//express app
const app = express();
const PORT = process.env.PORT || 3001;

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
//The way it works is that we provide a file path to a location in our application 
//(in this case, the public folder) and instruct the server to make these files static resources. 
app.use(express.static('public'));

//add API route for notes
app.get('api/notes', (req, res) => {
    console.log(req.query);
    res.sendFile(path.join(__dirname, './public/notes.html'))
    res.json(req.query);
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));

})

app.get('/api/notes', (req, res) => {
    console.log('app.get request for /api/notes');
    console.log(dbnotes)
    res.json(dbnotes);
});
//api get route that searches for data by parameter= id
// app.get('/api/notes/:id', (req, res) => {
//     res.json(dbnotes[req.params.id]);
// });

//api post route for notes endpoint
app.post('/api/notes', (req, res) => {
    console.log('post api notes line 41');
    // console.log(dbnotes)
    //req.body is where out incoming content will be. get unique id
    req.body.id = dbnotes.length.toString();
    const note = req.body;
    dbnotes.push(note);
    //write note json - stringify converts json and keeps data formatted
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify(dbnotes, null, 2)

    );
    res.json(note);//or res.json(req.body)
});

//delete a notes by id attempt that deletes from dbjson but not rendered view
app.delete('/api/notes/:id', (req, res) => {
    console.log('***************')
    dbnotes.filter(dbnote => dbnote.id != req.params.id);
    console.log(dbnotes.filter(dbnote => dbnote.id != req.params.id))

    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify(dbnotes.filter(dbnote => dbnote.id != req.params.id), null, 2)

    );
    res.send('This note will be deleted');
});
// example: function createNewAnimal(body, animalsArray) {
//     const animal = body;
//     animalsArray.push(animal);
//     fs.writeFileSync(
//       path.join(__dirname, './data/animals.json'),
//       JSON.stringify({ animals: animalsArray }, null, 2)
//     );
//     return animal;
//   }

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(PORT, () => {
    console.log(`API server is now on port ${PORT}`)
});