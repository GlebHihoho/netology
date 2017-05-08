'use strict';

const express     = require('express');
const bodyParser  = require('body-parser');
const mongoose    = require('mongoose');

const taskRouter  = require('./querytask');
const userRouter  = require('./queryuser');

const Task = require('./task');
const User = require('./user');

const app  = express();
const port = 3000;

let Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/users', userRouter);
app.use('/tasks', taskRouter);

app.use('/', (request, response) => {
  response.writeHead(200, { 'Contens-type' : 'text/plain' });
  response.send('Hello');
})

mongoose.connect('mongodb://localhost:27017/users', (err) => {
  if (err) {
    return console.log(err);
  }

  app.listen(port, () => console.log(`SERVER Started`));
});
