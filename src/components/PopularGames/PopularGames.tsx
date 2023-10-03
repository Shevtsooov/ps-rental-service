import './PopularGames.scss';
import { GameInfo } from '../GameInfo/GameInfo';
import { games } from '../../data/games';

export const PopularGames: React.FC = () => {

  const sortedGames = games
    .sort((gameA, gameB) => (
      gameB.popularity - gameA.popularity
    ))
    .slice(0, 8);

  return (
    <div className="popularGames">
      <h2 className="popularGames__heading">Вибір гравців:</h2>
      <p className="popularGames__description">
        {`ТОП-${sortedGames.length} ігор, які замовляють наші гравці`}
      </p>
      <div className="popularGames__list">
        {sortedGames.map(game => (
          <GameInfo game={game} />
        ))}
      </div>
    </div>
  );
}
