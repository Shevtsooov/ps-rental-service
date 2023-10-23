import { SetURLSearchParams } from 'react-router-dom';
import { resetPaginationPage } from '../../Redux/Slices/paginationPage.slice';
import { setQuery } from '../../Redux/Slices/query.slice';
import { useAppDispatch, useAppSelector } from '../../Redux/store';
import './FilterInput.scss';

type Props = {
  setSearchParams: SetURLSearchParams,
}

export const FilterInput: React.FC<Props> = ({ setSearchParams }) => {
  const query = useAppSelector(state => state.query.value);
  const dispatch = useAppDispatch();

  const handleSearch = (search: string) => {
    setSearchParams({ search: search });
    dispatch(setQuery(search));
    dispatch(resetPaginationPage());
  }

  const handleClearQuery = () => {
    dispatch(setQuery(''));
    setSearchParams({ search: '' });
  }
  
  return (
    <div className="filterInput">
      <input
        type="text"
        className='filterInput__field'
        placeholder='Почніть шукати гру'
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
      />
      {query && (
        <button 
          className='filterInput__clear'
          onClick={handleClearQuery}
        >
          X
        </button>
      )}
    </div>
  );
}
