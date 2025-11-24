import React, {useState, useEffect} from 'react';
const VITE_API_URL = import.meta.env.VITE_API_URL;
const AuthContext = React.createContext();
import getData from '../functions/api.functions';
import {useNavigate} from 'react-router-dom';
import Spinner from '../components/Spinner';
//Auth Provider Wrapper

function AuthProviderWrapper({children}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  //....................TOKEN
  const storeToken = (token) => {
    localStorage.setItem('authToken', token);
  };
  //remove token
  const removeToken = () => {
    localStorage.removeItem('authToken');
  };
  //.........................
  //AuthUser
  const authenticateUser = async () => {
    setIsLoading(true);
    const storedToken = localStorage.getItem('authToken');
    // If the token exists in the localStorage

    if (!storedToken) {
      setIsLoggedIn(false);
      setUser(null);
      setIsLoading(false);
      navigate('/');
      return;
    }

    try {
      const res = await getData(
        `${VITE_API_URL}/auth/verify`,
        storedToken,
        true
      );
      const userData = res.user || res;

      setIsLoggedIn(true);
      setUser(userData);
      setIsLoading(false);
    } catch (err) {
      logOutUser();
    }
  };

  const logOutUser = () => {
    removeToken();
    setIsLoggedIn(false);
    setUser(null);
    setIsLoading(false);
    navigate('/', {replace: true});
  };
  const handleUnauthorized = () => logOutUser();

  useEffect(() => {
    authenticateUser();
  }, []);
  //SPINNER
  {
    isLoading ? <Spinner /> : children;
  }
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        user,
        storeToken,
        authenticateUser,
        logOutUser,
        handleUnauthorized,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export {AuthProviderWrapper, AuthContext};
