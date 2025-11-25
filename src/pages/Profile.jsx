import {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../context/AuthContext';
import {LanguageContext} from '../context.languages/LanguageContext';
import {Link} from 'react-router-dom';
import getData from '../functions/api.functions';
const VITE_API_URL = import.meta.env.VITE_API_URL;
import {Navigate} from 'react-router-dom';
import Spinner from '../components/Spinner';

/////////////////////////////////////////////
export default function Profile() {
  const {user, isLoading, isLoggedIn, handleUnauthorized} =
    useContext(AuthContext);
  const {t} = useContext(LanguageContext);
  const [level1, setLevel1] = useState(null);
  //LOADING STATE
  const [loading, setLoading] = useState(true);

  //get info about LEVEL 1
  useEffect(() => {
    if (isLoading) return;

    if (!isLoggedIn) return;

    const token = localStorage.getItem('authToken');

    //no token - log out
    if (!token) {
      handleUnauthorized();
      return;
    }

    let timeout;

    getData(`${VITE_API_URL}/game/level1/update`, token, handleUnauthorized)
      .then((data) => setLevel1(data))
      .catch((err) => console.log(err))
      .finally(() => {
        timeout = setTimeout(() => setLoading(false), 500);
      });

    return () => clearTimeout(timeout);
  }, [isLoggedIn, isLoading, handleUnauthorized]);

  //........

  if (isLoading || loading) return <Spinner />;

  if (!isLoggedIn || !user) {
    return <Navigate to="/login" replace />;
  }
  //...................

  return (
    <>
      <div style={{margin: '0.5rem'}}>
        <h2>
          {t.profile.hello}, {user.name}!
        </h2>
      </div>
      <Link to="/level1">
        <button>Play</button>
      </Link>

      {level1 && (
        <>
          <div>Level: {level1.level}</div>
          <div>Total plays: {level1.total_plays}</div>
          {level1.total_plays>0&&<div>Previous score: {level1.total_score}%</div>}
          <div>Previous Mistakes: { level1.total_mistakes}</div>
          <div>Average score of all games: {level1.average_score}%</div>
          <div>Difficulty: {level1.difficulty}</div>
        </>
      )}

      <div>Let's Play! Choose the level.</div>
    </>
  );
}
