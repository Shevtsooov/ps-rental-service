import { useState } from 'react';
import { Game } from '../../types/Game';
import { GameInfo } from '../GameInfo/GameInfo';
import { Pagination } from '../Pagination/Pagination';
import './GameList.scss';
import { useAppSelector } from '../../Redux/store';

type Props = {
  games: Game[];
}

export const GameList: React.FC<Props> = ({ games }) => {
  const paginationPage = useAppSelector(state => state.paginationPage.value);
  const [perPage, setPerPage] = useState(16);

  const start = perPage * paginationPage - perPage;
  const end = perPage * paginationPage <= games.length
    ? perPage * paginationPage
    : games.length;

  const gamesToShow = games.slice(start, end);

  const showPagination = games.length < perPage 
  || games.length === 0;

  return (
    <>
      <div className="gameList">
        {gamesToShow.map((game, i) => (
          <GameInfo game={game} key={game.gameId} />
        ))}
      </div>

      {!showPagination && (
        <Pagination 
          total={games.length}
          perPage={perPage}
        />
      )}
    </>
  );
}
