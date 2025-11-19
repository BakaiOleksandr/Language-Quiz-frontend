import {useState,useContext} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {postData} from '../functions/api.functions';
const VITE_API_URL = import.meta.env.VITE_API_URL;
import { LanguageContext } from '../context.languages/LanguageContext';

export default function SignupPage() {
  //LanguageContext
    const {t} = useContext(LanguageContext);
  //................................
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    const requestBody = {name, email, password};
    try {
      await postData(`${VITE_API_URL}/auth/signup`, requestBody);

      navigate('/login');
    } catch (err) {
      console.log({error: err.message});
      alert(`${err.message}`);
      return;
    }
  };

  return (
    <div className="sign-up-page">
      <h1>{t.sign_up}</h1>

      <form onSubmit={handleSignupSubmit}>
        <label>Email:</label>
        <input
          autoComplete="off"
          type="email"
          name="email"
          value={email}
          onChange={handleEmail}
        />

        <label>{t.password}</label>
        <input
          autoComplete="off"
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
        />

        <label>{t.name}</label>
        <input
          autoComplete="off"
          type="text"
          name="name"
          value={name}
          maxLength={30}
          onChange={handleName}
        />

        <button type="submit">{t.confirm}</button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p>{t.already_have_account}</p>
      <Link to={'/login'}> {t.login}</Link>
    </div>
  );
}
