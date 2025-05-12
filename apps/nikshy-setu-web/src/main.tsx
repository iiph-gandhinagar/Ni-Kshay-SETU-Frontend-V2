import { CookiesProvider } from 'react-cookie';
import CookieConsent from 'react-cookie-consent';
import * as ReactDOM from 'react-dom/client';
import 'react-responsive-modal/styles.css';
import { BrowserRouter } from 'react-router-dom';
import 'regenerator-runtime/runtime';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import App from './app/app';
import './styles/fonts.css';

const rootElement = document.getElementById('root');

if (rootElement?.hasChildNodes()) {
  ReactDOM.hydrateRoot(
    rootElement,
    <BrowserRouter>
      <main className='font-family-maison'>
        <CookiesProvider defaultSetOptions={{ path: '/' }}>
          <App />
        </CookiesProvider>
        <CookieConsent
          location='bottom'
          buttonText='i understand'
          cookieName='cookies-consent'
          style={{ background: '#2B373B' }}
          buttonStyle={{ color: '#4e503b', fontSize: '13px' }}
          expires={150}
        >
          This website uses cookies to enhance the user experience.
        </CookieConsent>
      </main>
    </BrowserRouter>
  );
} else {
  ReactDOM.createRoot(rootElement).render(
    <BrowserRouter>
      <main className='font-family-maison'>
        <CookiesProvider defaultSetOptions={{ path: '/' }}>
          <App />
        </CookiesProvider>
        <CookieConsent
          location='bottom'
          buttonText='i understand'
          cookieName='cookies-consent'
          style={{ background: '#2B373B' }}
          buttonStyle={{ color: '#4e503b', fontSize: '13px' }}
          expires={150}
        >
          This website uses cookies to enhance the user experience.
        </CookieConsent>
      </main>
    </BrowserRouter>
  );
}
