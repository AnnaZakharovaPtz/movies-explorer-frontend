import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import './Navigation.css';

function Navigation({ loggedIn, isDark, isScreenSmall, setMenuOpen }) {
  function handleMenuOpen() {
    setMenuOpen(true);
  }

  return (
    loggedIn === 'loggedIn' ?
      <nav className='navigation'>
        <Logo />
        {isScreenSmall ? (
          <button
            className={
              isDark
                ? 'navigation__burger-button navigation__burger-button_light'
                : 'navigation__burger-button'}
            type='button'
            aria-label='Меню'
            onClick={handleMenuOpen}
          />
        ) : (
          <>
            <div className='navigation__links-container'>
              <Link className={
                isDark
                  ? 'navigation__movies-link navigation__movies-link_dark'
                  : 'navigation__movies-link'}
                to='/movies'>
                Фильмы
              </Link>
              <Link className={
                isDark
                  ? 'navigation__saved-movies-link navigation__saved-movies-link_dark'
                  : 'navigation__saved-movies-link'}
                to='/saved-movies'>
                Сохранённые фильмы
              </Link>
            </div>
            <Link className={
              isDark
                ? 'navigation__profile-link navigation__profile-link_dark'
                : 'navigation__profile-link'}
              to='/profile' />
          </>
        )}
      </nav>
      :
      <nav className='navigation'>
        <Logo />
        <div>
          <Link className='navigation__signup-link' to='/signup'>
            Регистрация
          </Link>
          <Link className='navigation__signin-link' to='/signin'>
            Войти
          </Link>
        </div>
      </nav>
  );
}

export default Navigation;
