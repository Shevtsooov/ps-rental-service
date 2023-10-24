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

export const FilterSelector: React.FC = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

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
    dispatch(resetFilteredCategoriess());
    dispatch(resetFilteredPlayers());;
    dispatch(resetFilteredYear());;
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

  let correctGamesWord: string;

  switch (games?.length.toString().slice(-1)) {
    case '1':
      correctGamesWord = 'гра'
      break;
    case '2':
    case '3':
    case '4':
      correctGamesWord = 'гри'
      break;

    default:
      correctGamesWord = 'ігор'
  }

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
              <button
                className={cn('filterSelector__head_results', { 
                    'filterSelector__head_results--absent': games.length === 0
                  },
                )}
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                {games && games.length > 0
                  ? `Знайдено: ${games.length} ${correctGamesWord}`
                  : 'Нічого не знайдено'}
              </button>
            )}
            <h3>
              Фільтр ігор
            </h3>

            <button
              className="filterSelector__button"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            />
          </div>

          <div className="filterSelector__filterBlock">
            <h4 className="filterSelector__filterBlock_heading">Оберіть катерорії:</h4>
            {defaultCategories.sort().map(category => (
              <button
                key={category}
                className={cn('filterSelector__filterBlock_item', {
                  'filterSelector__filterBlock_item--active': filteredCategories.includes(category)
                })}
                onClick={() => handleCategoryFilter(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="filterSelector__filterBlock">
            <h4 className="filterSelector__filterBlock_heading">Оберіть кількість гравців:</h4>
            {players.map(player => (
              <button
                key={player}
                className={cn('filterSelector__filterBlock_item', {
                  'filterSelector__filterBlock_item--active': filteredPlayers === player
                })}
                onClick={() => handleChosenPlayers(player)}
              >
                {player}
              </button>
            ))}
          </div>

          <div className="filterSelector__filterBlock">
            <h4 className="filterSelector__filterBlock_heading">Оберіть роки релізу:</h4>
            {years.map(year => (
              <button
                key={year}
                className={cn('filterSelector__filterBlock_item', {
                  'filterSelector__filterBlock_item--active': filteredYear === year
                })}
                onClick={() => handleChosenYears(year)}
              >
                {year}
              </button>
            ))}
          </div>
          
          <div className="filterSelector__actions">
            <button
              className="filterSelector__actions_button filterSelector__actions_button--clear"
              onClick={handleClearFilters}
            >
              Очистити
            </button>

            <button
              className="filterSelector__actions_button filterSelector__actions_button--apply"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              Застосувати
            </button>
          </div>

        </div>
      )}  
    </>
  );
}
