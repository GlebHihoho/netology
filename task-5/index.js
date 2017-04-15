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
    'firstname' : 'Gleb'
  }
};

const SERVER = HTTP.createServer();

SERVER
    .listen(PORT)
    .on('error', error => console.log(error))
    .on('request', handler)
    .on('listening', () => console.log('Start HTTP on port %d', PORT));

function handler(request, response) {
  let lastName  = '';
  let firstName = '';
  let key       = '';

  request.on('error', err => console.error(err));
  request.on('data', chunk => lastName += chunk);
  request.on('end', () => {

    const requestUP = HTTP.request(OPTIONS, responseUP => {
      console.log(`STATUS: ${responseUP.statusCode}`);
      let name = requestUP.getHeader('firstname');

      responseUP.on('data', chunk => key += chunk);
      responseUP.on('end', () => {
        console.log(`firstName : ${name}`);
        console.log(`lastName  : ${JSON.parse(lastName).lastName}`);
        console.log(`secretKey : ${JSON.parse(key).hash}`);
      });
    });

    requestUP.write(lastName);
    requestUP.end();
  });

  response.writeHead(200, 'OK', {'Content-Type': 'application/json'});
  response.end();
}
