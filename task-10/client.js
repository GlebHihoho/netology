'use strict';

let main          = document.body.querySelector('.main');
let navigationBtn = document.body.querySelector('.navigation__btn-submit');

const xhr = new XMLHttpRequest();

navigationBtn.addEventListener('click', (event) => {
  let name     = document.body.querySelector('#name').value;
  let lastName = document.body.querySelector('#last-name').value;
  let tel      = document.body.querySelector('#tel').value;
  let str      = `
                  <div class="main__user">
                    <div class="main__row">
                       <div class="main__column  main__name-user">Имя:</div>
                      <div class="main__column  main__name-value">${name}</div>
                    </div>
                    <div class="main__row">
                      <div class="main__column  main__surname-user">Фамилия:</div>
                      <div class="main__column  main__surname-value">${lastName}</div>
                    </div>
                    <div class="main__row">
                      <div class="main__column  tel-user">Телефон:</div>
                      <div class="main__column  main__tel-value">${tel}</div>
                    </div>
                  </div>
                `



  let data = [
    {
      "name" : name,
      "lastName" : lastName,
      "tel" : tel
    }
  ]

  xhr.open('POST', '', true);

  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      main.insertAdjacentHTML('beforeEnd', str);
    }
  }

  xhr.responseType = 'json';
  xhr.send(data);
})
