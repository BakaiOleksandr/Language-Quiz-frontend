import {useContext} from 'react';
import {LanguageContext} from '../context.languages/LanguageContext';
import {TranslationContext} from '../context.languages/TranslationContext';
import {useNavigate} from 'react-router-dom';

export default function SetTranslation() {
  //LanguageContext
  const {t} = useContext(LanguageContext);
  //...............
  //TranslationContext
  const {fromLang, setFromLang} = useContext(TranslationContext);
  const {toLang, setToLang} = useContext(TranslationContext);
  //.............
  //navigate
  const navigate = useNavigate();
  //.............

  const languages = ['en', 'nl', 'fr', 'es', 'ru', 'ua'];

  const handleFromChange = (value) => {
    if (value === toLang) {
      const otherLang = languages.find((l) => l !== value);
      setFromLang(value);
      setToLang(otherLang);
    } else {
      setFromLang(value);
    }
  };

  const handleToChange = (value) => {
    if (value === fromLang) {
      const otherLang = languages.find((l) => l !== value);
      setToLang(value);
      setFromLang(otherLang);
    } else {
      setToLang(value);
    }
  };

  return (
    <div
      style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}
    >
      <h2>{t.navbar.set_translation}</h2>
      <form className="set-translation-form">
        <label>
          {t.from}:{' '}
          <select
            value={fromLang}
            onChange={(e) => handleFromChange(e.target.value)}
          >
            <option value="en">English</option>
            <option value="nl">Dutch</option>
            <option value="fr">French</option>
            <option value="es">Spanish</option>
            <option value="ru">Russian</option>
            <option value="ua">Ukrainian</option>
          </select>
        </label>

        <label>
          {t.to}:{' '}
          <select
            value={toLang}
            onChange={(e) => handleToChange(e.target.value)}
          >
            <option value="en">English</option>
            <option value="nl">Dutch</option>
            <option value="fr">French</option>
            <option value="es">Spanish</option>
            <option value="ru">Russian</option>
            <option value="ua">Ukrainian</option>
          </select>
        </label>
      </form>
      <button
        style={{width: 'fit-content', marginTop: '2rem'}}
        onClick={() => navigate(-1)}
      >
        {t.back}
      </button>
    </div>
  );
}
