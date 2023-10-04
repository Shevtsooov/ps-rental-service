import { Link } from 'react-router-dom';
import './SavedGamesLink.scss';

import heart from '../../assets/icons/heart.svg'

export const SavedGamesLink: React.FC = () => {

  return (
    <div className="savedGamesLink">
     <Link
        to="saved-games"
      >
        <img
          className="savedGamesLink__img"
          src={`${heart}`}
          alt="Saved games"
        >
        </img>
      </Link>
    </div>
  );
}
