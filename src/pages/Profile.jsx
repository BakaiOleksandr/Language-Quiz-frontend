import {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../context/AuthContext';
import {LanguageContext} from '../context.languages/LanguageContext';
import {Link} from 'react-router-dom';
import getData from '../functions/api.functions';
import {useNavigate} from 'react-router-dom';
const VITE_API_URL = import.meta.env.VITE_API_URL;
import {Navigate} from 'react-router-dom';
/////////////////////////////////////////////
export default function Profile() {
  const {user, isLoading, isLoggedIn, handleUnauthorized} =
    useContext(AuthContext);
  const {t} = useContext(LanguageContext);
  const navigate = useNavigate();
  const [level, setLevel] = useState(null);
  //get info about LEVEL 1
  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }

    const token = localStorage.getItem('authToken');

    getData(`${VITE_API_URL}/game/level1`, token, handleUnauthorized)
      .then((data) => setLevel(data))
      .catch((err) => {
        console.log(err);
      });
    if (!token) {
      handleUnauthorized();
      return;
    }
    if (!isLoggedIn) {
      navigate('/login', {replace: true});
      return;
    }
  }, [isLoggedIn, isLoading, navigate, handleUnauthorized]);

  //........

  if (isLoading) return <p>Loading...</p>;

  if (!isLoggedIn || !user) {
    return <Navigate to="/login" replace />;
  }

  //...................

  return (
    <>
      <div style={{margin: '1rem'}}>
        <div>
          {t.profile.hello}, {user.name}!
        </div>
      </div>
      <Link to="/level1">
        <button>Level 1</button>
      </Link>
      <div>Your statistic</div>

      {level ? (
        <>
          <div>Level: {level.level}</div>
          <div>Total plays: {level.total_plays}</div>
          <div>Total score: {level.total_score}</div>
          <div>Mistakes: {level.total_mistakes}</div>
          <div>Difficulty: {level.difficulty}</div>
        </>
      ) : (
        <p>Loading level...</p>
      )}

      <div>Let's Play! Choose the level.</div>
    </>
  );
}
