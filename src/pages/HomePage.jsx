import {Link} from 'react-router-dom';
import {useContext} from 'react';
import {LanguageContext} from '../context.languages/LanguageContext';

export default function HomePage() {
  //LanguageContext
  const {t} = useContext(LanguageContext);
  //...............
  return (
    <>
      <p style={{padding: '1rem'}}>
        {t.by_default}{' '}
        <Link to={'/settranslation'}>{t.navbar.set_translation}</Link>
      </p>
      <p></p>
      <Link to={'/trytoplay'}>
        <button>{t.try_to_play}</button>
      </Link>
    </>
  );
}
