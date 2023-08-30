import './Portfolio.css';

function Portfolio() {
  return (
    <section className='portfolio'>
      <h2 className='portfolio__title'>Портфолио</h2>
      <ul className='portfolio__list'>
        <li className='portfolio__list-item'>
          <a
            className='portfolio__item-link'
            href='https://github.com/AnnaZakharovaPtz/how-to-learn'
            target='blank'
          >
            <p className='portfolio__item-text '>Статичный сайт</p>
            <div className='portfolio__item-icon'></div>
          </a>
        </li>
        <li className='portfolio__list-item'>
          <a
            className='portfolio__item-link'
            href='https://annazakharovaptz.github.io/russian-travel/index.html'
            target='blank'
          >
            <p className='portfolio__item-text '>Адаптивный сайт</p>
            <div className='portfolio__item-icon'></div>
          </a>
        </li>
        <li className='portfolio__list-item portfolio__list-item_last'>
          <a
            className='portfolio__item-link'
            href='https://github.com/AnnaZakharovaPtz/react-mesto-api-full-gha'
            target='blank'
          >
            <p className='portfolio__item-text '>Одностраничное приложение</p>
            <div className='portfolio__item-icon'></div>
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
