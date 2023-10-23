import { useSearchParams } from 'react-router-dom';
import { FilterInput } from '../FilterInput/FilterInput';
import { FilterSelector } from '../FilterSelector/FilterSelector';
import { Sorting } from '../Sorting/Sorting';
import './Filter.scss';
import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../Redux/store';
import { setQuery } from '../../Redux/Slices/query.slice';

import { setFilteredYear } from '../../Redux/Slices/filteredYear.slice';
import { setFilteredPlayers } from '../../Redux/Slices/filteredPlayers.slice';
import { setFilteredCategories } from '../../Redux/Slices/filteredCategories.slice';
import { setFilteredSorting } from '../../Redux/Slices/filteredSorting.slice';


export const Filter: React.FC = () => {
  const filteredSorting = useAppSelector(state => state.filteredSorting.value);
  const query = useAppSelector(state => state.query.value);
  const filteredCategories = useAppSelector(state => state.filteredCategories.value);
  const filteredYear = useAppSelector(state => state.filteredYear.value);
  const filteredPlayers = useAppSelector(state => state.filteredPlayers.value);
  const dispatch = useAppDispatch();

  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = searchParams.get('sortBy') || 'Найновіші';
  const search = searchParams.get('search') || '';
  const categories = searchParams.get('categories') || '';
  const year = searchParams.get('year') || '';
  const players = searchParams.get('players') || '';

  const params = useMemo(() => ({
    sortBy: sortBy !== ''
      ? sortBy
      : filteredSorting,
    search: search !== ''
      ? search
      : query,
    categories: filteredCategories.join(','),
    year: year !== ''
      ? year
      : filteredYear,
    players: players !== ''
      ? players
      : filteredPlayers,
  }), [filteredPlayers, filteredSorting, filteredCategories, filteredYear, players, categories, query, search, sortBy, year]);

  console.log(params.categories);
  console.log('filteredCategories - ', filteredCategories);


  useEffect(() => {
    setSearchParams(params);
  }, [setSearchParams, params]);

  useEffect(() => {
    dispatch(setFilteredSorting(sortBy));
    dispatch(setQuery(search));
    if (categories !== '') {
      categories.split(',').forEach(cat => {
        if (!filteredCategories.includes(cat)) {
          dispatch(setFilteredCategories(cat))
        }
      })
    }
    dispatch(setFilteredYear(year));
    dispatch(setFilteredPlayers(players));
  }, []);

  return (
    <div className="filter">
      <FilterInput setSearchParams={setSearchParams} />

      <Sorting setSearchParams={setSearchParams} />

      <FilterSelector setSearchParams={setSearchParams} />
    </div>
  );
}
