import React, { useEffect, useRef, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

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
import { ShoppingCartBubble } from './components/ShoppingCartBubble/ShoppingCartBubble';
import { useAppDispatch, useAppSelector } from './Redux/store';
import { useInViewport } from './helpers/useInViewport';
import { AccountActivationPage } from './pages/AccountActivationPage/AccountActivationPage';
import { setUser } from './Redux/Slices/first.slice';

export const App: React.FC = () => {
  const shoppingCartGames = useAppSelector(state => state.shoppingCartGames.value);
  const location = useLocation();

  // THIS CODE SETS isVisible = true WHEN REF IS IN THE VIEWPORT
  const headerRef = useRef<HTMLDivElement | null>(null);
  const [isVisible] = useInViewport(headerRef);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const parsedUser = storedUser ? JSON.parse(storedUser) : null;
    
    if (parsedUser !== null) {
      dispatch(setUser(parsedUser));
    }
    
  }, []);
  
  const showCartBubble = location.pathname !== '/shopping-cart'
  && shoppingCartGames.length > 0
  && !isVisible;

  return (
    <>
      <Header  />

      <div ref={headerRef} />

      {showCartBubble && <ShoppingCartBubble />}

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
        <Route path="activate/:activationToken" element={<AccountActivationPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>

      <Footer />
    </>  
  );
}
