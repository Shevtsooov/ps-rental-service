import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import './styles/normilize.scss'
import { store } from './Redux/store';
import { Provider } from 'react-redux';
import { CookiesProvider } from "react-cookie";
import GA4React from "ga-4-react";


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

try {
  setTimeout((_: any) => {
    const ga4react = new GA4React("G-CNN8VPH0WD");
    ga4react.initialize().catch(err => console.error(err));
  }, 2000);
} catch (err) {
      console.error(err);
}
