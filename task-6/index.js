'use strict';

const EXPRESS     = require('express');
const BODY_PARSER = require('body-parser');
const FS          = require('fs');
const PORT        = 3000;

const SERVER = EXPRESS();

const CONF  = { encoding: 'utf8' };
const USERS = {
  "name"      : "Gleb",
  "last-name" : "Motuz"
}


SERVER.use(BODY_PARSER.json());
SERVER.use(BODY_PARSER.urlencoded({"extended": true}));

SERVER.post('/users/*', (request, response) => {
  response.send(
    FS.writeFile('users.json', '', CONF, () => {
      console.log('Файл создан');
    })
  )
});

SERVER.put('/users/:name/:score', (request, response) => {
  let name = request.params.name;
  let score = request.params.score;

  response.send(
    FS.appendFile('users.json', `{"name" : "${name}", "score" : "${score}"}`, CONF, () => {
      console.log(`Свойство name и score добавлено`)
    })
  )
});

SERVER.get('/users/*', (request, response) => {
  response.send(
    FS.readFile('users.json', CONF, (err, data) => {
      if (err) throw err;
      console.log(`Файл содержит ${data}`);
    })
  )
});

SERVER.all('*', (request, response) => {
  response.send('Введите правильный путь');
});

SERVER.use((err, request, response, next) => {
  response.json(err.stack);
});

SERVER.listen(PORT, () => console.log(`Start Server / PORT ${PORT}`));
