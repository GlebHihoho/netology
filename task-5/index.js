'use strict';

const HTTP   = require('http');
const SERVER = HTTP.createServer();
const PORT   = 3000;
const QUERYSTRING = require('querystring');

const OPTIONS = {
  hostname: 'netology.tomilomark.ru',
  port: 80,
  path: '/api/v1/hash',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'firstname' : 'Gleb'
  }
};

function handler(request, response) {
  let data = request.headers.firstname;
  response.writeHead(200);
  // response.write(data);
  response.end();

  const req = HTTP.request(OPTIONS, res => {
    let data = '';
    res.setEncoding('utf8');
    res.on('data', (chunk) => data += chunk);
    res.on('end', () => console.log(data));
  });


  req.end();
}

SERVER.on('error', error => console.log(error));
SERVER.on('request', handler);
SERVER.listen(PORT);






