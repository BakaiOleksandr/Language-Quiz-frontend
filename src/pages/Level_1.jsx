import {Link, useNavigate} from 'react-router-dom';
import {AuthContext} from '../context/AuthContext';
import {useContext, useEffect, useState} from 'react';
import getData from '../functions/api.functions';
const VITE_API_URL = import.meta.env.VITE_API_URL;
import {LanguageContext} from '../context.languages/LanguageContext';
import Spinner from '../components/Spinner';
import {postData} from '../functions/api.functions';

///////////////////////////////
export default function Level_1() {
  //AUTHCONTEXT
  const {user, isLoading, isLoggedIn, handleUnauthorized} =
    useContext(AuthContext);
  //LANGUAGECONTEXT
  const {t} = useContext(LanguageContext);
  //LEVEL STATE
  const [level, setLevel] = useState(null);
  //LOADING STATE
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  //USE EFFECT
  //get info about LEVEL 1
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login', {replace: true});
      return;
    }

    const token = localStorage.getItem('authToken');
    if (!token) {
      handleUnauthorized();
      return;
    }
    getData(`${VITE_API_URL}/game/level1/update`, token, handleUnauthorized)
      .then((data) => setLevel(data))
      .catch((err) => console.error(err))
      .finally(() => setTimeout(() => setLoading(false), 1000));
  }, [isLoggedIn, isLoading, user, navigate, handleUnauthorized]);
  //...................
 
  //
  if (isLoading || loading) return <Spinner />;
  return (
    <>
      
      

      {level  && (
        <div className='level'>
          <div className='level-header'>{t.profile.level_1} {level.level}</div>
          <div>{t.total_plays}{level.total_plays}</div>
          {level.total_plays>0&&<div>Previous score: {level.total_score}%</div>}
          <div>{t.previousMistakes}{ level.total_mistakes}</div>
          <div>{t.averageScore}{level.average_score}%</div>
          <div>{t.difficulty} {level.difficulty}</div>
           <Link className='start-level-btn' to={'/game'}>
          <button>{t.start}</button>
        </Link>
        </div>
        
      )}
      <div
        style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}
      >
       
        <button
          className="back-btn"
          style={{marginTop: '60%'}}
          onClick={() => navigate(-1)}
        >
          {t.back}
        </button>
      </div>
    </>
  );
}
