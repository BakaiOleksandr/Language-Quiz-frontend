import {Link, NavLink, useLocation} from 'react-router-dom';
import {useContext, useState} from 'react';
import {AuthContext} from '../context/AuthContext';
import {LanguageContext} from '../context.languages/LanguageContext';
import LanguageSelector from '../context.languages/LanguageSelector';

function Navbar() {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider `value` prop
  const {isLoggedIn, logOutUser} = useContext(AuthContext);
  //LanguageContext
  const {t} = useContext(LanguageContext);
  //...............
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const closeSidebar = () => setSidebarOpen(false);
  //................USE LOCATION
  const location = useLocation();
  const pageTitles = t && {
    '/': isLoggedIn ? `${t.navbar.home}` : 'Language Quiz Game',
    '/signup': `${t.sign_up}`,
    '/login': `${t.login}`,
    '/profile': `${t.profile.profile}`,
    '/settranslation': `${t.navbar.set_translation}`,
    '/level1':`${t.profile.level_1}`
  };
  const currentPage = pageTitles[location.pathname] || 'Language Quiz Game';
  //..............................

  return (
    <>
      <div className="navbar-header">
        <p className="header-text">{currentPage}</p>

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
        {/* ........................................................... */}
        {isLoggedIn ? (
          <>
            {/* HOME */}
            <NavLink to="/">
              <button onClick={closeSidebar}>{t.navbar.home}</button>
            </NavLink>
            {/* LANGUAGE SELECTOR */}
            <LanguageSelector />

            {/* PROFILE */}
            <NavLink to="/profile">
              <button onClick={closeSidebar}>{t.profile.profile}</button>
            </NavLink>
            {/* SET TRANSLATION */}
            <Link to="/settranslation">
              <button onClick={closeSidebar}>{t.navbar.set_translation}</button>
            </Link>
            {/* LOG OUT */}
            <button onClick={logOutUser}>Logout</button>
            {/* SIDEBAR CLOSE BTN */}
            <div
              className="close-sidebar-button"
              onClick={() => setSidebarOpen(false)}
            >
              ✖
            </div>
          </>
        ) : (
          // .................................................
          <>
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
            <Link to="/settranslation">
              <button onClick={closeSidebar}>{t.navbar.set_translation}</button>
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
