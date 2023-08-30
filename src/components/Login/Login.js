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
      <main>
        <section>
          <form className="login__form">
            <label className='login__form-name'>E-mail</label>
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
            <label className='login__form-name'>Пароль</label>
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
            <button className="login__form-submit" type="submit">Войти</button>
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
