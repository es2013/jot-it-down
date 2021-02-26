//add dependencies 
const express = require('express');
const fs = require('fs');
const path = require('path');
//express app
const app = express();
const PORT = process.env.PORT || 3001;

var app = express();
// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
//The way it works is that we provide a file path to a location in our application 
//(in this case, the public folder) and instruct the server to make these files static resources. 
app.use(express.static('public'));


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
  });

app.listen(PORT, () => {
    console.log(`API server is now on port ${PORT}`)
});