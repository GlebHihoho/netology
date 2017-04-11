'use strict';

const HTTP   = require('http');
const PORT   = 3000;

const OPTIONS = {
  hostname: 'netology.tomilomark.ru',
  port: 3000,
  path: '/api/v1/hash',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'firstname' : 'mark'
  }
};

const SERVER = HTTP.createServer();

SERVER
    .listen(PORT)
    .on('error', error => console.log(error))
    .on('request', handler)
    .on('listening', () => console.log('Start HTTP on port %d', PORT));

function handler(request, response) {
  let data = '';

  request.on('error', err => console.error(err));
  request.on('data', chunk => data += chunk);
  request.on('end', () => {
    // console.log(JSON.stringify(request.headers));
    // console.log(request.url);
    // console.log(request.method);

    response.writeHead(200, 'OK', {'Content-Type': 'text/plain'});
    response.write(`${data}asd`);
    response.end();
  });
}



