import { FilterInput } from '../FilterInput/FilterInput';
import { FilterSelector } from '../FilterSelector/FilterSelector';
import { Sorting } from '../Sorting/Sorting';
import './Filter.scss';

export const Filter: React.FC = () => {

  return (
    <div className="filter">
      <FilterInput />

      <Sorting />

      <FilterSelector />
    </div>
  );
}
