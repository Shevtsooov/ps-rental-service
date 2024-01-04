import React from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import './App.scss';

import { Header } from './components/Header/Header';
import { Homepage } from './pages/Homepage/Homepage';
import { GamesListPage } from './pages/GamesListPage/GamesListPage';
import { PlansAndDelivery } from './pages/PlansAndDelivery/PlansAndDelivery';
import { Agreement } from './pages/Agreement/Agreement';
import { Footer } from './components/Footer/Footer';
import { GamePage } from './pages/GamePage/GamePage';
import { Contacts } from './pages/Contacts/Contacts';
import { PageNotFound } from './pages/PageNotFound/PageNotFound';

export const App: React.FC = () => {

  return (
    <div className='appBlock'>
      <Header  />

      <div className='App'>

        <Routes>
          <Route path="home" element={<Homepage />} />
          <Route path="/" element={<Navigate to="home" />} />
          <Route path="games" element={<GamesListPage />} />
          <Route path="games/:gameIdLink" element={<GamePage />} />
          <Route path="pricing-and-delivery" element={<PlansAndDelivery />} />
          <Route path="agreement" element={<Agreement />} />
          <Route path="contacts" element={<Contacts />} />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>

      <Footer />
    </div>  
  );
};
