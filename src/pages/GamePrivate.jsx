import {useEffect, useState, useContext} from 'react';
import getData from '../functions/api.functions';
const VITE_API_URL = import.meta.env.VITE_API_URL;
import {LanguageContext} from '../context.languages/LanguageContext';
import {TranslationContext} from '../context.languages/TranslationContext';
import {useNavigate} from 'react-router-dom';
import Spinner from '../components/Spinner';
import {AuthContext} from '../context/AuthContext';

export default function Game() {
  //AUTHCONTEXT
  const {isLoading} = useContext(AuthContext);

  //useNavigate
  const navigate = useNavigate();

  //LanguageContext
  const {t} = useContext(LanguageContext);
  //...............
  const {fromLang, toLang} = useContext(TranslationContext);
  //............................const
  const [wordsData, setWordsData] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [wrongWordSum, setWrongWordSum] = useState(0);
  const [wrongWord, setWrongWord] = useState(false);
  const [wordsToMemorise, setwordsToMemorise] = useState([]);
  const [show, setShow] = useState(false);
  const [restart, setRestart] = useState(0);
  //...

  //............................
  useEffect(() => {
    const startGame = async () => {
      try {
        //await fetch
        const res = await getData(`${VITE_API_URL}/play_level_1`);
        //settings
        setWordsData(res);
        setCurrentIndex(0);
        setUserInput('');

        //..........
      } catch (err) {
        console.log(err);
      }
    };
    startGame(); //call function START GAME Immidiately
    setwordsToMemorise([]);
    setWrongWordSum(0);
    setShow(false);
  }, [restart]);

  //................
  const submitWord = (e) => {
    e.preventDefault();
    const currentWord = wordsData[currentIndex]; //current one word
    if (!currentWord) return;

    const userAnswer = userInput.trim().toLowerCase();
    const correctAnswer = currentWord[toLang].toLowerCase();
    if (userAnswer === '' || !isNaN(userAnswer)) {
      //if answer is empty string
      alert('Please enter the word');
      setUserInput('');
      return;
    }
    if (userAnswer === correctAnswer) {
      //correct answer
      if (currentIndex + 1 < wordsData.length) {
        setCurrentIndex(currentIndex + 1); //next word

        setUserInput(''); //clear input
        setWrongWord(false); //set false for next 'wrong' word
      } else {
        alert('Game Over!');

        setShow(true);
        //game over
      }
    } else {
      //wrong word
      if (!wrongWord) {
        setWrongWord(true);
        setwordsToMemorise((prev) => [...prev, correctAnswer]);
        console.log(correctAnswer);

        setWrongWordSum((prev) => prev + 1);
      }
      alert('Wrong word');
      setUserInput('');
    }
  };
  //SPINNER
    if (isLoading||!wordsData) return <Spinner />;
  return (
    <>
      {!show && (
        <>
          <h3>
            {t.type_the_translation} {fromLang.toUpperCase()}➜
            {toLang.toUpperCase()}
          </h3>
          <div
            style={{fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem'}}
          >
            {wordsData && wordsData[currentIndex][fromLang]}
          </div>
          <form
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
            onSubmit={submitWord}
          >
            <input
              style={{marginTop: '1rem'}}
              type="text"
              autoComplete="off"
              placeholder=""
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            ></input>
            <button
              style={{width: 'fit-content', marginTop: '2rem'}}
              type="submit"
            >
              {t.confirm}
            </button>
          </form>
          <p>
            {t.words}:{currentIndex + 1}/{wordsData && wordsData.length}
          </p>
          <p>
            {t.wrong_words}
            {wrongWordSum}
          </p>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <button
              style={{width: 'fit-content'}}
              onClick={() => setRestart((prev) => prev + 1)}
            >
              {t.restart_round}
            </button>
            {/* {BACK_BUTTON} */}
            <button
              onClick={() => navigate(-1)}
              style={{width: 'fit-content', marginTop: '2rem'}}
            >
              {t.back}
            </button>
          </div>
        </>
      )}
      {/* { END OF GAME} */}
      {/*Show Words to memorise in THE END OF GAME */}
      {show && (
        <>
          <h2>
            {wordsToMemorise.length === 0 ? (
              <>
                {t.well_done}
                <br></br>
                {t.all_answers_correct}
              </>
            ) : (
              'Words to memorise:'
            )}
          </h2>
          <div style={{fontSize: '2rem'}}>
            {wordsToMemorise.map((el, index) => (
              <p key={index}>{el}</p>
            ))}
          </div>

          <button
            style={{backgroundColor: 'lightskyblue'}}
            onClick={() => navigate(-1)}
          >
            {t.back}
          </button>
        </>
      )}
    </>
  );
}
