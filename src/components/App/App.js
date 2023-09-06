import { Routes, Route, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import PageNotFound from '../PageNotFound/PageNotFound';
import InfoToolTip from '../InfoToolTip/InfoToolTip';
import * as auth from '../../utils/Auth';
import * as mainApi from '../../utils/MainApi';
import { CurrentUser } from '../../contexts/UserContext';
import { ServerError } from '../../contexts/ServerErrorContext';
import { CONFLICT_ERROR_MSG, PROFILE_UPDATE_MSG, AUTH_DATA_ERROR_MSG } from '../../utils/errors';
import './App.css';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [serverError, setServerError] = useState('');
  const [infoToolTipState, setInfoToolTipState] = useState({
    'status': false,
    'message': ''
  });
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = useState(false);
  const navigate = useNavigate();

  function checkToken() {
    const jwt = auth.getToken();
    if (jwt) {
      auth.getContent(jwt)
        .then(res => {
          if (res) {
            setLoggedIn(true);
            setCurrentUser(res);
          }
        })
        .catch((err) => {
          setInfoToolTipState({
            'status': false,
            'message': `${err.status}: ${err.statusText}`
          });
          setIsInfoToolTipOpen(true);
          navigate('/signin');
        });
    }
  }

  useEffect(() => {
    checkToken();
    setServerError('');

    return () => {
      setServerError('');
    };
  }, []);

  function closeToolTip() {
    setIsInfoToolTipOpen(false);
  }

  function handleRegister({ name, email, password }) {
    auth.register(name, email, password)
      .then(() => {
        handleLogin({ email: email, password: password });
      })
      .catch((err) => {
        if (err.status === 409) {
          setServerError(CONFLICT_ERROR_MSG);
        } else {
          setServerError(err.statusText);
        }
      });
  }

  function handleLogin({ email, password }) {
    auth.authorize(email, password)
      .then(data => {
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          setLoggedIn(true);
          getCurrentUser();
        }
      })
      .catch((err) => {
        if (err.status === 401) {
          setServerError(AUTH_DATA_ERROR_MSG);
        } else {
          setServerError(err.statusText);
        }
      });
  }

  function getCurrentUser() {
    mainApi.getUserInfo()
      .then((data) => {
        setCurrentUser(data);
        navigate('/movies');
      })
      .catch((err) => {
        setInfoToolTipState({
          'status': false,
          'message': `${err.status}: ${err.statusText}`
        });
        setIsInfoToolTipOpen(true);
      });
  }

  function handleProfileChange(name, email) {
    mainApi.updateUserInfo(name, email)
      .then((data) => {
        setCurrentUser(data);
        setServerError(PROFILE_UPDATE_MSG);
      })
      .catch((err) => {
        if (err.status === 409) {
          setServerError(CONFLICT_ERROR_MSG);
        } else {
          setServerError(err.statusText);
        }
      });
  }

  function handleSignOut() {
    if (localStorage.getItem('jwt')) {
      localStorage.removeItem('jwt');
      localStorage.removeItem('movies');
      localStorage.removeItem('result-movies');
      localStorage.removeItem('search-request');
      localStorage.removeItem('short-film');
      localStorage.removeItem('saved-movies');
      setLoggedIn(false);
      setCurrentUser({});
      navigate('/');
    }
  }

  function cleanServerError() {
    setServerError('');
  }

  return (
    <CurrentUser.Provider value={currentUser}>
      <ServerError.Provider value={serverError}>
        <div className="App">
          <Routes>
            <Route path="/signin" element={<Login cleanup={cleanServerError} handleLogin={handleLogin} />} />
            <Route path="/signup" element={<Register cleanup={cleanServerError} handleRegister={handleRegister} />} />
            <Route path="/" element={<Main loggedIn={loggedIn} />} />
            <Route
              path="/movies"
              element={<ProtectedRoute loggedIn={loggedIn} element={Movies} />}
            />
            <Route
              path="/saved-movies"
              element={<ProtectedRoute loggedIn={loggedIn} element={SavedMovies} />}
            />
            <Route
              path="/profile"
              element={<ProtectedRoute
                loggedIn={loggedIn}
                element={Profile}
                handleProfileUpdate={handleProfileChange}
                handleSignOut={handleSignOut}
                cleanup={cleanServerError}
              />}
            />
            <Route path='*' element={<PageNotFound />} />
          </Routes>
          <InfoToolTip state={infoToolTipState} isOpen={isInfoToolTipOpen} onClose={closeToolTip} />
        </div>
      </ServerError.Provider>
    </CurrentUser.Provider>
  );
}

export default App;
