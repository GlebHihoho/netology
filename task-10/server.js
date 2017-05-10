'use strict';

const express     = require('express');
const bodyParser  = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const app  = express();
const port = 3000;

let db;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (request, response) => {
  response.send('Hello in Telephone Library');
});

// Get
// Выводим список пользователей

app.get('/users', (request, response) => {
  db.collection('users').find().toArray((error, data) =>{
    if (error) response.send(error);

    response.json(data);
  })
});

// Выводим юзеров по name, lastname, tel

app.get('/users/:option/:value', (request, response) => {
  let data = request.params;

  if (data.option === 'name') {
    db.collection('users').find({ name : data.value }, (error, users) => {
      if (error) response.send(error);

      response.send(users);
    })
  } else if (data.option === 'lastname') {
    db.collection('users').find({ lastname : data.value }, (error, users) => {
      if (error) response.send(error);

      response.send(users);
    })
  } else if (data.option === 'tel') {
    db.collection('users').find({ tel : data.value }, (error, users) => {
      if (error) response.send(error);

      response.send(users);
    })
  } else {
    response.writeHead(404, 'OK', {'Content-Type': 'application/json'});
    response.send(404);
  }
});

// POST
// Добавим контакт в справочник по name / lastname / tel

app.post('/users', (request, response) => {
  let contact = {
    name     : request.body.name,
    lastname : request.body.lastname,
    tel      : request.body.tel
  };

  db.collection('users').insert(contact, (error, user) => {
    if (error) response.send(error);

    response.send(`Контакт и именем ${request.body.name} и телефоном ${request.body.tel} добавлен`);
  })
});

// DELETE
// Удалим контакт по имени

app.delete('/users/:name', (request, response) => {
  const name = request.params.name;

  db.collection('users').remove({ name: `${name}` }, (error, user) => {
    if (error) response.send(error);

    response.send(`Контакт с именем ${name} удалён`);
  })
});

// PUT
// Изменим контакт

app.put('/users/:option/:value/:newValue', (request, response) => {
  let data = request.params;

  if (data.option === 'name') {
    db.collection('users').update({ name : data.value }, {$set: {name : data.newValue}}, (error, users) => {
      if (error) response.send(error);

      response.send(users);
    })
  } else if (data.option === 'lastname') {
    db.collection('users').update({ lastname : data.value }, {$set: {lastname : data.newValue}}, (error, users) => {
      if (error) response.send(error);

      response.send(users);
    })
  } else if (data.option === 'tel') {
    db.collection('users').update({ tel : data.value }, {$set: {tel : data.newValue }}, (error, users) => {
      if (error) response.send(error);

      response.send(users);
    })
  } else {
    response.writeHead(404, 'OK', {'Content-Type': 'application/json'});
    response.send(404);
  }
});

MongoClient.connect('mongodb://localhost:27017/api', (err, database) => {
  if (err) {
    return console.log(err);
  }
  db = database;

  app.listen(port, () => console.log(`SERVER Started`));
});
