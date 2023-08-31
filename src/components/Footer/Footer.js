import './Footer.css';

function Footer() {
  return (
    <footer className='footer'>
      <p className='footer__text'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className='footer__info'>
        <p className='footer__copyright'>&copy; 2023. Анна Захарова</p>
        <nav className='footer__menu'>
          <ul className='footer__menu-items'>
            <li className='footer__menu-item'>
              <a className='footer__link' href='https://practicum.yandex.ru/' target='blank'>Яндекс.Практикум</a>
            </li>
            <li className='footer__menu-item'>
              <a className='footer__link' href='https://github.com/' target='blank'>Github</a>
            </li>
          </ul>
        </nav>
      </div>
    </footer >
  );
}

export default Footer;
