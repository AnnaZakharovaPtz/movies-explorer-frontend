import { useEffect, useState } from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoreMovies from '../MoreMovies/MoreMovies';
import Footer from '../Footer/Footer';
import * as moviesApi from '../../utils/MoviesApi';
import * as mainApi from '../../utils/MainApi';
import { SearchFormContext } from '../../contexts/SearchFormContext';
import { EMPTY_RESULT, MOVIES_PROCESS_ERROR } from '../../utils/errors';
import { MOVIES_TO_ADD_L, MOVIES_TO_ADD_M, MOVIES_TO_ADD_S, MOVIES_TO_SHOW_L, MOVIES_TO_SHOW_M, MOVIES_TO_SHOW_S, MOVIES_TO_SHOW_XL, SHORT_MOVIE_DURATION, WINDOW_WIDTH_L, WINDOW_WIDTH_M, WINDOW_WIDTH_S } from '../../utils/moviesConst';
import './Movies.css';
import '../Main/Main.css';

function Movies({ loggedIn }) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [movies, setMovies] = useState([]);
  const [moviesToShow, setMoviesToShow] = useState([]);
  const [isMoreMoviesVisible, setIsMoreMoviesVisible] = useState(false);
  const [isLikeButtonBlocked, setIsLikeButtonBlocked] = useState(false);
  const [moviesToAddCount, setMoviesToAddCount] = useState(0);
  const [emptySearchRes, setEmptySearchRes] = useState(true);
  const [isPreloaderVisible, setIsPreloaderVisible] = useState(false);
  const [searchForm, setSearchForm] = useState({ request: '', short: false });
  const [errorResult, setErrorResult] = useState('');

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
      setIsMoreMoviesVisible(false);
      return [];
    }
  }

  function filterShortMovies(movies) {
    const result = movies.filter((movie) => {
      return movie.duration <= SHORT_MOVIE_DURATION;
    });
    if (result.length) {
      setEmptySearchRes(false)
    } else {
      setEmptySearchRes(true);
      setIsMoreMoviesVisible(false);
    }
    return result;
  }

  function getMoviesFromServer(search, short) {
    setIsPreloaderVisible(true);
    moviesApi.getMovies()
      .then((data) => {
        localStorage.setItem('movies', JSON.stringify(data));
        const result = filterMovies(data, search);
        localStorage.setItem('result-movies', JSON.stringify(result));
        localStorage.setItem('search-request', search);
        localStorage.setItem('short-film', short);
        if (short) {
          setMovies(filterShortMovies(result));
        } else {
          setMovies(result);
        }
        setIsPreloaderVisible(false);
      })
      .catch(() => {
        setErrorResult(MOVIES_PROCESS_ERROR);
        setEmptySearchRes(false);
        setIsPreloaderVisible(false);
        setIsMoreMoviesVisible(false);
        setMovies([]);
      });
  }

  function handleSearchRequest(search, short) {
    let allMovies = localStorage.getItem('movies');
    if (allMovies === null) {
      getMoviesFromServer(search, short);
      return;
    }
    if (allMovies) {
      const result = filterMovies(JSON.parse(allMovies || "[]"), search);
      localStorage.setItem('result-movies', JSON.stringify(result));
      localStorage.setItem('search-request', search);
      localStorage.setItem('short-film', short);
      if (short) {
        setMovies(filterShortMovies(result));
      } else {
        setMovies(result);
      }
    }
  }

  function handleShortFilmCheckbox(shortFilm) {
    localStorage.setItem('short-film', shortFilm);
    const currentMovies = JSON.parse(localStorage.getItem('result-movies') || "[]");
    if (shortFilm) {
      setMovies(filterShortMovies(currentMovies));
    }
    else {
      setMovies(currentMovies);
    }
  }

  function getSavedMovies() {
    mainApi.getUserMovies()
      .then((res) => {
        localStorage.setItem('saved-movies', JSON.stringify(res));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleLikeClick(movie, isSaved, id) {
    setIsLikeButtonBlocked(true);
    if (!isSaved) {
      return mainApi.saveMovie(movie)
        .then((res) => {
          setIsLikeButtonBlocked(false);
          getSavedMovies();
          return res._id;
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return mainApi.deleteMovie(id)
        .then((res) => {
          setIsLikeButtonBlocked(false);
          if (res) {
            getSavedMovies();
            return res._id;
          }
        })
        .catch((err) => {
          setIsLikeButtonBlocked(false);
          console.log(err);
        });
    }
  }

  function handleMoreMoviesClick(moviesToAdd) {
    const moviesToShowCount = moviesToShow.length + moviesToAdd;
    setMoviesToShow(movies.slice(0, moviesToShowCount));
    setIsMoreMoviesVisible(moviesToShowCount < movies.length);
  }

  function setUpMoviesToShow() {
    let moviesCount;
    if (windowWidth >= WINDOW_WIDTH_L) {
      moviesCount = MOVIES_TO_SHOW_XL;
      if (movies.length > moviesCount) {
        setMoviesToShow(movies.slice(0, moviesCount));
        setIsMoreMoviesVisible(true);
        setMoviesToAddCount(MOVIES_TO_ADD_L);
      } else {
        setMoviesToShow(movies);
        setIsMoreMoviesVisible(false);
      }
    } else if (windowWidth >= WINDOW_WIDTH_M) {
      moviesCount = MOVIES_TO_SHOW_L;
      if (movies.length > moviesCount) {
        setMoviesToShow(movies.slice(0, moviesCount));
        setIsMoreMoviesVisible(true);
        setMoviesToAddCount(MOVIES_TO_ADD_M);
      } else {
        setMoviesToShow(movies);
        setIsMoreMoviesVisible(false);
      }
    } else if (windowWidth >= WINDOW_WIDTH_S) {
      moviesCount = MOVIES_TO_SHOW_M;
      if (movies.length > moviesCount) {
        setMoviesToShow(movies.slice(0, moviesCount));
        setIsMoreMoviesVisible(true);
        setMoviesToAddCount(MOVIES_TO_ADD_S);
      } else {
        setMoviesToShow(movies);
        setIsMoreMoviesVisible(false);
      }
    } else {
      moviesCount = MOVIES_TO_SHOW_S;
      if (movies.length > moviesCount) {
        setMoviesToShow(movies.slice(0, moviesCount));
        setIsMoreMoviesVisible(true);
        setMoviesToAddCount(MOVIES_TO_ADD_S);
      } else {
        setMoviesToShow(movies);
        setIsMoreMoviesVisible(false);
      }
    }
  }

  useEffect(() => {
    setUpMoviesToShow();
  }, [windowWidth, movies]);

  useEffect(() => {
    getSavedMovies();

    if (localStorage.getItem('result-movies')) {
      let resultMovies = JSON.parse(localStorage.getItem('result-movies') || "[]");
      let searchReq = '';
      if (localStorage.getItem('search-request')) {
        searchReq = localStorage.getItem('search-request');
      }
      const shortFilm = localStorage.getItem('short-film') === 'true';
      if (shortFilm) {
        setMovies(filterShortMovies(resultMovies));
      } else {
        setMovies(resultMovies);
        setEmptySearchRes(resultMovies.length === 0);
      }
      setSearchForm({ request: searchReq, short: shortFilm });
    } else {
      setEmptySearchRes(false);
    }

    setUpMoviesToShow();

    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };

  }, []);

  return (
    <SearchFormContext.Provider value={searchForm}>
      <div className='page'>
        <Header loggedIn={loggedIn} />
        <main>
          <SearchForm
            handleSearchRequest={handleSearchRequest}
            handleShortFilmCheckbox={handleShortFilmCheckbox}
          />
          <Preloader isPreloaderVisible={isPreloaderVisible} />
          <p className='movies__empty-result' style={{ display: emptySearchRes ? 'flex' : 'none' }}>
            {EMPTY_RESULT}
          </p>
          <p className='movies__empty-result' style={{ display: errorResult ? 'flex' : 'none' }}>
            {errorResult}
          </p>
          <MoviesCardList
            movies={moviesToShow}
            onLikeClick={handleLikeClick}
            isBlocked={isLikeButtonBlocked}
          />
          <MoreMovies
            onMoreClick={handleMoreMoviesClick}
            isMoreMoviesVisible={isMoreMoviesVisible}
            moviesToAddCount={moviesToAddCount}
          />
        </main>
        <Footer />
      </div>
    </SearchFormContext.Provider>
  );
}

export default Movies;
