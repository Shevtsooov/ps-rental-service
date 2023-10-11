import { Game } from '../../types/Game';
import { GameInfo } from '../GameInfo/GameInfo';
import './GameList.scss';

type Props = {
  games: Game[];
}

export const GameList: React.FC<Props> = ({ games }) => {

  return (
    <div className="gameList">
      {games.map((game, i) => (
        <GameInfo game={game} key={game.gameId} index={i} />
      ))}
    </div>
  );
}
