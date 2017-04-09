'use strict';

const HTTP   = require('http');
const SERVER = HTTP.createServer();
const URL    = 'http://netology.tomilomark.ru';
const PORT   = 3000;
const QUERYSTRING = require('querystring');

const OPTIONS = {
  hostname: '127.0.0.1',
  port: 3000,
  path: '/api/v1/hash',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'firstname' : 'mark'
  }
};

function handler(request, response) {
  let data = request.headers.firstname;
  response.writeHead(200);
  response.write(data);
  response.end();

}

SERVER.on('error', err => console.log(err));
SERVER.on('request', handler);
SERVER.listen(PORT);

const req = HTTP.request(URL);

req.on('error', () => console.log(err));

req.on('response', response => {
  let data = '';

  response.on('data', chunk => data += chunk);
  response.end(() => console.log(data + 'asd'))
})

req.end();



// function handler(req, res) {
//   res.writeHead(200, 'OK', { 'Content-Type' : 'application/x-www-form-urlencoded' });
//   res.write(`${JSON.stringify(req.headers)}`);
//   res.end();
// }





