import {createContext, useEffect, useState} from 'react';
export const TranslationContext = createContext();

export default function TranslationProvider({children}) {
  const [fromLang, setFromLang] = useState(
    localStorage.getItem('gameFromLang') || 'en'
  );
  const [toLang, setToLang] = useState(
    localStorage.getItem('gameToLang') || 'nl'
  );
  //SAVE CHoise to LocalStorage
  useEffect(() => {
    localStorage.setItem('gameFromLang', fromLang);
    localStorage.setItem('gameToLang', toLang);
  }, [fromLang, toLang]);
  return (
    <TranslationContext.Provider
      value={{fromLang, toLang, setFromLang, setToLang}}
    >
      {children}
    </TranslationContext.Provider>
  );
}
