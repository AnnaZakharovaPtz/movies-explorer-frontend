import { checkResponse } from './Auth';
const MOVIES_URL = 'https://api.nomoreparties.co/beatfilm-movies';

export const getMovies = () => {
  return fetch(`${MOVIES_URL}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => checkResponse(res));
};
