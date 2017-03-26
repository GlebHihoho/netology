'use strict';

function rand(min, max) {
  return Math.ceil((max - min + 1) * Math.random()) + min - 1;
}

function getRandomNumberArray() {
  let arrNumberFolder = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  let arrNumberRandom = [];

  for (let i = 0; i < 3; i++) {
    let numb = rand(1, 10 - i);
    let numbLength = numb - 1;

    arrNumberRandom.push(arrNumberFolder[numbLength]);
    arrNumberFolder.splice(numbLength, 1);
  }

  return arrNumberRandom;
}

function getRandomPokemonArray(list) {
  let newPokemonList = [];

  if (list.length > 3) {
    for (let i = 0; i < 3; i++) {
      let numb = rand(0, list.length - 1);

      newPokemonList.push(list[numb]);
      list.splice(numb, 1);
    }
    return newPokemonList;
  }

  return list;
}

const fs = require('fs');
const conf = { encoding: 'utf8' };

// Модуль hide создаёт 10 папок по указанному пути
// случайным образом распределяя 3 покемонов и переданного списка
// в  созданные папки

function createFolders({url, newList}) {
  const AMOUNT_FOLDER  = 10;

  for (let i = 0; i < AMOUNT_FOLDER; i++) {
    fs.mkdir(`${url}0${i+1}`, (err) => {
      if (err) console.log(err);
    });
  }

  return {url, newList};
}

function createFiles({url, newList}) {
  const AMOUNT_POKEMON = 3;
  let lengthList = newList.length;
  let nameRandomFolder = getRandomNumberArray();

  function createPokemonFile(url, newList) {
    for (let i = 0; i < newList.length; i++) {
      fs.writeFile(`${url}0${nameRandomFolder[i]}/pokemon.txt`, `${newList[i].name} | ${newList[i].lvl}`, conf)
    }
  }

  if (newList.length < AMOUNT_POKEMON) {
    createPokemonFile(url, AMOUNT_POKEMON);
  } else {
    createPokemonFile(url, newList);
  }

  return {newList, nameRandomFolder};
}

function viewResult({newList, nameRandomFolder}) {
  for (let i = 0; i < newList.length; i++) {
    console.log(`Покемон ${newList[i].name}, уровнем ${newList[i].lvl}, спрятан в папкаке: 0${nameRandomFolder[i]}`);
    console.log('-----------------------------------------------------');
  };

  return newList;
}

module.exports.hide = (url, list) => {
  let nameRandomFolder = getRandomNumberArray();
  let newList = getRandomPokemonArray(list);

  return new Promise((resolve, reject) => {
    resolve({url, newList});
  })
  .then(createFolders)
  .then(createFiles)
  .then(viewResult)
}


// модуль seek ищет покемонов в указанной папке и возвращает
// список найденных покемоной

function foldersSearch(src) {
  fs.readdir(src, (err, folders) => {
    if (err) console.log(err);

    folders.forEach(folder => {
      fs.readdir(`${src}${folder}`, (err, files) => {
        if (err) console.log(err);

        files.forEach(file => {
          fs.readFile(`${src}${folder}/${file}`, conf, (err, data) => {
            if (err) console.log(err);

            console.log(data);
          })
        })
      })
    })
  })
}

module.exports.seek = (src) => {
  return new Promise((resolve, reject) => {
    resolve(src);
  })
  .then(foldersSearch)
  .catch((err) => console.log(err))
}


// --------------------------------------

// function foldersSearch(src) {
//   fs.readdir(src, (err, folders) => {
//     if (err) console.log(err);

//     return new Promise((resolve, reject) => {
//       resolve({src, folders});
//     })
//     .then(searchFileInFolders)
//     .catch((err) => console.log(err))
//   })
// }

// function searchFileInFolders({src, folders}) {
//   for (let folder of folders) {
//     fs.readdir(`${src}${folder}`, (err, files) => {
//       if (err) console.log(err);

//       return new Promise((resolve, reject) => {
//         resolve({src, folder, files})
//       })
//       .then(viewPokemonInFiles)
//     })
//   }
// }

// function viewPokemonInFiles({src, folder, files}) {
//   for (let file of files) {
//     fs.readFile(`${src}${folder}/${file}`, conf, (err, data) => {
//       if (err) console.log(err);

//       return new Promise((resolve, reject) => {
//         resolve(data);
//       })
//       .then((data) => console.log(data))
//     })
//   }
// }

// module.exports.seek = (src) => {
//   return new Promise((resolve, reject) => {
//     resolve(src);
//   })
//   .then(foldersSearch)
//   .catch((err) => console.log(err));
// }


















