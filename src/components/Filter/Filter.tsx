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
import { hardSetFilteredCategories } from '../../Redux/Slices/filteredCategories.slice';
import { setFilteredSorting } from '../../Redux/Slices/filteredSorting.slice';

type ParamsType = {
  [key: string]: string | string [];
};

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


  const params: ParamsType = useMemo(() => ({
    sortBy: filteredSorting,
    search: query,
    categories: filteredCategories.join(','),
    year: filteredYear,
    players: filteredPlayers,
  }), [filteredPlayers, filteredSorting, filteredCategories, filteredYear, query]);

  useEffect(() => {
    for (const key in params) {
      if (params[key] === '') {
        delete params[key];
      }
    }
    
    setSearchParams(params);
  }, [params]);

  useEffect(() => {
    dispatch(setFilteredSorting(sortBy));
    dispatch(setQuery(search));
    if (categories !== '') {
      dispatch(hardSetFilteredCategories(categories.split(',')));
    }
    dispatch(setFilteredYear(year));
    dispatch(setFilteredPlayers(players));
  }, []);

  return (
    <div className="filter">
      <FilterInput  />

      <Sorting />

      <FilterSelector />
    </div>
  );
}
