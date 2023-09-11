import validator from 'email-validator';
import Header from '../Header/Header';
import { useContext, useState, useEffect } from 'react';
import { CurrentUser } from '../../contexts/UserContext';
import { ServerError } from '../../contexts/ServerErrorContext';
import './Profile.css';

function Profile({ handleProfileUpdate, handleSignOut, loggedIn, cleanup }) {
  const currentUser = useContext(CurrentUser);
  const serverError = useContext(ServerError);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [validation, setValidation] = useState({
    name: '',
    email: '',
    needValidation: false
  });
  const [isFormValid, setIsFormValid] = useState(false);

  const handleNameChange = (evt) => {
    setName(evt.target.value);
  }

  const handleEmailChange = (evt) => {
    setEmail(evt.target.value);
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleProfileUpdate(name, email);
    setIsFormValid(false);
  }

  const validate = () => {
    if (!validation.needValidation) {
      setValidation({ ...validation, needValidation: true });
      return;
    }

    let errors = {};

    const namePattern = /^([A-Za-zА-Яа-яЁё-\s])+$/;
    if (name.trim() === '') {
      errors.name = 'Поле обязательно к заполнению'
    } else if (name.length <= 2) {
      errors.name = 'Длина поля должна быть не меньше 2 символов';
    } else if (!name.match(namePattern)) {
      errors.name = 'Неверно введено имя';
    } else {
      errors.name = '';
    }

    if (email.trim() === '') {
      errors.email = 'Поле обязательно к заполнению'
    } else if (email.length <= 2) {
      errors.email = 'Длина поля должна быть не меньше 2 символов';
    } else if (!validator.validate(email)) {
      errors.email = 'Неверно введён Email';
    } else {
      errors.email = '';
    }

    setValidation({ ...validation, ...errors });
    if (errors.name === '' && errors.email === '') {
      if (name !== currentUser.name || email !== currentUser.email) {
        setIsFormValid(true);
      } else {
        setIsFormValid(false);
      }
    }
  }

  useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser]);

  useEffect(() => {
    validate();
  }, [name, email]);

  useEffect(() => {
    cleanup();
  }, []);

  return (
    <div className='profile'>
      <Header loggedIn={loggedIn} />
      <main className='profile__content'>
        <section>
          <h1 className='profile__title'>Привет, {currentUser.name}!</h1>
          <form className="profile__form" onSubmit={handleSubmit}>
            <div
              className='profile__input-container 
            profile__input-container_border-bottom'
            >
              <label className='profile__input-label'>Имя</label>
              <input
                className="profile__form-input"
                value={name || ''}
                onChange={handleNameChange}
                type="text"
                id="register-name"
                name="name"
                placeholder='Имя'
                minLength="2"
                maxLength="50"
                required
              />
            </div>
            {validation.name && <span className='profile__form-error'>{validation.name}</span>}
            <div className='profile__input-container'>
              <label className='profile__input-label'>E-mail</label>
              <input
                className="profile__form-input"
                value={email || ''}
                onChange={handleEmailChange}
                type="email"
                id="register-email"
                name="email"
                placeholder='Email'
                minLength="2"
                maxLength="50"
                required
              />
            </div>
            {validation.email && <span className='profile__form-error'>{validation.email}</span>}
            <p
              className='profile__server-error'
              style={{ visibility: serverError ? 'visible' : 'hidden' }}
            >{serverError}</p>
            <button
              className="profile__form-submit"
              type="submit"
              style={{ visibility: isFormValid ? 'visible' : 'hidden' }}
            >
              Сохранить
            </button>
            <p
              className='profile__edit-text'
              style={{ visibility: !isFormValid ? 'visible' : 'hidden' }}
            >
              Редактировать
            </p>
          </form>
          <button className="profile__logout" type="button" onClick={handleSignOut}>
            Выйти из аккаунта
          </button>
        </section>
      </main>
    </div>
  );
}

export default Profile;
