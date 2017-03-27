const EventEmitter = require('events');

class ChatApp extends EventEmitter {
  /**
   * @param {String} title
   */
  constructor(title) {
    super();

    this.title = title;

    // Посылать каждую секунду сообщение
    setInterval(() => {
        this.emit('message', `${this.title}: ping-pong`);
    }, 1000);
  }

  close() {
    this.emit('close', (content) => console.log(content));
  }
}

let webinarChat =  new ChatApp('webinar');
let facebookChat = new ChatApp('=========facebook');
let vkChat =       new ChatApp('---------vk');

let chatOnMessage = (message) => {
  console.log(message);
};

let chatStart = function() {
  console.log('Готовлюсь к ответу')
}

let chatFinish = function() {
  console.log(`Чат вконтакте закрылся :(`)
}

module.exports = function() {

  vkChat.setMaxListeners(2);

  webinarChat.on('message', chatOnMessage);
  webinarChat.on('message', chatStart);

  facebookChat.on('message', chatOnMessage);

  vkChat.on('message', chatOnMessage);
  vkChat.on('message', chatStart);
  vkChat.on('close', chatFinish);
  vkChat.close();

  // Закрыть вконтакте
  setTimeout( ()=> {
    console.log('Закрываю вконтакте...');
    vkChat.removeListener('message', chatOnMessage);
  }, 10000 );


  // Закрыть фейсбук
  setTimeout( ()=> {
    console.log('Закрываю фейсбук, все внимание — вебинару!');
    facebookChat.removeListener('message', chatOnMessage);
  }, 15000 );

  // отпишем chatOnMessage от вебинара webinarChat

  setTimeout( () => {
    console.log('Закрываем вебинар');
    webinarChat.removeListener('message', chatOnMessage);
  }, 30000)

}
