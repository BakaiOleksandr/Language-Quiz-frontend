import {Link} from 'react-router-dom';
import {useContext} from 'react';
import {LanguageContext} from '../context.languages/LanguageContext';
import {AuthContext} from '../context/AuthContext';
import Spinner from '../components/Spinner';
import {ErrorConnectionContext} from '../context/ErrorConnectionProvider';
const VITE_API_URL = import.meta.env.VITE_API_URL;
import {useEffect} from 'react';

//............................
export default function HomePage() {
  //ERROR CONTEXT
  const {hasError, errorMessage, setError} = useContext(ErrorConnectionContext);
  //auth
  const {isLoggedIn, user, isLoading} = useContext(AuthContext);
  //LanguageContext
  const {t} = useContext(LanguageContext);

  //ERROR
  useEffect(() => {
    fetch(`${VITE_API_URL}`)
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .catch((err) => {
        console.error(err);
        setError('Cannot connect to server');
      });
  }, []);
  //ERROR
  if (hasError) {
    return (
      <>
        <h1>404</h1>
        <p>{errorMessage || 'Cannot connect to server'}</p>
      </>
    );
  }

  //...............
  //SPINNER
  if (isLoading) return <Spinner />;
  return (
    <div className='home'>
      <div >
        {isLoggedIn ? (
          <>
            <h2 style={{margin:'0',color:'white'}}>{t.profile.hello}, {user.name}!</h2>
            <p>
              {t.to_go_to_profile}<br></br><Link to="/profile"><button>{t.profile.profile}</button></Link>
            </p>
          </>
        ) : (
          <>
            <h2 style={{margin:'0',color:'white'}}>Welcome to Language Quiz</h2>
            <p>Here you can learn the words in different languages by typing them.</p>

            <p>
              {t.by_default}{' '}
              <Link to={'/settranslation'}><span className='home-span'>{t.navbar.set_translation}</span></Link>
            </p>
            <Link to={'/trytoplay'}>
              <button className='home-try-to-play'>{t.try_to_play}</button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
