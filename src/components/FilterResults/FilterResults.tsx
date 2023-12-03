import { Game } from '../../types/Game';
import './FilterResults.scss';
import cn from 'classnames';

type Props = {
  games: Game[],
  isFetching : boolean,
  setIsFilterOpen: (boolean: boolean) => void,
  isFilterOpen: boolean,
  handleClearFilters: () => void,
};

export const FilterResults: React.FC<Props> = ({
  games,
  isFetching ,
  setIsFilterOpen,
  isFilterOpen,
  handleClearFilters,
}) => {

  let correctGamesWord: string;

  switch (games?.length.toString().slice(-1)) {
    case '1':
      correctGamesWord = 'гру'
      break;
    case '2':
    case '3':
    case '4':
      correctGamesWord = 'гри'
      break;

    default:
      correctGamesWord = 'ігор'
  };

  return (
    <>
      {isFetching 
        ? (
          <div className="filterResults">
            <button
              className='filterResults__found'
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              Підбираємо ігри...
            </button>

            <button
              className="filterResults__found filterResults__found--clear"
              onClick={handleClearFilters}
            >
              Очистити
            </button>
          </div>
        )
        : (
          <div className="filterResults">
            <button
              className={cn('filterResults__found', { 
                  'filterResults__found--absent': games.length === 0
                },
              )}
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              {games && games.length > 0
                ? `Знайдено ${games.length} ${correctGamesWord}`
                : 'Нічого не знайдено'}
            </button>

            <button
              className="filterResults__found filterResults__found--clear"
              onClick={handleClearFilters}
            >
              Очистити
            </button>
          </div>
        )}
    </> 
  );
}
