import React, { useEffect } from 'react';
import './GamesListPage.scss';
import { Filter } from '../../components/Filter/Filter';
import { GameList } from '../../components/GameList/GameList';
import { useAppDispatch, useAppSelector } from '../../Redux/store';
import { Loader } from '../../components/Loader/Loader';
import { resetFilteredCategories } from '../../Redux/Slices/filteredCategories.slice';
import { resetFilteredSorting } from '../../Redux/Slices/filteredSorting.slice';
import { resetFilteredYear } from '../../Redux/Slices/filteredYear.slice';
import { setQuery } from '../../Redux/Slices/query.slice';
import { resetFilteredPlayers } from '../../Redux/Slices/filteredPlayers.slice';
import gamesFromData from '../../data/games.json';
import { Game } from '../../types/Game';

export const GamesListPage: React.FC = () => {
  const query = useAppSelector(state => state.query.value);
  const filteredSorting = useAppSelector(state => state.filteredSorting.value);
  const filteredCategories = useAppSelector(state => state.filteredCategories.value);
  const filteredYear = useAppSelector(state => state.filteredYear.value);
  const filteredPlayers = useAppSelector(state => state.filteredPlayers.value);

  useEffect(() => {
    document.title = 'Ігри';
  }, []);

  const dispatch = useAppDispatch();

  useEffect(() => {
    window.scrollTo({
      top: 0, left: 0,
    });
  }, []);

  const isFiltering = query !== '' || filteredCategories.length !== 0 || filteredYear !== '' || filteredPlayers !== '';

  const handleClearFilters = () => {
    dispatch(resetFilteredCategories());
    dispatch(resetFilteredSorting());
    dispatch(resetFilteredPlayers());
    dispatch(resetFilteredYear());
    dispatch(setQuery(''));
  };

  const filterGames = () => {
    let filteredGames: Game[] = gamesFromData;

    if (query !== '') {
      const formattedQuery = query.trim().toLowerCase();
      filteredGames = filteredGames.filter((game) => (
        game.title?.toLocaleLowerCase().includes(formattedQuery) || game.description?.toLocaleLowerCase().includes(formattedQuery)
      ));
    }

    if (filteredYear) {
      filteredGames = filteredGames.filter((game) => game.releasedOn?.includes(filteredYear.toString()));
    }

    if (filteredCategories.length > 0) {
      const searchedCategories = filteredCategories.map((category) => category.trim());
      filteredGames = filteredGames.filter((game) => {
        const gameCategories = game.category.map((cat) => cat.trim());
        return searchedCategories.every((cat) => gameCategories.includes(cat));
      });
    }

    filteredGames.sort((gA, gB) => {
      const [dayA, monthA, yearA] = gA.releasedOn!.toString().split('/').map(Number);
      const [dayB, monthB, yearB] = gB.releasedOn!.toString().split('/').map(Number);

      if (yearA !== yearB) {
        return filteredSorting === 'Найновіші' ? yearB - yearA : yearA - yearB;
      }

      if (monthA !== monthB) {
        return filteredSorting === 'Найновіші' ? monthB - monthA : monthA - monthB;
      }

      return filteredSorting === 'Найновіші' ? dayB - dayA : dayA - dayB;
    });

    return filteredGames;
  };

  const filteredGames = filterGames();

  return (
    <div className="gamesList">
      <div className="gamesList__header">
        <div>
          <h1 className='gamesList__title'>Ігри</h1>
          <p className='gamesList__amount'>
            {`Кількість ігор: ${filteredGames.length}`}
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

      <Filter filteredGames={filteredGames} />

      {!filteredGames.length && <Loader />}

      {filteredGames.length > 0 && <GameList games={filteredGames} />}
    </div>
  );
};
