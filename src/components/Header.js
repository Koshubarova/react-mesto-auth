import logo from '../images/logo_Mesto.svg';
import { Link, useNavigate } from 'react-router-dom';

function Header({redirectLink, redirectLinkText, isLoggedIn, SignOut, userEmail = ''}) {

  return (
    <header className="header">
      <img
        src={logo}
        alt="Лого Mesto"
        className="header__logo"
      />
      <div className='header__account'>
        <p className='header__mail'>{userEmail}</p>
        <Link onClick={isLoggedIn ? SignOut : undefined}
              className={`header__link ${isLoggedIn ? ' header__link_text_dim' : ''}`}
              to={redirectLink}>{redirectLinkText}
        </Link>
      </div>
    </header>
  )
}

export default Header;