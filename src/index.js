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