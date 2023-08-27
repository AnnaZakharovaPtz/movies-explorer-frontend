import './Portfolio.css';
import LandingUnderlineLight from '../LandingUnderlineLight/LandingUnderlineLight';

function Portfolio() {
  return (
    <section className='portfolio'>
      <h2 className='portfolio__title'>Портфолио</h2>
      <div className='portfolio__list'>
        <div className='portfolio__item-container'>
          <p className='portfolio__item-text '>Статичный сайт</p>
          <a className='portfolio__item-link' href='https://github.com/AnnaZakharovaPtz/how-to-learn' target='blank'>
          </a>
        </div>
        <LandingUnderlineLight />
        <div className='portfolio__item-container'>
          <p className='portfolio__item-text '>Адаптивный сайт</p>
          <a className='portfolio__item-link' href='https://annazakharovaptz.github.io/russian-travel/index.html' target='blank'>
          </a>
        </div>
        <LandingUnderlineLight />
        <div className='portfolio__item-container'>
          <p className='portfolio__item-text '>Одностраничное приложение</p>
          <a className='portfolio__item-link' href='https://github.com/AnnaZakharovaPtz/react-mesto-api-full-gha' target='blank'>
          </a>
        </div>
      </div>
    </section>
  );
}

export default Portfolio;
