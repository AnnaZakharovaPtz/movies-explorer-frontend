import { useLocation } from 'react-router-dom';
import './Header.css';
import SideMenu from '../SideMenu/SideMenu';
import Navigation from '../Navigation/Navigation';
import { useEffect, useState } from 'react';

function Header() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isScreenSmall, setIsScreenSmall] = useState(windowWidth <= 768);
  const [menuOpen, setMenuOpen] = useState(false);

  const currentPath = useLocation();
  let isDarkHeader;
  if (currentPath.pathname === '/') {
    isDarkHeader = true;
  } else {
    isDarkHeader = false;
  }

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  useEffect(() => {
    if ((windowWidth <= 768) && (isScreenSmall === false)) {
      setIsScreenSmall(true);
      console.log("upd_true");
    } else if ((windowWidth > 768) && (isScreenSmall === true)) {
      setIsScreenSmall(false);
      console.log("upd_false");
    }
  }, [windowWidth]);

  return (
    <header className={isDarkHeader ? 'header header_dark' : 'header'}>
      <Navigation
        isScreenSmall={isScreenSmall}
        isDark={isDarkHeader}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />
      <SideMenu
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />
    </header >
  );
}

export default Header;
