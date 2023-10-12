import React from 'react';
import './Homepage.scss';
import { Slider } from '../../components/Slider/Slider';
import { BookPS } from '../../components/BookPS/BookPS';
import { PopularGames } from '../../components/PopularGames/PopularGames';
import { AboutPS5 } from '../../components/AboutPS5/AboutPS5';
import games from '../../data/games.json'
import { Aaa } from '../../components/111/111';

export const Homepage: React.FC = () => {

  return (
    <div className="homepage">
      <Slider />

      {/* <Aaa />

        <div>
          <ul>
            {games.map(game => (
              // <li>{`type nul > ${game.gameId}.jpg`}</li>
              <img src={`${game.poster}`} alt="" className='aaa'/>
            ))}
          </ul>
        </div> */}
      <BookPS />

      <PopularGames />

      <AboutPS5 />
    </div>
  );
}
