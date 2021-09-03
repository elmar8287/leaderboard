<<<<<<< HEAD
const baseURL = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/';

const scoreListDisplay = (scores) => scores.map((score) => `<li class="list-group-item list-group-item-action">${score.user}:${score.score}</li>`).join('');

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
=======
>>>>>>> 441e1894c49285a5f443dbca439e1165e044622a
