import React, { useState } from 'react';
import './Homepage.scss';
import { Slider } from '../../components/Slider/Slider';
// import { BookPS } from '../../components/BookPS/BookPS';
import { PopularGames } from '../../components/PopularGames/PopularGames';
import { AboutPS5 } from '../../components/AboutPS5/AboutPS5';
import { Calendar } from '../../components/Calendar/Calendar';

export const Homepage: React.FC = () => {

  return (
    <div className="homepage">
      <Slider />

      {/* <BookPS /> */}

      <Calendar />

      <PopularGames />

      <AboutPS5 />
    </div>
  );
}
