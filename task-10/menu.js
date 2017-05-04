'use strict';

(function() {

  const btn  = document.body.querySelector('.navigation__btn');
  const menu = document.body.querySelector('.navigation-container');

  btn.addEventListener('click', (event) => {
    event.preventDefault();
    menu.classList.toggle('open-close');
  })


})();


