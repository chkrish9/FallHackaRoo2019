const express = require('express');
const http = require('http');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const toDoRoutes = require('./routes/todo.js');
const cors = require("cors");

const port = 3000;

const app = express();


// mongoose.connect()
// .then(() => {
//   console.log('Connected');
// })

//Connecting to database.
mongoose.connect('mongodb+srv://admin:admin@cluster0-cgnbq.mongodb.net/test?retryWrites=true&w=majority');


//On Database Connected, displaying the database connected message on console.
mongoose.connection.on('connected', () => {
    console.log("Database :EduLer connection successfully");
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
app.use(cors());

// parse application/json
app.use(bodyParser.json())

// app.use('/todo', toDoRoutes);

const server = http.createServer(app);
const io = require('socket.io').listen(server);
app.set('io', io);

//Static folder
app.use(express.static(path.join(__dirname, 'public')));

//Required for navigating angular routes without server routes
app.all('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

server.listen(port);