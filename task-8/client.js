'use strict';

var socket = io();

let mycont = document.querySelector('.mycont');
let input  = document.querySelector('.form-control');
let btn    = document.querySelector('.btn-default');
let container = document.querySelector('.mycont');

btn.addEventListener('click', () => {
  socket.emit('new message', {text : input.value});
})

socket.on('message', message => {
  container.insertAdjacentHTML('beforeEnd',
                  `<div class="row message-bubble">
                    <p class="name">${message.id}</p>
                    <p class="text-muted">${message.text}</p>
                  </div>`);
});

socket.on('user joined', connect => {
  console.log('asd')
  container.insertAdjacentHTML('beforeEnd',
                  `<div class="row message-bubble">
                    <p class="connect">Пользователь с ID: ${connect.username} подключён</p>
                  </div>`);
})

