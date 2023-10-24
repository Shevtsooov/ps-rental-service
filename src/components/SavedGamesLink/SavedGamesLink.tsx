import { Link } from 'react-router-dom';
import './SavedGamesLink.scss';

import heart from '../../assets/icons/heart.svg'

import { useAppSelector } from '../../Redux/store';

export const SavedGamesLink: React.FC = () => {
  const savedGames = useAppSelector(state => state.savedGames.value);

  return (
    <div className="savedGamesLink">
     <Link
        to="saved-games"
      >
        <img
          className="savedGamesLink__img"
          src={`${heart}`}
          alt="Saved games"
        />
        {savedGames.length > 0 && (
          <p className="savedGamesLink__amount">
            {savedGames.length}
          </p>
        )}
      </Link>
    </div>
  );
}
