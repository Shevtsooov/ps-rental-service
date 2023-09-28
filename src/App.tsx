import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import './App.scss';

import { Header } from './components/Header/Header';
import { Homepage } from './pages/Homepage/Homepage';

export const App: React.FC = () => {

  return (
    <>
      <Header />

      <Routes>
        <Route path="home" element={<Homepage />} />
        <Route path="/" element={<Navigate to="home" />} />
      </Routes>
    </>  
  );
}
