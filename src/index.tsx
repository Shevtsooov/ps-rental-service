import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import './styles/normilize.scss'
import { store } from './Redux/store';
import { Provider } from 'react-redux';
import { CookiesProvider } from "react-cookie";
import ReactGA from 'react-ga4';


const rootElement = document.getElementById('root');

//Initialize GA4
ReactGA.initialize("G-CNN8VPH0WD");

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

const SendAnalytics = ()=> {
  ReactGA.send({
    hitType: "pageview",
    page: window.location.pathname,
  });
};
SendAnalytics();
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(SendAnalytics);
