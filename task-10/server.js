'use strict';

const express     = require('express');
const bodyParser  = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const app  = express();
const port = 3000;

let db;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

app.get('/', (request, response) => {

  response.send('Hello');
});

app.post('', (request, response) => {
  let user = request;

  db.collection('users').insert(user, (error, result) => {
    if (error) {
      console.log(error);
      return response.sendStatus(500);
    }
    // console.log(user)
    response.send(user);
  })
})

MongoClient.connect('mongodb://localhost:27017/api', (err, database) => {
  if (err) {
    return console.log(err);
  }
  db = database;

  app.listen(port, () => console.log(`SERVER Started`));
});
