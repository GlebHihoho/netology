'use strict';

const EXPRESS     = require('express');
const BODY_PARSER = require('body-parser');
const FS          = require('fs');
const PORT        = 3000;

const APP = EXPRESS();

const CONF  = { encoding: 'utf8' };

APP.use(BODY_PARSER.json());
APP.use(BODY_PARSER.urlencoded({"extended": true}));

// GET

APP.get('/', (request, response) => {
  response.status(200).send('Hello, Express.js');
});

APP.get('/hello', (request, response) => {
  response.status(200).send('Hello stranger');
});

APP.get('/hello/:name', (request, response) => {
  let name = request.params.name;

  response.status(200).send(`Hello, ${name}`);
});

// ANY

APP.all('/sub/*/*', (request, response) => {
  response.status(200).send(`You requested URI: ${request.url}`);
});

// POST

function middleware(request, response, next) {
  let key  = request.params.keys;

  if (request.headers.key === undefined) {
    response.send('401');
  }

  next();
}

APP.post('/post/:keys', middleware, (request, response) => {
  let data = '';

  request.on('data', chank => data += chank);
  request.on('end', () => {
    if (data === '') response.send('404 Not Found');

    response.status(200).send(`${data}`);
  })
});

APP.listen(PORT, () => console.log(`Start Server / PORT ${PORT}`));
