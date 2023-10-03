import { FilterInput } from '../FilterInput/FilterInput';
import { Sorting } from '../Sorting/Sorting';
import './Filter.scss';

export const Filter: React.FC = () => {

  return (
    <div className="filter">
      <FilterInput />

      <Sorting />
    </div>
  );
}
