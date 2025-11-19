import {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../context/AuthContext';
import {LanguageContext} from '../context.languages/LanguageContext';
import {postData} from '../functions/api.functions';
const VITE_API_URL = import.meta.env.VITE_API_URL;
import {Link} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
//COMPONENT
export default function Profile() {
  const navigate = useNavigate();
  const {user, isLoading, isLoggedIn} = useContext(AuthContext);
  const {t} = useContext(LanguageContext);
  const [level_1, setLevel_1] = useState(null);
  const [err, setErr] = useState(null);
  //token get
  //......
  if (isLoading) return <p>Loading...</p>;

  //GAME
  //.....CREATE_LEVEL1
  useEffect(() => {
    if (!isLoggedIn) navigate('/login');
    const token = localStorage.getItem('authToken');
    const createUserDataResults = async () => {
      try {
        const res = await postData(`${VITE_API_URL}/level/1/create`, {}, token);
        setLevel_1(res);
      } catch (err) {
        console.log(err);
        navigate('/login');
      }
    };

    createUserDataResults();
  }, [isLoggedIn, err]);
  return (
    <>
      <div style={{margin: '1rem'}}>
        <div>
          {t.profile.hello}, {user.name}!
        </div>
      </div>
      <div>Your statistic</div>
      <div>Level :{level_1 && level_1.level}</div>
      <div>Let's Play! Choose the level.</div>
      <Link to={'/game'}>
        <button>Start Level 1</button>
      </Link>
      <div>Level 1</div>
    </>
  );
}
