import { useEffect, useState } from 'react';
import cn from 'classnames';
import './FilterSelector.scss';
import { filterFilteredCategories,
  resetFilteredCategories,
  setFilteredCategories,
} from '../../Redux/Slices/filteredCategories.slice';
import { useAppDispatch, useAppSelector } from '../../Redux/store';
import { resetFilteredPlayers, setFilteredPlayers } from '../../Redux/Slices/filteredPlayers.slice';
import { resetFilteredYear, setFilteredYear } from '../../Redux/Slices/filteredYear.slice';
import { defaultCategories, players, years } from '../../helpers/filterOptions';
import { setQuery } from '../../Redux/Slices/query.slice';
import { FilterResults } from '../FilterResults/FilterResults';
import { FilterByBlock } from '../FilterByBlock/FilterByBlock';
import { resetGamePaginationPage } from '../../Redux/Slices/paginationPage.slice';
import { NavLink } from 'react-router-dom';
import { Game } from '../../types/Game';

type Props = {
  filteredGames: Game[];
}

export const FilterSelector: React.FC<Props> = ({ filteredGames }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [howItWorks, setHowItWorks] = useState(false);
  // const [showDescription, setShowDescription] = useState(false);
  // const [descriptionCategory, setDescriptionCategory] = useState('');
  
  const query = useAppSelector(state => state.query.value);
  const filteredSorting = useAppSelector(state => state.filteredSorting.value);
  const filteredCategories = useAppSelector(state => state.filteredCategories.value);
  const filteredYear = useAppSelector(state => state.filteredYear.value);
  const filteredPlayers = useAppSelector(state => state.filteredPlayers.value);
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      setIsFilterOpen(false);
      document.body.style.overflow = 'auto'
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
    dispatch(resetFilteredCategories());
    dispatch(resetFilteredPlayers());
    dispatch(resetFilteredYear());
  }

  const handleCategoryFilter = (option: string) => {
    if (filteredCategories.includes(option)) {
      dispatch(filterFilteredCategories(option));
      dispatch(resetGamePaginationPage());
      
      return;
    }
    
    dispatch(resetGamePaginationPage());
    dispatch(setFilteredCategories(option));
  };

  // const handleChosenPlayers = (option: string) => {
  //   if (filteredPlayers === option) {
  //     dispatch(resetFilteredPlayers());
  //     dispatch(resetPaginationPage());

  //     return;
  //   }

  //   dispatch(resetPaginationPage());
  //   dispatch(setFilteredPlayers(option));
  // };

  const handleChosenYears = (option: string) => {
    if (filteredYear === option) {
      dispatch(resetFilteredYear());
      dispatch(resetGamePaginationPage());

      return;
    }

    dispatch(setFilteredYear(option));
    dispatch(resetGamePaginationPage());
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
            {areResultsShown && filteredGames && (
              <FilterResults
                games={filteredGames}
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
          
          <p
            className='filterSelector__howButton'
            onClick={() => setHowItWorks(state => !state)}
          >Як працює цей фільтр?</p>

          {howItWorks && (
            <div className='filterSelector__how'>
              <h5 className='filterSelector__howTitle'>Як працює цей фільтр?</h5>
              
              <button
                className="filterSelector__how__button"
                onClick={() => setHowItWorks(state => !state)}
              />

              <p className='filterSelector__howBlock'>
                Оберіть одну або декілька категорій і наш фільтр покаже лише ті ігри, які включать усі обрані вами категорії.
              </p>

              <p className='filterSelector__howBlock'>
                Це робить ваш вибір ще точнішим і дозволяє знаходити ігри, які ідеально відповідають вашим запитам.
              </p>

              <p className='filterSelector__howBlock'>
               Наприклад, якщо ви оберете категорії "Дитячі" та "Жахи", наш фільтр нічого не покаже, бо ми не маємо жодної гри з жахами для дітей.
              </p>

              <p className='filterSelector__howBlock'>
                Ще один приклад, це коли ви хочете підібрати ігри, щоб грати в компанії друзів. Ви можете вибрати "Кооперативні", і фільтр покаже вам більше 40 ігор. Щоб уточнити пошук, ви вказуєте ще одну категорію і список кооперативних ігор звужується, що спрощує пошуки.
              </p>

              {/* <p className='filterSelector__howBlock'>
                Насолоджуйтеся точністю вибору!
              </p> */}

              <h3 className='filterSelector__how__questions'>Залишились питання?</h3>

              <NavLink
                className='filterSelector__how__button1'
                to="/contacts"
              >
                Запитати у менеджера
              </NavLink>

              <button
                className='filterSelector__how__button2'
                onClick={() => setHowItWorks(state => !state)}
              >
                Зрозуміло
              </button>
            </div>
          )}

          <FilterByBlock
            title="Оберіть катерорії:"
            filterOptions={defaultCategories}
            chosenFilter={filteredCategories}
            chooseFunction={handleCategoryFilter}
          />

          {/* <FilterByBlock
            title="Оберіть кількість гравців:"
            filterOptions={players}
            chosenFilter={filteredPlayers}
            chooseFunction={handleChosenPlayers}
          /> */}

          <FilterByBlock
            title="Оберіть рік релізу:"
            filterOptions={years}
            chosenFilter={filteredYear}
            chooseFunction={handleChosenYears}
          />
        </div>
      )}  
    </>
  );
}
