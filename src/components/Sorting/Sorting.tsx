import cn from 'classnames';
import './Sorting.scss';
import { useEffect, useRef, useState } from 'react';

export const Sorting: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [chosen, setChosen] = useState('Популярні');
  const sortingRef = useRef<HTMLDivElement>(null);

  const dropdownOptions = [
    "Популярні",
    "Найновіші",
    "Дешевші",
    "Дорожчі",
    "Зі знижкою"
  ]

  const handleClickOutside: EventListener = (event) => {
    const targetNode = event.target as Node;

    if (sortingRef.current && !sortingRef.current.contains(targetNode)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleListDisplay = () => {
    setIsOpen(prev => !prev);
  };

  const handleOptionClick = (option: string) => {
    setChosen(option);
  };

  return (
    <div
      className="sorting"
      onClick={handleListDisplay}
      ref={sortingRef}
    >
      <div className="sorting__select" >
        <p>{chosen}</p>
      </div>
      {isOpen && (
      <ul className='sorting__select-items'>
        {dropdownOptions.map(option => (
          <li
            className='sorting__item'
            key={option}
            onClick={() => handleOptionClick(option)}
          >
            {option}
          </li>
        ))}
      </ul>
      )}
    </div>
  );
}
