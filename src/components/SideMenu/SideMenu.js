import { NavLink, Link } from 'react-router-dom';
import './SideMenu.css';

function SideMenu({ menuOpen, setMenuOpen }) {

  function handleCloseButtonClick(evt) {
    setMenuOpen(false);
  }

  return (
    <div className={menuOpen ? 'side-menu side-menu_opened' : 'side-menu'}>
      <nav className='side-menu__nav'>
        <button
          className='side-menu__close-button'
          type='button'
          aria-label='Закрыть'
          onClick={handleCloseButtonClick}
        />
        <div className='side-menu__links-container'>
          <ul className='side-menu__items'>
            <li className='side-menu__item'>
              <NavLink
                className={({ isActive }) => (isActive ? 'side-menu__link side-menu__link_active' : 'side-menu__link')}
                to='/'>
                Главная
              </NavLink>
            </li>
            <li className='side-menu__item'>
              <NavLink
                className={({ isActive }) => (isActive ? 'side-menu__link side-menu__link_active' : 'side-menu__link')}
                to='/movies'>
                Фильмы
              </NavLink>
            </li>
            <li className='side-menu__item'>
              <NavLink
                className={({ isActive }) => (isActive ? 'side-menu__link side-menu__link_active' : 'side-menu__link')}
                to='/saved-movies'>
                Сохранённые фильмы
              </NavLink>
            </li>
          </ul>

          <Link className='side-menu__profile-link' to='/profile' />
        </div>
      </nav>
    </div>
  );
}

export default SideMenu;
