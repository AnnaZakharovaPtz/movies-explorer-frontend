import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

function MoviesCardList({ movies, onLikeClick, savedMoviesList }) {
  return (
    <section className='movies-list'>
      <ul className='movies-list__items'>
        {
          movies.map((movie) => {
            return (
              <li key={movie.id ? movie.id : movie._id} className='movies-list__item'>
                <MoviesCard movie={movie} onLikeClick={onLikeClick} savedMoviesList={savedMoviesList} />
              </li>
            );
          })
        }
      </ul>
    </section>
  );
}

export default MoviesCardList;
