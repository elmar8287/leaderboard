const baseURL = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/';
const gameURL = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/8CJbUotFazwQ3FpCyxsp/scores';

const scoreListDisplay = (scores) => scores.map((score) => `<li class="list-group-item d-flex justify-content-between align-items-start">${score.user}:${score.score}</li>`).join('');

const createGame = async (gameName) => {
  const response = await fetch(`${baseURL}games/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(gameName),
  });

  const gameId = await response.json();
  return gameId;
};

const addScore = async (userName, gameURL) => {
  const response = await fetch(gameURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userName),
  });

  const result = await response.json();
  return result;
};

const getScore = async (gameURL) => {
  const response = await fetch(gameURL);
  const result = await response.json();
  return result;
};

const form = document.querySelector('#form');
const scoreList = document.querySelector('#scoreList');
const refreshButton = document.querySelector('#refreshBtn');
const user = document.querySelector('#name');
const score = document.querySelector('#score');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const userName = { user: user.value, score: score.value };
  await addScore(userName, gameURL);
  user.value = '';
  score.value = '';
});

refreshButton.addEventListener('click', async () => {
  const result = await getScore(gameURL);
  scoreList.innerHTML = scoreListDisplay(result.result);
});

window.addEventListener('DOMContentLoaded', async () => {
  const refreshResult = await getScore(gameURL);
  scoreList.innerHTML = scoreListDisplay(refreshResult.result);
});