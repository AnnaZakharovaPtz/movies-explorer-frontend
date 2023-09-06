import './Register.css';
import { Link } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import validator from 'email-validator';
import { ServerError } from '../../contexts/ServerErrorContext';
import Logo from '../Logo/Logo';

function Register({ handleRegister, cleanup }) {
  const serverError = useContext(ServerError);
  const [formValue, setFormValue] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [validation, setValidation] = useState({
    name: '',
    email: '',
    password: '',
    needValidation: false
  });
  const [isFormValid, setIsFormValid] = useState(false);

  const handleChange = (evt) => {
    const { name, value } = evt.target;

    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleRegister(formValue);
  }

  const validate = () => {
    if (!validation.needValidation) {
      setValidation({ ...validation, needValidation: true });
      return;
    }

    let errors = {};

    const namePattern = /^([A-Za-zА-Яа-яЁё-\s])+$/;
    if (formValue.name.trim() === '') {
      errors.name = 'Поле обязательно к заполнению'
    } else if (formValue.name.length <= 2) {
      errors.name = 'Длина поля должна быть не меньше 2 символов';
    } else if (!formValue.name.match(namePattern)) {
      errors.name = 'Неверно введено имя';
    } else {
      errors.name = '';
    }

    if (formValue.email.trim() === '') {
      errors.email = 'Поле обязательно к заполнению'
    } else if (formValue.email.length <= 2) {
      errors.email = 'Длина поля должна быть не меньше 2 символов';
    } else if (!validator.validate(formValue.email)) {
      errors.email = 'Неверно введён Email';
    } else {
      errors.email = '';
    }

    if (formValue.password.trim() === '') {
      errors.password = 'Поле обязательно к заполнению'
    } else if (formValue.password.length < 8) {
      errors.password = 'Длина поля должна быть не меньше 8 символов';
    } else {
      errors.password = '';
    }

    setValidation({ ...validation, ...errors });
    setIsFormValid(errors.name === '' && errors.email === '' && errors.password === '');
  }

  useEffect(() => {
    validate();
  }, [formValue]);

  useEffect(() => {
    cleanup();
  }, []);

  return (
    <div className='register'>
      <header className='register__header'>
        <Logo />
        <h1 className='register__title'>Добро пожаловать!</h1>
      </header>
      <main>
        <section>
          <form className="register__form" onSubmit={handleSubmit}>
            <label className='register__form-name'>Имя</label>
            <input
              className="register__form-input"
              value={formValue.name}
              onChange={handleChange}
              type="text"
              id="register-name"
              name="name"
              placeholder="Имя"
              minLength="2"
              maxLength="50"
              required
            />
            {validation.name && <span className='register__form-error'>{validation.name}</span>}
            <label className='register__form-name'>E-mail</label>
            <input
              className="register__form-input"
              value={formValue.email}
              onChange={handleChange}
              type="email"
              id="register-email"
              name="email"
              placeholder="Email"
              minLength="2"
              maxLength="50"
              required
            />
            {validation.email && <span className='register__form-error'>{validation.email}</span>}
            <label className='register__form-name'>Пароль</label>
            <input
              className="register__form-input"
              value={formValue.password}
              onChange={handleChange}
              type="password"
              id="register-password"
              name="password"
              placeholder="Пароль"
              minLength="2"
              maxLength="50"
              required
            />
            {validation.password && <span className='register__form-error'>{validation.password}</span>}
            <p
              className='register__server-error'
              style={{ visibility: serverError ? 'visible' : 'hidden' }}
            >{serverError}</p>
            <button
              className="register__form-submit"
              disabled={!isFormValid}
              type="submit"
            >
              Зарегистрироваться
            </button>
          </form>
          <p className='register__login-info'>
            Уже зарегистрированы?
            <Link to="/signin" className='register__login-link'>Войти</Link>
          </p>
        </section>
      </main>
    </div>
  );
}

export default Register;
