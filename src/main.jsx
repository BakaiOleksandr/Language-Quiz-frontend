import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import {BrowserRouter} from 'react-router-dom';
import {AuthProviderWrapper} from './context/AuthContext.jsx';
import LanguageProvider from './context.languages/LanguageProvider.jsx';
import TranslationProvider from './context.languages/TranslationContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <TranslationProvider>
          <AuthProviderWrapper>
            <App />
          </AuthProviderWrapper>
        </TranslationProvider>
      </LanguageProvider>
    </BrowserRouter>
  </StrictMode>
);
