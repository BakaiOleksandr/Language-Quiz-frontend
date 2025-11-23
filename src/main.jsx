import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import {BrowserRouter} from 'react-router-dom';
import {AuthProviderWrapper} from './context/AuthContext.jsx';
import LanguageProvider from './context.languages/LanguageProvider.jsx';
import TranslationProvider from './context.languages/TranslationContext.jsx';
import {ErrorConnectionProvider} from './context/ErrorConnectionProvider.jsx';
import GameProvider from './context.game/GameContext.jsx';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ErrorConnectionProvider>
        <LanguageProvider>
          <TranslationProvider>
            <AuthProviderWrapper>
              <GameProvider>
                <App />
              </GameProvider>
            </AuthProviderWrapper>
          </TranslationProvider>
        </LanguageProvider>
      </ErrorConnectionProvider>
    </BrowserRouter>
  </StrictMode>
);
