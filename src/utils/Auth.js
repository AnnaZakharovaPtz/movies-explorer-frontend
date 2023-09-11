export const BASE_URL = 'https://anna-zakharova-diploma.nomoreparties.co/api';
// export const BASE_URL = 'http://localhost:3001/api';

export const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(res);
};

export const getToken = () => {
  if (localStorage.getItem('jwt')) {
    const jwt = localStorage.getItem('jwt');
    return jwt ? jwt : '';
  }
};

export const register = (name, email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      email: email,
      password: password
    })
  })
    .then(res => checkResponse(res));
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: email,
      password: password
    })
  })
    .then(res => checkResponse(res));
};

export const getContent = (jwt) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${jwt}`
    }
  })
    .then(res => checkResponse(res));
};
