import {createContext, useState} from 'react';
export const TranslationContext = createContext();

export default function TranslationProvider({children}) {
  const [fromLang, setFromLang] = useState('en');
  const [toLang, setToLang] = useState('nl');
  return (
    <TranslationContext.Provider
      value={{fromLang, toLang, setFromLang, setToLang}}
    >
      {children}
    </TranslationContext.Provider>
  );
}
