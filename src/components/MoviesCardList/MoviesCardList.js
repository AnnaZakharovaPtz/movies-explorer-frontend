import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

function MoviesCardList() {
  return (
    <section>
      <ul className='movies-list__items'>
        <li className='movies-list__item'>
          <MoviesCard />
        </li>
        <li className='movies-list__item'>
          <MoviesCard />
        </li>
        <li className='movies-list__item'>
          <MoviesCard />
        </li>
        <li className='movies-list__item'>
          <MoviesCard />
        </li>
        <li className='movies-list__item'>
          <MoviesCard />
        </li>
        <li className='movies-list__item'>
          <MoviesCard />
        </li>
        <li className='movies-list__item'>
          <MoviesCard />
        </li>
        <li className='movies-list__item'>
          <MoviesCard />
        </li>
      </ul>
    </section>
  );
}

export default MoviesCardList;
