const baseURL = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/';

const scoreListDisplay = (scores) => scores.map((score) => `<li><span>${score.user}</span><span> ${score.score}</span></li>`).join('');

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

const addScore = async (user_1, gameId) => {
  const response = await fetch(`${baseURL}games/${gameId}/scores/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user_1),
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

window.addEventListener('DOMContentLoaded', async () => {
  const game = { name: 'New game' };
  const { result } = await createGame(game);
  const gameId = result.split(' ')[3];

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const [user, score] = form.children;
    const user_1 = { user: user.value, score: score.value };
    await addScore(user_1, gameId);
  });

  refreshButton.addEventListener('click', async () => {
    const result = await getScore(gameId);
    scoreList.innerHTML = scoreListDisplay(result.result);
  });
});