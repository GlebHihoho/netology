'use strict';

const express     = require('express');
const bodyParser  = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectID    = require('mongodb').ObjectID;

const app = express();
let   db;

const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//  GET

app.get('/', (request, response) => {
  response.send('Hello');
});

//  Выводим список имён

app.get('/users', (request, response) => {
  db.collection('users').find().toArray((error, docs) => {
    if (error) {
      console.log(error);
      return response.sendStatus(500);
    }
    response.send(docs);
  })
});

//  Выводим юзера по имени

app.get('/users/:name', (request, response) => {
  let name = request.params.name;

  db.collection('users').findOne({name : `${name}`}, (error, docs) => {
    if (error) {
      console.log(error);
      return response.sendStatus(500);
    }
    response.send(docs);
  })
});

//  POST
//  Добавляем user в коллекцию

app.post('/users', (request, response) => {
  let user = {
    name : request.body.name
  }

  db.collection('users').insert(user, (error, result) => {
    if (error) {
      console.log(error);
      return response.sendStatus(500);
    }
    response.send(`Юзер с именем ${request.body.name} добавлен`);
  })
});

//  PUT
//  Изменяем имя пользовател

app.put('/users/:inputName&:changeName', (request, response) => {
  let inputName = request.params.inputName;
  let changeName = request.params.changeName;

  db.collection('users').update({name : `${changeName}`}, {name : `${inputName}`}, (error, result) => {
    if (error) {
      console.log(error);
      return response.sendStatus(500);
    }
    response.send(`Юзер с именем ${changeName} изменён`);
  })
})

//  DELETE
//  Удаляем user по имени

app.delete('/users/:name', (request, response) => {
  let name = request.params.name;

  db.collection('users').remove({name : `${name}`}, (error, result) => {
    if (error) {
      console.log(error);
      return response.sendStatus(500);
    }
    response.send(`Юзер с именем ${name} удалён`);
  })
});


MongoClient.connect('mongodb://localhost:27017/api', (err, database) => {
  if (err) {
    return console.log(err);
  }
  db = database;

  app.listen(port, () => console.log(`SERVER Started`));
});



