import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import './Profile.css';

function Profile() {
  return (
    <div className='profile'>
      <Header />
      <div className='profile__content'>
        <h1 className='profile__title'>Привет, Виталий!</h1>
        <form className="register__form">
          <div className='profile__input-container'>
            <label className='profile__input-label'>Имя</label>
            <input
              className="profile__form-input"
              type="text"
              id="register-name"
              name="name"
              placeholder="Имя"
              minLength="2"
              maxLength="50"
              required
            />
          </div>
          <div className='profile__form-line'></div>
          <div className='profile__input-container'>
            <label className='profile__input-label'>E-mail</label>
            <input
              className="profile__form-input"
              type="email"
              id="register-email"
              name="email"
              placeholder="Email"
              minLength="2"
              maxLength="50"
              required
            />
          </div>
          <button className="profile__form-submit" type="submit">Редактировать</button>
        </form>
        <button className="profile__logout" type="button">
          <Link className="profile__logout-link" to='/'> Выйти из аккаунта </Link>
        </button>
      </div>
    </div>
  );
}

export default Profile;
