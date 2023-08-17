import logo from '../images/logo_Mesto.svg';
import { Link, Navigate, Route, Routes, useNavigate } from 'react-router-dom';

function Header({isLoggedIn, signOut, userEmail = ''}) {

  return (
    <header className="header">
      <img
        src={logo}
        alt="Лого Mesto"
        className="header__logo"
      />
      <div className='header__account'>
        {isLoggedIn && <p className="header__mail">{userEmail}</p>}
        <Routes>
        <Route
            path="/"
            element={isLoggedIn && (
              <Link onClick={isLoggedIn ? signOut : undefined}
              className={`header__link ${isLoggedIn ? ' header__link_text_dim' : ''}`}
              to="signin">
                Выйти
              </Link>
            )} 
          />
          <Route
            path="/signup"
            element={
              <Link to="/signin" className="header__link">
                Войти
              </Link>
            }
          />
          <Route
            path="/signin"
            element={
              <Link to="/signup" className="header__link">
                Регистрация
              </Link>
            }
          />
          </Routes>
      </div>
    </header>
  )
}

export default Header;