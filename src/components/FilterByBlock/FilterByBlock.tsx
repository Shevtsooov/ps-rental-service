import './FilterByBlock.scss';
import cn from 'classnames';

type Props = {
  title: string,
  filterOptions: string[],
  chosenFilter: string | string[],
  chooseFunction: (option: string) => void, 
}

export const FilterByBlock: React.FC<Props> = ({
  title,
  filterOptions,
  chosenFilter,
  chooseFunction,
}) => {

  return (
    <div className="filterByBlock">
      <h4 className="filterByBlock__heading">{title}</h4>
      {filterOptions.sort().map(option => (
        <button
          key={option}
          className={cn('filterByBlock__item', {
            'filterByBlock__item--active': chosenFilter.includes(option)
          })}
          onClick={() => chooseFunction(option)}
        >
          {option}
      {/* <span
            className={cn('filterSelector__filterBlock_description',{
              'filterSelector__filterBlock_description--active': showDescription && descriptionCategory === category.title
            })}
          >
            {category.description}
          </span> */}
        </button>
      ))}
    </div>
  );
}
