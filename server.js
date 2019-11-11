const express = require('express');
const http = require('http');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require("cors");

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

app.use(cors());

//Get method is used to fetch the data.
app.get("/getall", (req, res, next) => {
  // //Connecting the mongodb
  // MongoClient.connect(url,{ useNewUrlParser: true }, function (err, client) {
  //     //If connection failed the it will go to if condition.
  //     if (err) {
  //         res.send(JSON.stringify(err));
  //         res.end();
  //     }
  //     const db = client.db(dbName);
  //     db.collection('game').find().sort( { geek_rating: -1 } ).limit(10).toArray(function (err, result) {
  //         if (err) {
  //             res.write("fetching  top 10 games failed");
  //             res.end();
  //         } else {
  //             res.send(JSON.stringify(result));
  //         }
  //     });
  // });
  var result = [
    {
      "location": "models/solar6.glb",
      "animation": "true",
      "scale": "2 2 2",
      "name": "Solar",
      "thumbnail": "./images/solar.PNG",
      "_id": 0
    },
    {
      "location": "https://raw.githubusercontent.com/prashant-andani/3d-models/master/axe/scene.gltf",
      "animation": "false",
      "scale": "0.1 0.1 0.1",
      "name": "Axe",
      "thumbnail": "./images/axe.PNG",
      "_id": 1
    },
    {
      "location": "https://raw.githubusercontent.com/prashant-andani/3d-models/master/cow/scene.gltf",
      "animation": "false",
      "scale": "0.1 0.1 0.1",
      "name": "Cow",
      "thumbnail": "./images/cow.PNG",
      "_id": 2
    }
  ];
  res.send(JSON.stringify(result));
});
// parse application/json
app.use(bodyParser.json())




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