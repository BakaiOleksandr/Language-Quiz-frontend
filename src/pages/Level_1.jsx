import {Link, useNavigate} from 'react-router-dom';
import {AuthContext} from '../context/AuthContext';
import {useContext, useEffect, useState} from 'react';
import getData from '../functions/api.functions';
const VITE_API_URL = import.meta.env.VITE_API_URL;
///////////////////////////////
export default function Level_1() {
  const {user, isLoading, isLoggedIn, handleUnauthorized} =
    useContext(AuthContext);
  const [level, setLevel] = useState(null);
  const navigate = useNavigate();
  //get info about LEVEL 1
  useEffect(() => {
    if (isLoading) return; // ждем завершения проверки токена
    if (!isLoggedIn) {
      navigate('/login', {replace: true});
      return;
    }

    const token = localStorage.getItem('authToken');
    if (!token) {
      handleUnauthorized();
      return;
    }

    getData(`${VITE_API_URL}/game/level1`, token, handleUnauthorized)
      .then((data) => setLevel(data))
      .catch((err) => console.error(err));
  }, [isLoggedIn, isLoading, user, navigate, handleUnauthorized]);
  //...................
  return (
    <>
      <h1>Level 1</h1>
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

      <Link to={'/game'}>
        <button>Start Level 1</button>
      </Link>
    </>
  );
}
