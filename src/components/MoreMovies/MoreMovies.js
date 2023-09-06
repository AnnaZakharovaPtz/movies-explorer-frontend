import './MoreMovies.css';

function MoreMovies({ onMoreClick, isMoreMoviesVisible, moviesToAddCount }) {
  const handleMoreMoviesClick = () => {
    onMoreClick(moviesToAddCount);
  }

  return (
    <button
      className='more-movies'
      style={{ visibility: isMoreMoviesVisible ? 'visible' : 'hidden' }}
      onClick={handleMoreMoviesClick}
      type='button'>
      Ещё
    </button>
  );
}

export default MoreMovies;
