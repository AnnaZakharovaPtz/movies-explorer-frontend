import { useNavigate } from 'react-router-dom';
import './PageNotFound.css';

function PageNotFound() {
  const navigate = useNavigate();

  return (
    <main className='not-found'>
      <section>
        <h1 className='not-found__title'>404</h1>
        <p className='not-found__message'>Страница не найдена</p>
        <button
          className='not-found__button'
          type='button'
          onClick={() => navigate(-1)}
        >
          Назад
        </button>
      </section>
    </main>
  );
}

export default PageNotFound;
