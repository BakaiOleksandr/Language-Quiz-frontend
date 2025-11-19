import {Routes, Route} from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import PublicPages from './components/PublicPages';
import Profile from './pages/Profile';
import PrivatePages from './components/PrivatePages';
import TryToPlay from './pages/TryToPlay';
import SetTranslation from './pages/SetTranslation';
import GamePrivate from './pages/GamePrivate';
function App() {
  return (
    <>
      <Navbar />
      {/*Routes*/}
      <Routes>
        {/* {HomePage} */}
        <Route
          path="/"
          element={
            <PublicPages>
              <HomePage />
            </PublicPages>
          }
        ></Route>
        {/* {TryToPlay} */}
        <Route
          path="/trytoplay"
          element={
            <PublicPages>
              <TryToPlay />
            </PublicPages>
          }
        ></Route>
        {/* {AuthPages} */}
        <Route
          path="/signup"
          element={
            <PublicPages>
              <SignupPage />
            </PublicPages>
          }
        ></Route>
        <Route
          path="/login"
          element={
            <PublicPages>
              <LoginPage />
            </PublicPages>
          }
        ></Route>
        {/* {PrivatePages} */}
        <Route
          path="/profile"
          element={
            <PrivatePages>
              <Profile></Profile>
            </PrivatePages>
          }
        ></Route>
        <Route path="/settranslation" element={<SetTranslation />}></Route>
        <Route
          path="/game"
          element={
            <PrivatePages>
              <GamePrivate />
            </PrivatePages>
          }
        ></Route>
      </Routes>
    </>
  );
}

export default App;
