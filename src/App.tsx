import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import './App.scss';

import { Header } from './components/Header/Header';
import { Homepage } from './pages/Homepage/Homepage';
import { GamesList } from './pages/GamesList/GamesList';
import { PlansAndDelivery } from './pages/PlansAndDelivery/PlansAndDelivery';
import { Agreement } from './pages/Agreement/Agreement';
import { AboutPS5 } from './pages/AboutPS5/AboutPS5';
import { PageNotFound } from './pages/NotFoundPage/NotFoundPage';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { Footer } from './components/Footer/Footer';

export const App: React.FC = () => {

  return (
    <>
      <Header />

      <Routes>
        <Route path="home" element={<Homepage />} />
        <Route path="/" element={<Navigate to="home" />} />
        <Route path="games" element={<GamesList />} />
        <Route path="plans" element={<PlansAndDelivery />} />
        <Route path="agreement" element={<Agreement />} />
        <Route path="about-ps5" element={<AboutPS5 />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>

      <Footer />
    </>  
  );
}
