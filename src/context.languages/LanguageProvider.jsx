import {useState} from 'react';
import {LanguageContext} from './LanguageContext';
import en from '../lnterface.languages/en.json';
import es from '../lnterface.languages/es.json';
import fr from '../lnterface.languages/fr.json';
import nl from '../lnterface.languages/nl.json';
import ru from '../lnterface.languages/ru.json';
import ua from '../lnterface.languages/ua.json';
const translations = {en, es, fr, nl, ru, ua};
export default function LanguageProvider({children}) {
  const [language, setLanguage] = useState(
    localStorage.getItem('lang') || 'en'
  );
  const t = translations[language] || translations['en'];
  //................
  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('lang', lang);
  };

  return (
    <LanguageContext.Provider value={{language, changeLanguage, t}}>
      {children}
    </LanguageContext.Provider>
  );
}
