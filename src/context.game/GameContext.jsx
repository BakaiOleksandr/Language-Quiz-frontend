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

  //Total Game Plays
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) return;

    const loadStats = async () => {
      try {
        const statsData = await getData(`${VITE_API_URL}/game/level1`, token);
        //total_plays
        if (statsData?.total_plays != null) {
          setTotalGamePlays(statsData.total_plays); //set from database
        } else {
          setTotalGamePlays(0); //for new user
        }
        //............
      } catch (err) {
        console.log('Error loading stats:', err.message);
        setTotalGamePlays(0);
      }
    };

    loadStats();
  }, []);
  //UPDATE LEVEL 1 total plays
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) return;
    if (totalGamePlays === 0) return;
    //post stats
    const updateLevel1 = async () => {
      try {
        await postData(
          `${VITE_API_URL}/game/level1`,
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

  //RETURN............................................
  return (
    <GameContext.Provider value={{setTotalGamePlays, setTotalGameMistakes}}>
      {children}
    </GameContext.Provider>
  );
}
