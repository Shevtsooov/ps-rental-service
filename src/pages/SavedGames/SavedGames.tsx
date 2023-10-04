import React from 'react';
import './SavedGames.scss';
import { useAppSelector } from '../../Redux/store';
import { GameList } from '../../components/GameList/GameList';
import { Link } from 'react-router-dom';

export const SavedGames: React.FC = () => {
  const savedGames = useAppSelector(state => state.savedGames.value);

  return (
    <div className="savedGames">
      <h1 className='savedGames__title'>Збережені ігри</h1>
      <p
        className='savedGames__amount'
      >
        {`Кількість ігор: ${
          savedGames
            ? savedGames.length
            : 'обрахування...'
          }`}
      </p>

      {savedGames.length
        ? <GameList games={savedGames} />
        : (
          <div className="savedGames__empty_list">
            <h4 className="savedGames__empty_list_heading">
              Ти ще не зберіг жодної гри
            </h4>

            {/* <p className="savedGames__empty_list_">
              Хутчіш додавай:
            </p> */}

            <button className="savedGames__empty_list_button">
              <Link
                to="/games"
                className="savedGames__empty_list_button--link"
              >
                До списку ігор
              </Link>
            </button>
          </div>
        )}

    </div>
  );
}
