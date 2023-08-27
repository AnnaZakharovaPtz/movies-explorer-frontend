import './Login.css';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';

function Login() {
  return (
    <div className='login'>
      <header className='login__header'>
        <Logo />
        <h1 className='login__title'>Рады видеть!</h1>
      </header>

      <form className="login__form">
        <div className='login__form-name'>E-mail</div>
        <input
          className="login__form-input"
          type="email"
          id="login-email"
          name="email"
          placeholder="Email"
          minLength="2"
          maxLength="50"
          required
        />
        <div className='login__form-line'></div>
        <div className='login__form-name'>Пароль</div>
        <input
          className="login__form-input"
          type="password"
          id="login-password"
          name="password"
          placeholder="Пароль"
          minLength="2"
          maxLength="50"
          required
        />
        <div className='login__form-line'></div>
        <button className="login__form-submit" type="submit">Войти</button>
      </form>
      <p className='login__register-info'>
        Ещё не зарегистрированы?
        <Link to="/signup" className='login__register-link'>Регистрация</Link>
      </p>

    </div>
  );
}

export default Login;
