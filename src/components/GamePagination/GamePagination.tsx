import React from 'react';
import cn from 'classnames';
import './GamePagination.scss';
import { generateVisiblePages } from '../../helpers/generateVisiblePages';
import { useAppDispatch, useAppSelector } from '../../Redux/store';
import { setGamePaginationPage } from '../../Redux/Slices/paginationPage.slice';

/* eslint-disable */
interface Props {
  total: number,
  perPage: number,
};

export const GamePagination: React.FC<Props> = ({
  total,
  perPage,
}) => {
  const gamePaginationPage = useAppSelector(state => state.gamePaginationPage.value);
  const dispatch = useAppDispatch();
  
  const totalPages = Math.ceil(total / perPage);
  const visiblePages = generateVisiblePages(
    gamePaginationPage,
    totalPages,
    6, // this number defines the number of shown numbers in pagination(length of pagination)
  );

  const handlePageChange = (page: number) => {
    if (gamePaginationPage !== page && page >= 1 && page <= totalPages) {
      dispatch(setGamePaginationPage(page));

      window.scrollTo({
        top: 60, left: 0, behavior: 'smooth'
      });
    }
  };

  return (
    <ul className="pagination">
      <li className={
        cn('pagination__page-item pagination__page-item--prev-page', {
          'pagination__page-item--inActive': gamePaginationPage <= 1,
        })}
      >
        <a
          className="pagination__page-link"
          aria-disabled={gamePaginationPage === 1}
          onClick={() => handlePageChange(gamePaginationPage - 1)}
        >
        </a>
      </li>
      {visiblePages.map(page => (
        <li
          className={cn('pagination__page-item', {
            'pagination__page-item--active': gamePaginationPage === page,
          })}
          key={page}
        >
          <a
            className="pagination__page-link"
            onClick={() => handlePageChange(page)}
          >
            {page}
          </a>
        </li>
      ))}

      <li className={
        cn('pagination__page-item pagination__page-item--next-page', {
          'pagination__page-item--inActive': gamePaginationPage === totalPages,
        })}
      >
        <a
          className="pagination__page-link"
          aria-disabled={gamePaginationPage === totalPages}
          onClick={() => handlePageChange(gamePaginationPage + 1)}
        >
        </a>
      </li>
    </ul>
  );
};
