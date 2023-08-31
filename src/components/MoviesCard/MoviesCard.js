import img from '../../images/movie.png';
import './MoviesCard.css';

function MoviesCard() {
  return (
    <div className='movies-card'>
      <img className='movies-card__img' src={img} alt='Кадр из фильма "33 слова о дизайне"' />
      <div className='movies-card__info-container'>
        <h2 className='movies-card__name' >33 слова о дизайне</h2>
        <button className='movies-card__like-button' type='button' aria-label='Сохранить'></button>
      </div>
      <p className='movies-card__duration'>1ч 42м</p>
    </div>
  );
}

export default MoviesCard;
