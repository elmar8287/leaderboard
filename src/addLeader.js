/* eslint-disable import/prefer-default-export */

import * as leader from './singleLeader';

const list = document.getElementById('list');
const leaderName = document.getElementById('name');
const leaderScore = document.getElementById('score');

export class UseLeader {
  static createLeader() {
    return new leader.Leader(leaderName.value, leaderScore.value);
  }

  static saveLeader(newLeader) {
    const Leaders = JSON.parse(localStorage.getItem('Leaders'));
    if (Leaders === null) {
      localStorage.setItem('Leaders', JSON.stringify([]));
    } else {
      Leaders.push(newLeader);
      localStorage.setItem('Leaders', JSON.stringify(Leaders)); //
    }
  }

  static findLeaders() {
    return JSON.parse(localStorage.getItem('Leaders'));
  }

  static displayLeaders() {
    const reloadLeaders = UseLeader.findLeaders() || [];
    list.innerHTML = '';
    reloadLeaders.forEach((aLeader) => {
      const Leader = document.createElement('li');
      Leader.innerHTML = `<p>${aLeader.name}: ${aLeader.score}</p>`;
      const br = document.createElement('br');
      list.appendChild(Leader);
      list.appendChild(br);
    });
  }
}