import { useEffect, useState } from 'react';
import cn from 'classnames';
import './FilterSelector.scss';

export const FilterSelector: React.FC = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [generalFilter, setGeneralFilter] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string[]>([]);
  const [chosenPlayers, setChosenPlayers] = useState<string>('');
  const [chosenYears, setChosenYears] = useState<string>('');

  // const [isFilterOpen, setIsFilterOpen] = useState(false);

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
    setGeneralFilter('');
    setCategoryFilter([]);
    setChosenPlayers('');
    setChosenYears('');
  }

  useEffect(() => {
    return () => {
      handleClearFilters();
    }
  }, []);

  const generalOptions = [
    'Для дітей',
    'Для нього та для неї',
    'Для компанії',
    'Граю один',
  ];

  const categories = [
    'Action',
    'Автосимулятори(гонки)',
    'Аркади',
    'Дитячі',
    'Квест',
    'Платформери',
    'Пригоди',
    'Рольові',
    'Симулятори',
    'Спортивні',
    'Стратегії',
    'Жахи, виживання',
    'Військові',
    'Шутери від першої особи',
    'Шутери від третьої особи',
  ];

  const players = ['1', '2', '2+'];
  const years = ['<2020', '2020', '2021', '2022', '2023'];
  
  const handleGeneralFilter = (option: string) => {
    setGeneralFilter((state) => {
      if (state === option) {
        return state = ''
      } else {
        return state = option;
      }
    });
  };

  const handleCategoryFilter = (option: string) => {
    setCategoryFilter((state) => {
      if (state.includes(option)) {
        return state.filter((op) => op !== option);
      } else {
        return [...state, option];
      }
    });
  };

  const handleChosenPlayers = (option: string) => {
    setChosenPlayers((state) => {
      if (state === option) {
        return state = ''
      } else {
        return state = option;
      }
    });
  };

  const handleChosenYears = (option: string) => {
    setChosenYears((state) => {
      if (state === option) {
        return state = ''
      } else {
        return state = option;
      }
    });
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

          <div className="filterSelector__filterBlock">
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
          </div>

          <div className="filterSelector__filterBlock">
            <h4 className="filterSelector__filterBlock_heading">Оберіть катерорії:</h4>
            {categories.map(category => (
              <button
                key={category}
                className={cn('filterSelector__filterBlock_item', {
                  'filterSelector__filterBlock_item--active': categoryFilter.includes(category)
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
                  'filterSelector__filterBlock_item--active': chosenPlayers === player
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
                  'filterSelector__filterBlock_item--active': chosenYears === year
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
