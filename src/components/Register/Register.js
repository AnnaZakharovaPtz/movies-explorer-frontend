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
      <main>
        <section>
          <form className="register__form">
            <label className='register__form-name'>Имя</label>
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
            <label className='register__form-name'>E-mail</label>
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
            <label className='register__form-name'>Пароль</label>
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
            <button className="register__form-submit" type="submit">Зарегистрироваться</button>
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
