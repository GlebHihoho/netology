'use strict';

const hidenseek = require('./hidenseek');

let list = [
  {name : 'Иванов', lvl : 5},
  {name : 'Иван', lvl : 10},
  {name : 'Иванович', lvl : 15},
  {name : 'Пётр', lvl : 5},
  {name : 'Петрович', lvl : 10},
  {name : 'Прокопович', lvl : 15}
];

hidenseek.hide('./field/', list);

