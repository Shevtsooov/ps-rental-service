import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation, useParams } from 'react-router-dom';

import './App.scss';

import { Header } from './components/Header/Header';
import { Homepage } from './pages/Homepage/Homepage';
import { GamesListPage } from './pages/GamesListPage/GamesListPage';
import { PlansAndDelivery } from './pages/PlansAndDelivery/PlansAndDelivery';
import { Agreement } from './pages/Agreement/Agreement';
import { AboutPS5 } from './pages/AboutPS5/AboutPS5';
import { PageNotFound } from './pages/NotFoundPage/NotFoundPage';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { Footer } from './components/Footer/Footer';
import { SavedGames } from './pages/SavedGames/SavedGames';
import { ShoppingCart } from './pages/ShoppingCart/ShoppingCart';
import { GamePage } from './pages/GamePage/GamePage';
import { ShoppingBuble } from './components/ShoppingBuble/ShoppingBuble';
import { useAppSelector } from './Redux/store';

export const App: React.FC = () => {
  const shoppingCartGames = useAppSelector(state => state.shoppingCartGames.value);
  const location = useLocation();
  
  const showCartBuble = location.pathname !== '/shopping-cart'
  && shoppingCartGames.length > 0;

  console.log(location.pathname !== '/shopping-cart');

  return (
    <>
      <Header />

      {showCartBuble && <ShoppingBuble />}

      <Routes>
        <Route path="home" element={<Homepage />} />
        <Route path="/" element={<Navigate to="home" />} />
        <Route path="games" element={<GamesListPage />} />
        <Route path="games/:gameIdLink" element={<GamePage />} />
        <Route path="plans" element={<PlansAndDelivery />} />
        <Route path="agreement" element={<Agreement />} />
        <Route path="about-ps5" element={<AboutPS5 />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="saved-games" element={<SavedGames />} />
        <Route path="shopping-cart" element={<ShoppingCart />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>

      <Footer />
    </>  
  );
}
