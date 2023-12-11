import React, { useEffect } from 'react';
import './GamesListPage.scss';
import { Filter } from '../../components/Filter/Filter';
import { GameList } from '../../components/GameList/GameList';
import { useFindGamesQuery } from '../../Redux/RTK_Query/games.service';
import { useAppDispatch, useAppSelector } from '../../Redux/store';
import { Loader } from '../../components/Loader/Loader';
import { resetFilteredCategoriess } from '../../Redux/Slices/filteredCategories.slice';
import { resetFilteredSorting } from '../../Redux/Slices/filteredSorting.slice';
import { resetFilteredYear } from '../../Redux/Slices/filteredYear.slice';
import { setQuery } from '../../Redux/Slices/query.slice';
import { resetFilteredPlayers } from '../../Redux/Slices/filteredPlayers.slice';
import ReactGA from 'react-ga';

export const GamesListPage: React.FC = () => {
  const query = useAppSelector(state => state.query.value);
  const filteredSorting = useAppSelector(state => state.filteredSorting.value);
  const filteredCategories = useAppSelector(state => state.filteredCategories.value);
  const filteredYear = useAppSelector(state => state.filteredYear.value);
  const filteredPlayers = useAppSelector(state => state.filteredPlayers.value);

  const dispatch = useAppDispatch();

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
    window.scrollTo({
      top: 0, left: 0,
    });
  }, []);

  ReactGA.initialize('G-CNN8VPH0WD');

  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  const isFiltering = query !== ''
  || filteredCategories.length !== 0
  || filteredYear !== ''
  || filteredPlayers !== '';

  useEffect(() => {
      refetch();
  }, [games, refetch]);

  const handleClearFilters = () => {
    dispatch(resetFilteredCategoriess());
    dispatch(resetFilteredSorting());
    dispatch(resetFilteredPlayers());
    dispatch(resetFilteredYear());
    dispatch(setQuery(''));
  };

  return (
    <div className="gamesList">
      <div className="gamesList__header">
        <div>
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
        </div>
        
        {isFiltering && (
          <button
            className="gamesList__button"
            onClick={handleClearFilters}
          >
            Очистити фільтри
          </button>
        )}
        
      </div>
      

      <Filter />

      {isLoading && <Loader />}
    {/* <Loader /> */}

      {isSuccess && <GameList games={games} />}
    </div>

  );
}
