import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoreMovies from '../MoreMovies/MoreMovies';
import Footer from '../Footer/Footer';
import './Movies.css';
import '../Main/Main.css';
import SideMenu from '../SideMenu/SideMenu';

function Movies() {
  return (
    <div className='page'>
      <Header />
      <SearchForm />
      {/* <Preloader /> */}
      <MoviesCardList />
      <MoreMovies />
      <Footer />
      {/* <SideMenu /> */}
    </div>
  );
}

export default Movies;
