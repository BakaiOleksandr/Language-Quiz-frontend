import {useContext, useEffect, useState, useRef} from 'react';
import {LanguageContext} from '../context.languages/LanguageContext';

export default function LanguageSelector() {
  const {language, changeLanguage} = useContext(LanguageContext);
  const [open, setOpen] = useState(false);
  const dropRef = useRef(null);
  const toggleOpen = () => setOpen(!open);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropRef.current && !dropRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="change-language-btn" ref={dropRef} onClick={toggleOpen}>
      <div className='btn-container'><p>🌐</p><div>{language.toUpperCase()}</div></div>
      {open && (
        <div className="dropdown-menu">
          <div onClick={() => changeLanguage('nl')}>Nl</div>
          <div onClick={() => changeLanguage('en')}>En</div>
          <div onClick={() => changeLanguage('es')}>Es</div>
          <div onClick={() => changeLanguage('fr')}>Fr</div>
          <div onClick={() => changeLanguage('ru')}>Ru</div>
          <div onClick={() => changeLanguage('ua')}>Ua</div>
        </div>
      )}
    </div>
  );
}
