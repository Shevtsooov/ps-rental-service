import classNames from 'classnames';
import './Sorting.scss';

export const Sorting: React.FC = () => {

  return (
    <div className="sorting">
      <div

        className={classNames('sorting__select', {
          // 'sorting__select-col': droped
        })}
        // onClick={handleListDisplay}
      >
        <p className='sorting__select--default'>
          Категорії
          {/* {filteredCategory} */}
        </p>
      </div>
      {/* {droped && ( */}
        <ul className='sorting__select-items'>
              {/* {filteredCategory !== 'Всі категорії' && ( */}
              <li
                className='sorting__item'
                // onClick={() => handleOptionClick('Всі категорії')}
              >
                Всі категорії
              </li>
              {/* )} */}
          {/* {categoryNames.map(option => ( */}
              <li
                className='sorting__item'
                // key={option}
                // onClick={() => handleOptionClick(option)}
              >
                опція
                {/* {option} */}
              </li>
            {/* ))} */}
        </ul>
      {/* )} */}
    </div>
  );
}
