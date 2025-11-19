import React, {useState, useEffect} from 'react';
const VITE_API_URL = import.meta.env.VITE_API_URL;
const AuthContext = React.createContext();
import getData from '../functions/api.functions';
import {useNavigate} from 'react-router-dom';
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
    const storedToken = localStorage.getItem('authToken');
    // If the token exists in the localStorage
    if (storedToken) {
      // We must send the JWT token in the request's "Authorization" Headers
      try {
        await getData(`${VITE_API_URL}/auth/verify`, storedToken,true).then(
          (res) => {
            const userData = res.user || res;
            setIsLoggedIn(true);
            setIsLoading(false);
            setUser(userData);
          }
        );
      } catch (error) {
        setIsLoggedIn(false);
        setIsLoading(false);
        setUser(null);
      }
    } else {
      // If the token is not available (or is removed)
      setIsLoggedIn(false);
      setIsLoading(false);
      setUser(null);
    }
  };

  const logOutUser = () => {
    removeToken();
    setIsLoggedIn(false);
    setUser(null);
    setIsLoading(false);
  };
  useEffect(() => {
    authenticateUser();
  }, []);
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        user,
        storeToken,
        authenticateUser,
        logOutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export {AuthProviderWrapper, AuthContext};
