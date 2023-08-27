import { useNavigate } from 'react-router-dom';
import './PageNotFound.css';

function PageNotFound() {
  const navigate = useNavigate();

  return (
    <div className='not-found'>
      <h1 className='not-found__title'>404</h1>
      <p className='not-found__message'>Страница не найдена</p>
      <button className='not-found__button' onClick={() => navigate(-1)}>Назад</button>
    </div>
  );
}

export default PageNotFound;
