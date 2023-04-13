import { Link, useLocation } from 'react-router-dom';
import HeaderLogo from '../images/svg/logo.svg';

function Header({ handleHeaderExit, email, isApiRequestReceived }) {
  const { pathname } = useLocation();
  return (
    <header className="header">
      <div className="header__wrapper">
        <img className="header__logo" src={HeaderLogo} alt="Логотип" />
        <ul className="header__navbar">
          {pathname === '/' && isApiRequestReceived && (
            <>
              <li>
                <p className="header__navbar-text">{email}</p>
              </li>
              <li>
                <button
                  className="header__navbar-button"
                  onClick={handleHeaderExit}
                >
                  Выйти
                </button>
              </li>
            </>
          )}
          {pathname === '/sign-in' && (
            <li>
              <Link to="/sign-up" className="header__navbar-link">
                Регистрация
              </Link>
            </li>
          )}
          {pathname === '/sign-up' && (
            <li>
              <Link to="/sign-in" className="header__navbar-link">
                Вход
              </Link>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
}

export default Header;
