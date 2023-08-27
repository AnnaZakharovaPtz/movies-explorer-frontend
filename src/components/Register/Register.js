import './Register.css';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';

function Register() {
  return (
    <div className='register'>
      <header className='register__header'>
        <Logo />
        <h1 className='register__title'>Добро пожаловать!</h1>
      </header>
      <form className="register__form">
        <div className='register__form-name'>Имя</div>
        <input
          className="register__form-input"
          type="text"
          id="register-name"
          name="name"
          placeholder="Имя"
          minLength="2"
          maxLength="50"
          required
        />
        <div className='register__form-line'></div>
        <div className='register__form-name'>E-mail</div>
        <input
          className="register__form-input"
          type="email"
          id="register-email"
          name="email"
          placeholder="Email"
          minLength="2"
          maxLength="50"
          required
        />
        <div className='register__form-line'></div>
        <div className='register__form-name'>Пароль</div>
        <input
          className="register__form-input"
          type="password"
          id="register-password"
          name="password"
          placeholder="Пароль"
          minLength="2"
          maxLength="50"
          required
        />
        <div className='register__form-line'></div>
        <button className="register__form-submit" type="submit">Зарегистрироваться</button>
      </form>
      <p className='register__login-info'>
        Уже зарегистрированы?
        <Link to="/signin" className='register__login-link'>Войти</Link>
      </p>
    </div>
  );
}

export default Register;
