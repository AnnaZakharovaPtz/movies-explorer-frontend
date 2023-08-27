import { Link } from 'react-router-dom';
import './NavTab.css';

function NavTab() {
  return (
    <section className='navtab'>
      <Link to='#about-project' className='navtab__link'>Узнать больше</Link>
    </section>
  );
}

export default NavTab;
