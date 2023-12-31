import { setQuery } from '../../Redux/Slices/query.slice';
import { useAppDispatch, useAppSelector } from '../../Redux/store';
import './FilterInput.scss';
import { resetGamePaginationPage } from '../../Redux/Slices/paginationPage.slice';

export const FilterInput: React.FC = () => {
  const query = useAppSelector(state => state.query.value);
  const dispatch = useAppDispatch();

  const handleSearch = (search: string) => {
    dispatch(setQuery(search));
    dispatch(resetGamePaginationPage());
  }

  const handleClearQuery = () => {
    dispatch(setQuery(''));
  }
  
  return (
    <div className="filterInput">
      <input
        type="text"
        className='filterInput__field'
        placeholder='Почніть шукати ігри'
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
      />
      {query && (
        <button 
          className='filterInput__clear'
          onClick={handleClearQuery}
        />
      )}
    </div>
  );
}
