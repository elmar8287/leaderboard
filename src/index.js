import "./style.css";
/* eslint-disable max-classes-per-file */
const list = document.getElementById('list');
const leaderName = document.getElementById('name');
const leaderScore = document.getElementById('score');
const addButton = document.querySelector('.buttonClass');

class Leader {
  constructor(name, score) {
    this.name = name;
    this.score = score;
  }
}

class UseLeader {
  static createLeader() {
    return new Leader(leaderName.value, leaderScore.value);
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

addButton.addEventListener('click', () => {
  const newLeader = UseLeader.createLeader();
  UseLeader.saveLeader(newLeader);
  UseLeader.displayLeaders();
  const Leaders = UseLeader.findLeaders();
  if (Leaders.length === 0) {
    const aLeader = UseLeader.createLeader();
    const Leader = document.createElement('li');
    Leader.innerHTML = `<p>${aLeader.name}</p>
        <p>${aLeader.score} </p>`;
    deleteBtn.id = aLeader.name;
    const br = document.createElement('br');
    list.appendChild(Leader);
    list.appendChild(br);
    
    UseLeader.saveLeader(aLeader);
  }
});

window.onload = () => {
  UseLeader.displayLeaders();
};