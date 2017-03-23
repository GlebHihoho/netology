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


module.exports.hide = (url, list) => {
  let nameRandomFolder = getRandomNumberArray();
  let newList = getRandomPokemonArray(list);

  const AMOUNT_POKEMON = 3;
  const AMOUNT_FOLDER  = 10;

  for (let i = 0; i < AMOUNT_FOLDER; i++) {
    fs.mkdir(`${url}0${i+1}`);
  }

  function createPokemonFile(number) {
    for (let i = 0; i < number; i++) {
      fs.writeFile(`${url}0${nameRandomFolder[i]}/pokemon.txt`, `${newList[i].name} | ${newList[i].lvl}`, conf)
    }
  }

  if (newList.length < AMOUNT_POKEMON) {
    createPokemonFile(newList.length);
  } else {
    createPokemonFile(AMOUNT_POKEMON);
  }


  for (let i = 0; i < newList.length; i++) {
    console.log(`Покемон ${newList[i].name}, уровнем ${newList[i].lvl}, спрятан в папкаке: 0${nameRandomFolder[i]}`);
    console.log('-----------------------------------------------------');
  }
};

// module.exports.seek = function(url, list) {
//   const conf = { encoding: 'utf8' };

//   fs.readFile(url, conf, (err, data) => {
//     if (err) throw err;
//     console.log(data);
//   });
// }