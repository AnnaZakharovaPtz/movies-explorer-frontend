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
      return [];
    }
  }

  function filterShortMovies(movies) {
    const result = movies.filter((movie) => {
      return movie.duration <= 40;
    });
    result.length ? setEmptySearchRes(false) : setEmptySearchRes(true);
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
    if (windowWidth >= 1160) {
      moviesCount = 16;
      if (movies.length > moviesCount) {
        setMoviesToShow(movies.slice(0, moviesCount));
        setIsMoreMoviesVisible(true);
        setMoviesToAddCount(4);
      } else {
        setMoviesToShow(movies);
      }
    } else if (windowWidth >= 910) {
      moviesCount = 12;
      if (movies.length > moviesCount) {
        setMoviesToShow(movies.slice(0, moviesCount));
        setIsMoreMoviesVisible(true);
        setMoviesToAddCount(3);
      } else {
        setMoviesToShow(movies);
      }
    } else if (windowWidth >= 728) {
      moviesCount = 8;
      if (movies.length > moviesCount) {
        setMoviesToShow(movies.slice(0, moviesCount));
        setIsMoreMoviesVisible(true);
        setMoviesToAddCount(2);
      } else {
        setMoviesToShow(movies);
      }
    } else {
      moviesCount = 5;
      if (movies.length > moviesCount) {
        setMoviesToShow(movies.slice(0, moviesCount));
        setIsMoreMoviesVisible(true);
        setMoviesToAddCount(2);
      } else {
        setMoviesToShow(movies);
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
