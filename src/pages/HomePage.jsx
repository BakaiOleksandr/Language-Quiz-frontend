import {Link} from 'react-router-dom';
import {useContext} from 'react';
import {LanguageContext} from '../context.languages/LanguageContext';
import {AuthContext} from '../context/AuthContext';
export default function HomePage() {
  //auth
  const {isLoggedIn, user} = useContext(AuthContext);
  //LanguageContext
  const {t} = useContext(LanguageContext);
  //...............
  return (
    <>
      <div>
        {isLoggedIn ? (
          <>
            <h2>Welcome {user.name}!</h2>
            <p>
          You are logged in! Go to <Link to="/profile">Profile</Link>
        </p>
          </>
        ) : (
          <>
            <h2>Welcome to Language Quiz 🎉</h2>

            <p style={{padding: '1rem'}}>
              {t.by_default}{' '}
              <Link to={'/settranslation'}>{t.navbar.set_translation}</Link>
            </p>
            <Link to={'/trytoplay'}>
              <button>{t.try_to_play}</button>
            </Link>
          </>
        )}
      </div>
    </>
  );
}
