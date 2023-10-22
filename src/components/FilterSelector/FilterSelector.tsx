import { useEffect, useState } from 'react';
import cn from 'classnames';
import './FilterSelector.scss';
import { filterFilteredCategories, resetFilteredCategoriess, setFilteredCategories } from '../../Redux/Slices/filteredCategories.slice';
import { useAppDispatch, useAppSelector } from '../../Redux/store';
import { resetFilteredPlayers, setFilteredPlayers } from '../../Redux/Slices/filteredPlayers.slice';
import { resetFilteredYear, setFilteredYear } from '../../Redux/Slices/filteredYear.slice';

export const FilterSelector: React.FC = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredCategories = useAppSelector(state => state.filteredCategories.value);
  const filteredYear = useAppSelector(state => state.filteredYear.value);
  const filteredPlayers = useAppSelector(state => state.filteredPlayers.value);
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      setIsFilterOpen(false);
      handleClearFilters();
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
    // setGeneralFilter('');
    dispatch(resetFilteredCategoriess());
    resetFilteredPlayers();
    resetFilteredYear();
  }

  // const generalOptions = [
  //   'Для дітей',
  //   'Для нього та для неї',
  //   'Для компанії',
  //   'Граю один',
  // ];

  const categories = [
    'Пригоди',
    'Платформери',
    'Екшн',
    'Бійки',
    'Кооперативні',
    'Симулятори',
    'Головоломки',
    'Шутери',
    'Космос',
    'Рольові',
    'Сімейні',
    'Стратегії',
    'Аркади',
    'Спортивні',
    'Відкритий світ',
    'Гонки',
    'Музика',
    'Риболовля',
    'Дитячі',
    'Ретро',
    'Кіберпанк',
    'Жахи',
    'Настільні',
    'Детективи',
    'Виживання',
    "Для нього та для неї"
  ];

  const players = ['1', '2', '2+'];
  const years = [
    '2013',
    '2014',
    '2015',
    '2016',
    '2017',
    '2018',
    '2019',
    '2020',
    '2021',
    '2022',
    '2023',
  ];
  
  // const handleGeneralFilter = (option: string) => {
  //   setGeneralFilter((state) => {
  //     if (state === option) {
  //       return state = ''
  //     } else {
  //       return state = option;
  //     }
  //   });
  // };

  const handleCategoryFilter = (option: string) => {
    if (filteredCategories.includes(option)) {
      dispatch(filterFilteredCategories(option));
    }

    dispatch(setFilteredCategories(option));
  };

  const handleChosenPlayers = (option: string) => {
    if (filteredPlayers === option) {
      dispatch(resetFilteredPlayers());
    }

    dispatch(setFilteredPlayers(option));
  };

  const handleChosenYears = (option: string) => {
    if (filteredYear === option) {
      dispatch(resetFilteredYear());
    }

    dispatch(setFilteredYear(option));
  };

  return (
    <>
      <div
        className="filterSelector"
        onClick={() => setIsFilterOpen(true)}
      >
          <p>Фільтр</p>
      </div>

      {isFilterOpen && (
        <div
          className={cn(
            'filterSelector__box', { 
              'filterSelector__box--active': isFilterOpen
            },
          )}
        >
          <div className="filterSelector__head">
            <h3>
              Фільтр ігор
            </h3>

            <button
              className="filterSelector__button"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            />
          </div>

          {/* <div className="filterSelector__filterBlock">
            {generalOptions.map(option => (
              <button
                key={option}
                className={cn('filterSelector__filterBlock_item', {
                  'filterSelector__filterBlock_item--active': generalFilter === option
                })}
                onClick={() => handleGeneralFilter(option)}
              >
                {option}
              </button>
            ))}
          </div> */}

          <div className="filterSelector__filterBlock">
            <h4 className="filterSelector__filterBlock_heading">Оберіть катерорії:</h4>
            {categories.sort().map(category => (
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
