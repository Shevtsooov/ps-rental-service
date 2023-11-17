import { Link } from 'react-router-dom';
import './SavedGamesLink.scss';
import heart from '../../assets/icons/heart.svg'
import { useAppSelector } from '../../Redux/store';

export const SavedGamesLink: React.FC = () => {
  const user = useAppSelector(state => state.user.value);

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
        {user && user.likedGames.length > 0 && (
          <p className="savedGamesLink__amount">
            {user.likedGames.length}
          </p>
        )}
      </Link>
    </div>
  );
}
