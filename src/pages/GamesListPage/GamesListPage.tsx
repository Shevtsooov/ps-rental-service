import React from 'react';
import './GamesListPage.scss';
import { Filter } from '../../components/Filter/Filter';
import { GameList } from '../../components/GameList/GameList';

import games from '../../data/games.json';

export const GamesListPage: React.FC = () => {

  return (
    <div className="gamesList">
      <h1 className='gamesList__title'>Ігри</h1>
      <p
        className='gamesList__amount'
      >
        {`Кількість ігор: ${
          games
            ? games.length
            : 'обрахування...'
          }`}
      </p>

      <Filter />

      <GameList games={games} />
    </div>

  );
}
