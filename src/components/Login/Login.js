import './Login.css';
import { Link } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import validator from 'email-validator';
import { ServerError } from '../../contexts/ServerErrorContext';
import Logo from '../Logo/Logo';

function Login({ handleLogin, cleanup }) {
  const serverError = useContext(ServerError);
  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
  });
  const [validation, setValidation] = useState({
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
    handleLogin(formValue);
  }

  const validate = () => {
    if (!validation.needValidation) {
      setValidation({ ...validation, needValidation: true });
      return;
    }

    let errors = {};

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
    setIsFormValid(errors.email === '' && errors.password === '');
  }

  useEffect(() => {
    validate();
  }, [formValue]);

  useEffect(() => {
    cleanup();
  }, []);

  return (
    <div className='login'>
      <header className='login__header'>
        <Logo />
        <h1 className='login__title'>Рады видеть!</h1>
      </header>
      <main>
        <section>
          <form className="login__form" onSubmit={handleSubmit}>
            <label className='login__form-name'>E-mail</label>
            <input
              className="login__form-input"
              value={formValue.email}
              onChange={handleChange}
              type="email"
              id="login-email"
              name="email"
              placeholder="Email"
              minLength="2"
              maxLength="50"
              required
            />
            {validation.email && <span className='login__form-error'>{validation.email}</span>}
            <label className='login__form-name'>Пароль</label>
            <input
              className="login__form-input"
              value={formValue.password}
              onChange={handleChange}
              type="password"
              id="login-password"
              name="password"
              placeholder="Пароль"
              minLength="2"
              maxLength="50"
              required
            />
            {validation.password && <span className='login__form-error'>{validation.password}</span>}
            <p
              className='login__server-error'
              style={{ visibility: serverError ? 'visible' : 'hidden' }}
            >{serverError}</p>
            <button
              className="login__form-submit"
              disabled={!isFormValid}
              type="submit">
              Войти
            </button>
          </form>
          <p className='login__register-info'>
            Ещё не зарегистрированы?
            <Link to="/signup" className='login__register-link'>Регистрация</Link>
          </p>
        </section>
      </main>
    </div>
  );
}

export default Login;
