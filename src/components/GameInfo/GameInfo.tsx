import './GameInfo.scss';
import { Game } from '../../types/Game';
import { NavLink } from 'react-router-dom';

type Props = {
  game: Game,
}

export const GameInfo: React.FC<Props> = ({ game }) => {
  const {
    title,
    icon,
    gameId,
    isAvailable,
  } = game;

  const scrollToTop = () => {
    window.scrollTo({ top: 60, left: 0, behavior: 'smooth' });
  };

  return (
    <div className="gameInfo">

      {!isAvailable && <div className="gameInfo--unavailable" />}
      
      <NavLink to={`/games/${gameId}`}>
        <img
          // {/* src={game.iconLink} */}
          src={`../images/games/${icon}`}
          alt={`${title} - logo`}
          className="gameInfo_image"
          onClick={scrollToTop}
        />
      </NavLink>
      <NavLink
        className="gameInfo_heading"
        to={`/games/${gameId}`}
        onClick={scrollToTop}
      >
        {title}
      </NavLink>
    </div>
  );
}
