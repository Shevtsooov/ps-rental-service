import React, { useEffect } from 'react';
import './GamesListPage.scss';
import { Filter } from '../../components/Filter/Filter';
import { GameList } from '../../components/GameList/GameList';
import { useFindGamesQuery } from '../../Redux/RTK_Query/games.service';
import { useAppSelector } from '../../Redux/store';
import { Loader } from '../../components/Loader/Loader';

export const GamesListPage: React.FC = () => {
  const query = useAppSelector(state => state.query.value);
  const filteredSorting = useAppSelector(state => state.filteredSorting.value);
  const filteredCategories = useAppSelector(state => state.filteredCategories.value);
  const filteredYear = useAppSelector(state => state.filteredYear.value);
  const filteredPlayers = useAppSelector(state => state.filteredPlayers.value);

  const { data: games, refetch, isLoading, isSuccess } = useFindGamesQuery({
    sortBy: filteredSorting === 'Найновіші'
      ? 'DESC'
      : 'ASC',
    query: query,
    categories: filteredCategories,
    year: filteredYear,
    players: filteredPlayers,
  });

  useEffect(() => {
      refetch();
  }, [games, refetch]);

  return (
    <div className="gamesList">
      <h1 className='gamesList__title'>Ігри</h1>
      <p
        className='gamesList__amount'
      >
        {`Кількість ігор: ${
          games
            ? games.length
            : 'обрахування...'
          }`}
      </p>

      <Filter />

      {isLoading && <Loader />}
    {/* <Loader /> */}

      {isSuccess && <GameList games={games} />}
    </div>

  );
}
