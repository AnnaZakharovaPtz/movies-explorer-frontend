import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import './SavedMovies.css';

function SavedMovies() {
  return (
    <div className='page'>
      <Header />
      <main>
        <SearchForm />
        {/* <Preloader /> */}
        <MoviesCardList />
        <div className='saved-movies-container'></div>
      </main>
      <Footer />
    </div>
  );
}

export default SavedMovies;
