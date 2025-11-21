import {useContext, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {AuthContext} from '../context/AuthContext';
const VITE_API_URL = import.meta.env.VITE_API_URL;
import {postData} from '../functions/api.functions';
import { LanguageContext } from '../context.languages/LanguageContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [errorMessage, setErrorMessage] = useState(undefined);
  const {storeToken, authenticateUser} = useContext(AuthContext);
  //LanguageContext
  const {t} = useContext(LanguageContext);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = async (e) => {
    //............
    e.preventDefault();
    const reqBody = {email, password};
    //
    try {
      await postData(`${VITE_API_URL}/auth/login`, reqBody).then((res) => {
        storeToken(res.authToken);
        authenticateUser();
        console.log(res);
        navigate('/profile');
      });
    } catch (err) {
      console.log({error: err.message});
      alert(`${err.message}`);
      return;
    }
    //..........
  };

  return (
    <div className="login-page">
      <h1>{t.login}</h1>

      <form onSubmit={handleLoginSubmit}>
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

        <button type="submit">{t.confirm}</button>
      </form>
      {/* {errorMessage && <p className="error-message">{errorMessage}</p>} */}

      <p>{t.dont_have_account}</p>
      <Link to={'/signup'}> {t.sign_up}</Link>
    </div>
  );
}
