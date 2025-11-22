import {createContext, useState} from 'react';
export const ErrorConnectionContext = createContext();

export function ErrorConnectionProvider({children}) {
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  //...............................
  const setError = (msg) => {
    setHasError(true);
    setErrorMessage(msg);
  };
  const clearError = () => {
    setHasError(false);
    setErrorMessage('');
  };

  return (
    <ErrorConnectionContext.Provider
      value={{hasError, errorMessage, setError, clearError}}
    >
      {children}
    </ErrorConnectionContext.Provider>
  );
}
