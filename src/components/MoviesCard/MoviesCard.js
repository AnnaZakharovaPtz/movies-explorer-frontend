import LandingUnderlineLight from '../LandingUnderlineLight/LandingUnderlineLight';
import img from '../../images/movie.png';
import './MoviesCard.css';

function MoviesCard() {
  return (
    <div className='movies-card__container'>
      <img className='movies-card__img' src={img} alt='Movie pic' />
      <div className='movies-card__info-container'>
        <p className='movies-card__name' >33 слова о дизайне</p>
        <button className='movies-card__like-button' type='button' aria-label='Сохранить'></button>
      </div>
      <LandingUnderlineLight />
      <p className='movies-card__duration'>1ч 42м</p>
    </div>
  );
}

export default MoviesCard;
