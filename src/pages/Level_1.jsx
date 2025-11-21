import {Link} from 'react-router-dom';
import {AuthContext} from '../context/AuthContext';
import {useContext, useEffect, useState} from 'react';
import getData from '../functions/api.functions';
const VITE_API_URL = import.meta.env.VITE_API_URL;

export default function Level_1() {
  const {user, isLoading, isLoggedIn} = useContext(AuthContext);
  const [level, setLevel] = useState(null);

  //get info about LEVEL 1
  useEffect(() => {
    if (!isLoggedIn) return;
    if (isLoading) return <div>Loading...</div>;
    const token = localStorage.getItem('authToken');

    getData(`${VITE_API_URL}/game/level1`, token)
      .then((data) => setLevel(data))
      .catch((err) => console.error(err));
  }, [user]);
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
