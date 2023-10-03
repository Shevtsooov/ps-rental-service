import React from 'react';
import './GamesList.scss';
import { GameInfo } from '../../components/GameInfo/GameInfo';
import { games } from '../../data/games';
import { Filter } from '../../components/Filter/Filter';


export const GamesList: React.FC = () => {


  return (
    <div className="gamesList">
      <h1 className='gamesList__title'>Ігри</h1>
      <p
        className='gamesList__amount'
      >
        20 ігор
        {/* {`Кількість питань: ${
          questions?.rows
            ? questions?.count
            : 'обрахування...'
          }`} */}
      </p>
      <Filter />

      <div className="gamesList__list">
        {games.map(game => (
          <GameInfo game={game} />
        ))}
      </div>
    </div>

  );
}
