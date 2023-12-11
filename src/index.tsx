import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import './styles/normilize.scss'
import { store } from './Redux/store';
import { Provider } from 'react-redux';
import { CookiesProvider } from "react-cookie";
// import ReactGA from 'react-ga4';

// ReactGA.initialize('G-CNN8VPH0WD');

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <Provider store={store}>
      <BrowserRouter>
        <React.StrictMode>
          <CookiesProvider>
            <App />
          </CookiesProvider>
        </React.StrictMode>
      </BrowserRouter>
    </Provider>
  );
}
