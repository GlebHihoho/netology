'use strict';

const EXPRESS     = require('express');
const BODY_PARSER = require('body-parser');
const FS          = require('fs');
const PORT        = 3000;

const SERVER = EXPRESS();

const CONF  = { encoding: 'utf8' };


SERVER.use(BODY_PARSER.json());
SERVER.use(BODY_PARSER.urlencoded({"extended": true}));

SERVER.post('/users/*', (request, response) => {
  FS.writeFile('users.json', '[{"name" : "Gleb", "score" : "25"}, {"name" : "Alex", "score" : "30"}]', CONF, () => {
      console.log('Файл создан');
      response.send('Файл создан')
  })
});

SERVER.put('/users/:name&:score', (request, response) => {
  let name = request.params.name;
  let score = request.params.score;

  FS.readFile('users.json', CONF, (err, data) => {
    if (err) throw console.log(err);

    let newData = JSON.parse(data);
    newData.push({"name" : name, "score" : score});

    FS.writeFile('users.json', JSON.stringify(newData), CONF, () => {
      console.log(`Свойство name и score добавлено`);
      response.send(`Свойство name и score добавлено`);
    })
  })

});

SERVER.get('/users/all', (request, response) => {
  FS.readFile('users.json', CONF, (err, data) => {
    if (err) throw err;
    console.log(`Файл содержит ${data}`);
    response.send(`Файл содержит ${data}`)
  })
});

SERVER.get('/users/:name', (request, response) => {

  FS.readFile('users.json', CONF, (err, data) => {
    if (err) throw err;

    JSON.parse(data).forEach(user => {
      if (user.name === request.params.name) {
        console.log(user);
        response.send(`Вы искали ${JSON.stringify(user)}`);
      }
    });
  })
});

SERVER.delete(`/users/*`, (request, response) => {
  FS.unlink('users.json', () => {
    console.log('Файл удалён');
    response.send('Файл удалён');
  })
});

SERVER.all('*', (request, response) => {
  response.send('Введите правильный путь');
});

SERVER.use((err, request, response, next) => {
  response.json(err.stack);
});

SERVER.listen(PORT, () => console.log(`Start Server / PORT ${PORT}`));
