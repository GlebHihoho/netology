'use strict';

const express = require('express');
const router  = express.Router();
const Task = require('./task');
const User = require('./user');

//  GET
//  Выводим список задач

router.get('/', (request, response) => {
  Task.find().exec((error, task) => {
    if (error) return response.send(error);
    response.json(task);
  })
});

//  Выводим задачу по title

router.get('/:title', (request, response) => {
  let title = request.params.title;

  Task.find({ title : title }, (error, task) => {
    if (error) return response.send(error);

    response.send(task);
  })
})

//  POST
//  Добавляем task в коллекцию

router.post('/', (request, response) => {
  let newTask = new Task();

  newTask.title       = request.body.title;
  newTask.description = request.body.description;
  newTask.state       = request.body.state || 'open';
  newTask.user        = request.body.user || '';

  newTask.save((error, task) => {
    if (error) return response.send(error);
    response.send(task);
  })
});

//  PUT
//  Редактирование task с добавлением пользователей
//  с предварительной проверкой существования пользователя по name
//  поиск задач по title

router.put('/:title/:name', (request, response) => {
  let title = request.params.title;
  let name  = request.params.name;

  User.findOne( { name : name }, (error, user) => {
    if (error) return response.send(error);

    if (user.length !== 0) {
      Task.findOne({ title : title }, (error, task) => {
        if (error) response.send(error);
        task.user = name;
        console.log(task)
        task.save((error, task) => {
          if (error) response.send(error);
          response.send(`Пользователь с именем ${name} получил задание с заголовком ${title}`);
        })
      })
    } else {
      response.send(`Пользователь с таким именем не существует`);
    }
  })
});

//  Изменение состояния задачи по его title

router.put('/state/:title/:state', (request, response) => {
  let title = request.params.title;
  let state = request.params.state;

  Task.findOne({ title : title }, (error, task) => {
    if (error) return response.send(error);

    task.state = state;
    task.save((error, task) => {
      if (error) response.send(error);

      response.send(`Состояние задачи с заголовком ${title} изменено на ${state}`);
    })
  })
});

//  DELETE
//  Удаляем task по заголовку

router.delete('/:title', (request, response) => {
  let title = request.params.title;

  Task.remove( { title : `${title}`}, (error, task) => {
    if (error) response.send(error);

    if (task.result.n) {
      response.send(`Task ${title} delete`);
    } else {
      response.send(`Task c такими заголовком: ${title} не найден`);
    }

  });
})

module.exports = router;
