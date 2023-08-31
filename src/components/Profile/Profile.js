import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import './Profile.css';

function Profile() {
  return (
    <div className='profile'>
      <Header />
      <main className='profile__content'>
        <section>
          <h1 className='profile__title'>Привет, Виталий!</h1>
          <form className="profile__form">
            <div
              className='profile__input-container 
            profile__input-container_border-bottom'
            >
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
        </section>
      </main>
    </div>
  );
}

export default Profile;
