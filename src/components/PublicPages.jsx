import {useContext} from 'react';
import {AuthContext} from '../context/AuthContext';
import {Navigate} from 'react-router-dom';
import Spinner from './Spinner';

export default function PublicPages({children}) {
  const {isLoggedIn, isLoading} = useContext(AuthContext);

  // If the authentication is still loading ⏳
  if (isLoading) return <Spinner />;

  if (isLoggedIn) {
    // If the user is logged in, navigate to the home page ❌
    return <Navigate to="/profile" />;
  } else {
    // If the user is not logged in, allow to see the page ✅
    return children;
  }
}
