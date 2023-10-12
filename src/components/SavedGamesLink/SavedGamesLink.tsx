import { Link } from 'react-router-dom';
import './SavedGamesLink.scss';

import heart from '../../assets/icons/heart.svg'
import heartActive from '../../assets/icons/heart-active.svg';

import { useAppSelector } from '../../Redux/store';

export const SavedGamesLink: React.FC = () => {
  const savedGames = useAppSelector(state => state.savedGames.value);

  return (
    <div className="savedGamesLink">
     <Link
        to="saved-games"
      >
        {savedGames.length > 0
          ? (
            <>
              <img
                className="savedGamesLink__img"
                src={`${heartActive}`}
                alt="Saved games"
              />
              <p className="savedGamesLink__amount">
                {savedGames.length}
              </p>
            </>
          )
          : (
            <img
              className="savedGamesLink__img"
              src={`${heart}`}
              alt="Saved games"
            />
          )}
      </Link>
    </div>
  );
}
