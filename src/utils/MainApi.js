import { checkResponse, getToken, BASE_URL } from './Auth';

export const getUserInfo = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${getToken()}`,
      'Content-Type': 'application/json'
    }
  })
    .then(res => checkResponse(res));
};

export const updateUserInfo = (name, email) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'PATCH',
    headers: {
      authorization: `Bearer ${getToken()}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      email: email
    })
  })
    .then(res => checkResponse(res));
};

export const getUserMovies = () => {
  return fetch(`${BASE_URL}/movies`, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${getToken()}`,
      'Content-Type': 'application/json'
    }
  })
    .then(res => checkResponse(res));
};

export const saveMovie = (movie) => {
  return fetch(`${BASE_URL}/movies`, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${getToken()}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'country': movie.country,
      'director': movie.director,
      'duration': movie.duration,
      'year': movie.year,
      'description': movie.description,
      'image': `https://api.nomoreparties.co${movie.image.url}`,
      'trailerLink': movie.trailerLink,
      'thumbnail': `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
      'movieId': movie.id,
      'nameRU': movie.nameRU,
      'nameEN': movie.nameEN
    })
  })
    .then(res => checkResponse(res));
};

export const deleteMovie = (id) => {
  return fetch(`${BASE_URL}/movies/${id}`, {
    method: 'DELETE',
    headers: {
      authorization: `Bearer ${getToken()}`,
      'Content-Type': 'application/json'
    }
  })
    .then(res => checkResponse(res));
};

