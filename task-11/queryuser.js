'use strict';

const express = require('express');
const router  = express.Router();
const User = require('./user');

//  GET
//  Выводим список имён

router.get('/', (request, response) => {
  User.find().exec((error, user) => {
    if (error) return response.send(error);

    response.json(user);
  })
});

//  Выводим юзера по имени

router.get('/:name', (request, response) => {
  let name = request.params.name;

  User.find( { name : name }, (error, user) => {
    if (error) response.send(error);

    response.send(user);
  })

});

//  POST
//  Добавляем user в коллекцию

router.post('/', (request, response) => {
  let newUser = new User();

  newUser.name = request.body.name;
  newUser.save((error, user) => {
    if (error) console.log(error);
    response.send(user);
  })
});

//  PUT
//  Изменяем имя пользовател

router.put('/:inputName&:changeName', (request, response) => {
  let inputName = request.params.inputName;
  let changeName = request.params.changeName;

  User.findOne( { name : inputName}, (error, user) => {
    if (error) console.log(error);

    user.name = changeName;
    user.save(() => {
      response.send(`Юзер с именем ${inputName} изсенён на ${changeName}`);
    });
  });
})

//  DELETE
//  Удаляем user по имени

router.delete('/:name', (request, response) => {
  let name = request.params.name;

  User.remove( { name : `${name}`}, (error, user) => {
    if (error) response.send(error);

    if (user.result.n) {
      response.send(`User ${name} delete`);
    } else {
      response.send(`User c такими именем: ${name} не найден`);
    }
  });
});

module.exports = router;
