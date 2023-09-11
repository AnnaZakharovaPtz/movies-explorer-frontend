import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import './SavedMovies.css';
import { useEffect, useState } from 'react';
import * as mainApi from '../../utils/MainApi';

function SavedMovies({ loggedIn }) {
  const [movies, setMovies] = useState([]);
  const [emptySearchRes, setEmptySearchRes] = useState(true);
  const [resultMovies, setResultMovies] = useState([]);

  function getSavedMovies() {
    mainApi.getUserMovies()
      .then((res) => {
        localStorage.setItem('saved-movies', JSON.stringify(res));
        if (resultMovies.length > 0) {
          const newRes = resultMovies.map((movie) => {
            for (let i = 0; i < res.length; i++) {
              if (res[i]._id === movie._id) {
                return movie;
              }
            }
            return false;
          });
          setMovies(newRes.filter(e => e !== false));
        } else {
          setMovies(res);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleLikeClick(movie) {
    mainApi.deleteMovie(movie._id)
      .then((res) => {
        if (res) getSavedMovies();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function filterMovies(allMovies, req) {
    if (req) {
      const result = allMovies.filter((movie) => {
        return (movie.nameRU.toLowerCase().includes(req.toLowerCase())
          || movie.nameEN.toLowerCase().includes(req.toLowerCase()));
      });
      result.length ? setEmptySearchRes(false) : setEmptySearchRes(true);
      return result;
    } else {
      setEmptySearchRes(true);
      return [];
    }
  }

  function handleSearchRequest(search, short) {
    const savedMovies = JSON.parse(localStorage.getItem('saved-movies') || "[]");
    if (savedMovies) {
      const result = filterMovies(savedMovies, search);
      setResultMovies(result);
      if (short) {
        setMovies(filterShortMovies(result));
      } else {
        setMovies(result);
      }
    }
  }

  function filterShortMovies(movies) {
    const result = movies.filter((movie) => {
      return movie.duration <= 40;
    });
    result.length ? setEmptySearchRes(false) : setEmptySearchRes(true);
    return result;
  }

  function handleShortFilmCheckbox(shortFilm) {
    if (shortFilm) {
      setMovies(filterShortMovies(resultMovies));
    }
    else {
      setMovies(resultMovies);
    }
  }

  useEffect(() => {
    const savedMoviesList = JSON.parse(localStorage.getItem('saved-movies') || "[]");
    setMovies(savedMoviesList);
    setResultMovies(savedMoviesList);
  }, []);

  return (
    <div className='page'>
      <Header loggedIn={loggedIn} />
      <main>
        <SearchForm
          handleSearchRequest={handleSearchRequest}
          handleShortFilmCheckbox={handleShortFilmCheckbox}
        />
        <MoviesCardList movies={movies} onLikeClick={handleLikeClick} savedMoviesList={true} />
        <div className='saved-movies-container'>
          {movies.length ? '' : 'Ничего не найдено'}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default SavedMovies;
