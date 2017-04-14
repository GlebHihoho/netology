'use strict';

const EXPRESS     = require('express');
const BODY_PARSER = require('body-parser');
const PORT        = 3000;

const SERVER = EXPRESS();

SERVER.post('/users/:parammm', (request, response) => {
  let param = request.params.parammm;
  response.json(param);
});

SERVER.get('/users/', (request, response) => {
  let name = request.params.name;
  let score = request.params.score;
  response.send(`Hello, You name ${name} and ${score}`);
});

SERVER.all('*', (request, response) => {
  response.send('Введите правильный путь');
});

SERVER.use((err, request, response, next) => {
  response.json(err.stack);
});

SERVER.listen(PORT, () => console.log(`Start Server / PORT ${PORT}`));
