const express = require('express');
const http = require('http');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require("cors");
const Model = require("./models/model");

const port = process.env.PORT || 3000;

const app = express();

//Connecting to database.
mongoose.connect('mongodb+srv://admin:admin@cluster0-cgnbq.mongodb.net/test?retryWrites=true&w=majority');

//On Database Connected, displaying the database connected message on console.
mongoose.connection.on('connected', () => {
  console.log("Database :EduLer connection successfully");
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.use(cors());

//Get method is used to fetch the data.
app.get("/getall", (req, res, next) => {
  Model.getPublishedModels((err, data) => {
    res.json(data);
  });
});

//Post method is used to add the student in the database.
app.post("/create", (req, res, next) => {
  let model = new Model({
    location: req.body.location,
    animation: req.body.animation,
    scale: req.body.scale,
    name: req.body.name,
    thumbnail: req.body.thumbnail,
    published: req.body.published
  });
  //console.log(model);
  Model.addModel(model, (err, user) => {
    if (err) {
      res.json({ success: false, msg: "Failed to Add Model." });
    } else {
      res.json({ success: true, msg: "Model Added." });
    }
  });
});

//Static folder
app.use(express.static(path.join(__dirname, 'public')));

//Required for navigating angular routes without server routes
app.all('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});
const server = http.createServer(app);
const io = require('socket.io').listen(server);
app.set('io', io);
server.listen(port);