/* eslint-disable import/prefer-default-export */

import * as add from './addLeader';

/* eslint-disable max-classes-per-file */

const addButton = document.querySelector('.buttonClass');

addButton.addEventListener('click', () => {
  const newLeader = add.UseLeader.createLeader();
  add.UseLeader.saveLeader(newLeader);
  add.UseLeader.displayLeaders();
  const Leaders = add.UseLeader.findLeaders();
  if (Leaders.length === 0) {
    const aLeader = add.UseLeader.createLeader();
    const Leader = document.createElement('li');
    Leader.innerHTML = `<p>${aLeader.name}</p>
        <p>${aLeader.score} </p>`;
    const br = document.createElement('br');
    list.appendChild(Leader);
    list.appendChild(br);
    add.UseLeader.saveLeader(aLeader);
  }
});

window.onload = () => {
  add.UseLeader.displayLeaders();
};