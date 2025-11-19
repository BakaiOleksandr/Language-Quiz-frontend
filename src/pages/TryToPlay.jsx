import {useState, useContext} from 'react';
import {Link} from 'react-router-dom';
import GamePublic from '../pages/GamePublic';
import {LanguageContext} from '../context.languages/LanguageContext';

export default function TryToPlay() {
  const [gameStarted, setGameStarted] = useState(false);

  //LanguageContext
  const {t} = useContext(LanguageContext);
  //...............
  return (
    <>
      {!gameStarted && (
        <>
          <p
            style={{
              backgroundColor: 'lightpink',
              padding: '1rem',
              margin: '1rem',
              borderRadius: '1rem',
            }}
          >
            {t.full_version_info} <Link to="/signup">{t.sign_up}.</Link>
          </p>
          <button onClick={() => setGameStarted(true)}>
            {t.play_demo_version}
          </button>
        </>
      )}
      {gameStarted && (
        <>
          <GamePublic />
        </>
      )}
    </>
  );
}
