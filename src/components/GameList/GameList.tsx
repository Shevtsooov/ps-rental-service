import { useState } from 'react';
import { Game } from '../../types/Game';
import { GameInfo } from '../GameInfo/GameInfo';
import './GameList.scss';
import { useAppSelector } from '../../Redux/store';
import { GamePagination } from '../GamePagination/GamePagination';

type Props = {
  games: Game[];
}

export const GameList: React.FC<Props> = ({ games }) => {
  const gamePaginationPage = useAppSelector(state => state.gamePaginationPage.value);
  const [perPage, setPerPage] = useState(16);

  const start = perPage * gamePaginationPage - perPage;
  const end = perPage * gamePaginationPage <= games.length
    ? perPage * gamePaginationPage
    : games.length;

  const gamesToShow = games.slice(start, end);

  const showPagination = games.length <= perPage 
  || games.length === 0;

  return (
    <>
      <div className="gameList">
        {gamesToShow.map((game, i) => (
          <GameInfo game={game} key={game.gameId} />
        ))}
      </div>

      {gamesToShow.length === 0 && (
        <p className="gameList--warning">
          На жаль, ми не маємо ігор за обраними фільтрами
        </p>
      )}

      {!showPagination && (
        <GamePagination
          total={games.length}
          perPage={perPage}
        />
      )}
    </>
  );
}
