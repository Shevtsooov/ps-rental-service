import { useEffect, useState } from 'react';
import cn from 'classnames';
import './FilterSelector.scss';
import { filterFilteredCategories,
  resetFilteredCategoriess,
  setFilteredCategories,
} from '../../Redux/Slices/filteredCategories.slice';
import { useAppDispatch, useAppSelector } from '../../Redux/store';
import { resetFilteredPlayers, setFilteredPlayers } from '../../Redux/Slices/filteredPlayers.slice';
import { resetFilteredYear, setFilteredYear } from '../../Redux/Slices/filteredYear.slice';
import { resetPaginationPage } from '../../Redux/Slices/paginationPage.slice';
import { defaultCategories, players, years } from '../../helpers/filterOptions';
import { useFindGamesQuery } from '../../Redux/RTK_Query/games.service';
import { setQuery } from '../../Redux/Slices/query.slice';
import { FilterResults } from '../FilterResults/FilterResults';
import { FilterByBlock } from '../FilterByBlock/FilterByBlock';

export const FilterSelector: React.FC = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  // const [showDescription, setShowDescription] = useState(false);
  // const [descriptionCategory, setDescriptionCategory] = useState('');

  const query = useAppSelector(state => state.query.value);
  const filteredSorting = useAppSelector(state => state.filteredSorting.value);
  const filteredCategories = useAppSelector(state => state.filteredCategories.value);
  const filteredYear = useAppSelector(state => state.filteredYear.value);
  const filteredPlayers = useAppSelector(state => state.filteredPlayers.value);
  const dispatch = useAppDispatch();

  const { data: games, refetch } = useFindGamesQuery({
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

  useEffect(() => {
    return () => {
      setIsFilterOpen(false);
    }
  }, [])

  useEffect(() => {
    if (isFilterOpen) {
      document.body.style.overflow = 'hidden';

      return;
    }

    document.body.style.overflow = 'auto'
  }, [isFilterOpen]);

  const handleClearFilters = () => {
    dispatch(setQuery(''));
    dispatch(resetFilteredCategoriess());
    dispatch(resetFilteredPlayers());
    dispatch(resetFilteredYear());
  }

  const handleCategoryFilter = (option: string) => {
    if (filteredCategories.includes(option)) {
      dispatch(filterFilteredCategories(option));
      dispatch(resetPaginationPage());
      
      return;
    }
    
    dispatch(resetPaginationPage());
    dispatch(setFilteredCategories(option));
  };

  const handleChosenPlayers = (option: string) => {
    if (filteredPlayers === option) {
      dispatch(resetFilteredPlayers());
      dispatch(resetPaginationPage());

      return;
    }

    dispatch(resetPaginationPage());
    dispatch(setFilteredPlayers(option));
  };

  const handleChosenYears = (option: string) => {
    if (filteredYear === option) {
      dispatch(resetFilteredYear());
      dispatch(resetPaginationPage());

      return;
    }

    dispatch(setFilteredYear(option));
    dispatch(resetPaginationPage());
  };

  const handleOpenFilter = () => {
    window.scrollTo({
      top: 0, left: 0,
    });
    setIsFilterOpen(true);
  };

  const areResultsShown = filteredCategories.length !== 0
  || filteredYear !== '' 
  || filteredPlayers !== ''
  || query !== '';

  // const handeleShowDescription = (title: string) => {
  //   setDescriptionCategory(title);
  //   setShowDescription(true);
  // }

  // const handeleHideDescription = () => {
  //   setDescriptionCategory('');
  //   setShowDescription(false);
  // }


  return (
    <>
      <div
        className="filterSelector"
        onClick={handleOpenFilter}
      >
          <p>Фільтр</p>
      </div>

      {isFilterOpen && (
        <div
          className={cn('filterSelector__box', { 
              'filterSelector__box--active': isFilterOpen
            },
          )}
        >
          <div className="filterSelector__head">
            {areResultsShown && games && (
              <FilterResults
                games={games}
                setIsFilterOpen={setIsFilterOpen}
                isFilterOpen={isFilterOpen}
                handleClearFilters={handleClearFilters}
              />
            )}
            <h3>
              Фільтр ігор
            </h3>

            <button
              className="filterSelector__button"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            />
          </div>

          <FilterByBlock
            title="Оберіть катерорії:"
            filterOptions={defaultCategories}
            chosenFilter={filteredCategories}
            chooseFunction={handleCategoryFilter}
          />

          <FilterByBlock
            title="Оберіть кількість гравців:"
            filterOptions={players}
            chosenFilter={filteredPlayers}
            chooseFunction={handleChosenPlayers}
          />

          <FilterByBlock
            title="Оберіть роки релізу:"
            filterOptions={years}
            chosenFilter={filteredYear}
            chooseFunction={handleChosenYears}
          />
        </div>
      )}  
    </>
  );
}
