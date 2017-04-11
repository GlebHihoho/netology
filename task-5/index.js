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
  let resData = '';

  request.on('error', err => console.error(err));
  request.on('data', chunk => data += chunk);
  request.on('end', () => {
    const NAME = JSON.stringify(request.headers.firstname);

    const requestUP = HTTP.request(OPTIONS, responseUP => {
      console.log(`STATUS: ${responseUP.statusCode}`);

      responseUP.on('data', chunk => resData += chunk);
      responseUP.on('end', () => console.log(resData));

    });

    response.writeHead(200, 'OK', {'Content-Type': 'application/json'});
    requestUP.write(resData);
    requestUP.end();

  });

  // response.writeHead(200,{'Content-Type': 'application/json'});
  response.write(data);
  response.end();
}



