import {createContext, useEffect, useState} from 'react';
import getData from '../functions/api.functions';
import {postData} from '../functions/api.functions';
const VITE_API_URL = import.meta.env.VITE_API_URL;
export const GameContext = createContext(); //GAME CONTEXT

//GAME PROVIDER
export default function GameProvider({children}) {
  //FOR LEVEL 1
  //CONST UPDATED STATS
  //total_plays
  const [totalGamePlays, setTotalGamePlays] = useState(0);
  //total_mistakes
  const [totalGameMistakes, setTotalGameMistakes] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  //Total Game Plays GET FROM DATABASE
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) return;

    const loadStats = async () => {
      try {
        const statsData = await getData(
          `${VITE_API_URL}/game/level1/update`,
          token
        );
        //total_plays
        if (statsData?.total_plays != null) {
          setTotalGamePlays(statsData.total_plays); //set from database
        } else {
          setTotalGamePlays(0); //for new user
        }
        //............
      } catch (err) {
        console.log('Error loading stats:', err.message);
      }
    };

    loadStats();
  }, []);
  //SEND TO DATABASE total plays
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) return;
    if (totalGamePlays === 0) return;
    //post stats
    const updateLevel1 = async () => {
      try {
        await postData(
          `${VITE_API_URL}/game/level1/totalplays`,
          {
            total_plays: totalGamePlays,
          },
          token
        );
      } catch (err) {
        console.log(err);
      }
    };
    updateLevel1();
  }, [totalGamePlays]);
  //Total game mistakes POST
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) return;
    if (!isLoaded) return;
    const mistakesDataPost = async () => {
      try {
        await postData(
          `${VITE_API_URL}/game/level1/mistakes`,
          {total_mistakes: totalGameMistakes},
          token
        );
      } catch (err) {
        console.log('mistakes DATA ERROR');
      }
    };
    mistakesDataPost();
  }, [totalGameMistakes, isLoaded]);

  //Mistakes GET FROM DATABASE ON RELOAD
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) return;
    const getMistakesData = async () => {
      //try
      try {
        const getMistakesResponse = await getData(
          `${VITE_API_URL}/game/level1/update`,
          token
        );
        setTotalGameMistakes(getMistakesResponse.total_mistakes);
        setIsLoaded(true);
      } catch (err) {
        console.log(err);
      }
      //
    };
    getMistakesData();
  }, []);
  //SEND total_score
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) return;
    if (totalScore === 0) return;
    const totalGameScoreData = async () => {
      await postData(
        `${VITE_API_URL}/game/level1/totalscore`,
        {
          total_score: totalScore,
        },
        token
      );
    };
    totalGameScoreData();
  }, [totalScore]);
  //GET total_score from database
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) return;
    const getScoreData = async () => {
      const totalScoreData = await getData(
        `${VITE_API_URL}/game/level1/update`,
        token
      );
      setTotalScore(totalScoreData.total_score);
    };
    getScoreData();
  }, []);

  //RETURN............................................
  return (
    <GameContext.Provider
      value={{
        setTotalGamePlays,
        setTotalGameMistakes,
        totalGameMistakes,
        setTotalScore,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}
