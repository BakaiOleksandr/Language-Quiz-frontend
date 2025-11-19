import {Link} from 'react-router-dom';
import {useContext, useState} from 'react';
import {AuthContext} from '../context/AuthContext';
import {LanguageContext} from '../context.languages/LanguageContext';
import LanguageSelector from '../context.languages/LanguageSelector';
import SetTranslation from '../pages/SetTranslation';

function Navbar() {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider `value` prop
  const {isLoggedIn, logOutUser} = useContext(AuthContext);
  //LanguageContext
  const {t} = useContext(LanguageContext);
  //...............
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <>
      <div className="navbar-header">
        <Link to="/">
          <p className="header-text">Language Quiz Game</p>
        </Link>
        {/*PRIVATE*/}
        {/* NAVBAR-BTN */}
        <nav className="navbar-btn">
          <div onClick={() => setSidebarOpen(true)}>☰</div>
        </nav>
      </div>
      {/* NAVBAR-BACKGROUND-OVERLAY */}
      <div
        className={`overlay ${sidebarOpen ? 'show' : ''}`}
        onClick={closeSidebar}
      ></div>
      {/* MENU-SIDEBAR */}
      <div className={`menu-sidebar ${sidebarOpen ? 'open' : ''}`}>
        {isLoggedIn ? (
          <>
            <LanguageSelector />
            <button onClick={logOutUser}>Logout</button>
            <Link to="/profile/settranslation">
              <button>{t.navbar.set_translation}</button>
            </Link>
            <Link to="/profile">
              <button>{t.profile.profile}</button>
            </Link>
            <div
              className="close-sidebar-button"
              onClick={() => setSidebarOpen(false)}
            >
              ✖
            </div>
          </>
        ) : (
          <>
            {' '}
            <LanguageSelector />
            <Link to="/">
              <button onClick={closeSidebar}>{t.navbar.home}</button>
            </Link>
            <Link to="/signup">
              <button onClick={closeSidebar}>{t.sign_up}</button>
            </Link>
            <Link to="/login">
              <button onClick={closeSidebar}>{t.login}</button>
            </Link>
            <div
              className="close-sidebar-button"
              onClick={() => setSidebarOpen(false)}
            >
              ✖
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Navbar;
