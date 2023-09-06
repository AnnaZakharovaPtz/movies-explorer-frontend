import './MoviesCard.css';
import { useEffect, useState } from 'react';

function MoviesCard({ movie, onLikeClick, savedMoviesList }) {
  const [isSaved, setIsSaved] = useState(false);
  const [savedMovieId, setSavedMovieId] = useState('');

  useEffect(() => {
    if (!savedMoviesList) {
      const savedMovies = JSON.parse(localStorage.getItem('saved-movies') || "[]");
      const i = savedMovies.findIndex(e => e.movieId === movie.id);
      if (i > -1) {
        setIsSaved(true);
        setSavedMovieId(savedMovies[i]._id);
      }
    }
  }, []);

  function formatDuration(duration) {
    const hours = Math.floor(duration / 60);
    const minutes = duration - hours * 60;
    return `${hours}ч ${minutes}м`;
  }

  function handleLikeButtonClick() {
    onLikeClick(movie, isSaved, savedMovieId);
    setIsSaved(!isSaved);
  }

  function handleDeleteSavedMovie() {
    onLikeClick(movie);
  }

  return (
    <div className='movies-card'>
      <a href={movie.trailerLink} target='blank'>
        <img
          className='movies-card__img'
          src={savedMoviesList ? movie.image : `https://api.nomoreparties.co/${movie.image.url}`}
          alt={movie.nameRU}
        />
      </a>
      <div className='movies-card__info-container'>
        <h2 className='movies-card__name' >{movie.nameRU}</h2>
        {savedMoviesList
          ? <button
            className={'movies-card__delete-saved-movie'}
            type='button'
            onClick={handleDeleteSavedMovie}
            aria-label='Удалить'>
          </button>
          : <button
            className={
              isSaved
                ? 'movies-card__like-button movies-card__like-button_active'
                : 'movies-card__like-button'
            }
            type='button'
            onClick={handleLikeButtonClick}
            aria-label='Сохранить'>
          </button>
        }
      </div>
      <p className='movies-card__duration'>{formatDuration(movie.duration)}</p>
    </div>
  );
}

export default MoviesCard;
