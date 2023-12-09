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
import { useRefreshUserMutation } from './Redux/RTK_Query/authApi.service';
import { setUser } from './Redux/Slices/user.slice';
import { refreshTokenService } from './helpers/refreshTokenService';
import { RegistrationPage } from './pages/RegistrationPage/RegistrationPage';
import { AccountPage } from './pages/AccountPage/AccountPage';
import { AccountOrders } from './pages/AccountOrders/AccountOrders';
import { AdminPage } from './pages/AdminPage/AdminPage';
import { ClientsPage } from './pages/ClientsPage/ClientsPage';
import { Orders } from './pages/Orders/Orders';
import { PasswordResetInitialization } from './pages/PasswordResetInitialization/PasswordResetInitialization';
import { PasswordResetPage } from './pages/PasswordResetPage/PasswordResetPage';
import { Contacts } from './pages/Contacts/Contacts';
import { FeedbackPage } from './pages/FeedbackPage/FeedbackPage';
import { ReviewsPage } from './pages/ReviewsPage/ReviewsPage';

export const App: React.FC = () => {
  const user = useAppSelector(state => state.user.value);
  const [refreshUser] = useRefreshUserMutation();

  const location = useLocation();

  // THIS CODE SETS isVisible = true WHEN REF IS IN THE VIEWPORT
  const headerRef = useRef<HTMLDivElement | null>(null);
  const [isVisible] = useInViewport(headerRef);
  const dispatch = useAppDispatch();

  useEffect(() => {
    window.scrollTo({
      top: 0, left: 0,
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const refreshTokenFromLS = refreshTokenService.get();
      
      if (refreshTokenFromLS) {
        try {
          const response = await refreshUser({
            refreshToken: refreshTokenFromLS,
          });

          if ('data' in response) {
            const { refreshToken, user } = response.data;
            refreshTokenService.remove()
            refreshTokenService.save(refreshToken);
            dispatch(setUser(user));
          }
        } catch (error) {
          console.error('Error refreshing user:', error);
        }
      }
    };

    fetchData();
  }, [dispatch, refreshUser]);

  const showCartBubble = user
  && location.pathname !== '/shopping-cart'
  && location.pathname !== '/orders'
  && location.pathname !== '/clients'
  && user?.cartGames.length > 0
  && !isVisible;


  return (
    <div>
      <Header  />
      <div ref={headerRef} />

      <div className='App'>

        {showCartBubble && <ShoppingCartBubble />}

        {/* <h1 className='app__title'>Оренда Playstation у Львові</h1> */}

        <Routes>
          <Route path="home" element={<Homepage />} />
          <Route path="/" element={<Navigate to="home" />} />
          <Route path="games" element={<GamesListPage />} />
          <Route path="games/:gameIdLink" element={<GamePage />} />
          <Route path="pricing-and-delivery" element={<PlansAndDelivery />} />
          <Route path="agreement" element={<Agreement />} />
          <Route path="contacts" element={<Contacts />} />
          {/* <Route path="about-ps5" element={<AboutPS5 />} /> */}

          <Route path="login" element={<LoginPage />} />
          <Route path="registration" element={<RegistrationPage />} />
          <Route path="reset-password" element={<PasswordResetInitialization />} />
          <Route path="reset-password/:resetToken" element={<PasswordResetPage />} />

          <Route path="feedback/:reviewLink" element={<FeedbackPage />} />
          
          <Route path="account" element={<AccountPage />} />
          <Route path="account/orders" element={<AccountOrders />} />

          <Route path="saved-games" element={<SavedGames />} />
          <Route path="shopping-cart" element={<ShoppingCart />} />
          <Route path="activate/:activationToken" element={<AccountActivationPage />} />

          <Route path="clients" element={<ClientsPage />} />
          <Route path="orders" element={<Orders />} />
          <Route path="reviews" element={<ReviewsPage />} />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>

      <Footer />
    </div>  
  );
};
