'use strict';

const socket = io();

let mycont = document.querySelector('.mycont');
let input  = document.querySelector('.form-control');
let btn    = document.querySelector('.btn-default');
let container = document.querySelector('.mycont');

const ENTER_KEY_KODE = 13;

btn.addEventListener('click', () => {
  socket.emit('new message', {text : input.value});
  input.value = "";
});

input.addEventListener('keydown', event => {
  if (event.keyCode === ENTER_KEY_KODE) {
    socket.emit('new message', {text : input.value});
    input.value = "";
  }
})

socket.on('message', message => {
  container.insertAdjacentHTML('beforeEnd',
                  `<div class="row message-bubble">
                    <p class="name">${message.id}</p>
                    <p class="text-muted">${message.text}</p>
                  </div>`);
});

socket.on('user joined', connect => {
  container.insertAdjacentHTML('beforeEnd',
                  `<div class="row message-bubble">
                    <p class="connect">Пользователь с ID: ${connect.username} подключён</p>
                  </div>`);
});

socket.emit('disconnect');

socket.on('disc', user => {
  console.log(user);
  container.insertAdjacentHTML('beforeEnd',
                  `<div class="row message-bubble">
                    <p class="disconnect">Пользователь с ID: ${user} отключён</p>
                  </div>`);
});
