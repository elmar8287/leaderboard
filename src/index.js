const baseURL = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/';

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

const addScore = async (userName, gameId) => {
  const response = await fetch(`${baseURL}games/${gameId}/scores/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userName),
  });

  const result = await response.json();
  return result;
};

const getScore = async (gameId) => {
  const response = await fetch(`${baseURL}games/${gameId}/scores/`);
  const result = await response.json();
  return result;
};

const form = document.querySelector('#form');
const scoreList = document.querySelector('#scoreList');
const refreshButton = document.querySelector('#refreshBtn');
const user = document.querySelector('#name');
const score = document.querySelector('#score');

window.addEventListener('DOMContentLoaded', async () => {
  const game = { name: 'My cool new game' };
  const { result } = await createGame(game);
  const gameId = result.split(' ')[2];

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const userName = { user: user.value, score: score.value };
    await addScore(userName, gameId);
  });

  refreshButton.addEventListener('click', async () => {
    const result = await getScore(gameId);
    scoreList.innerHTML = scoreListDisplay(result.result);
  });
});