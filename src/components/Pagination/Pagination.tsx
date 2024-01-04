import React from 'react';
import cn from 'classnames';
import './Pagination.scss';
import {
  generateVisiblePages,
} from '../../helpers/generateVisiblePages';
import { useAppDispatch } from '../../Redux/store';

/* eslint-disable */
interface Props {
  paginationPage: number,
  setPaginationPage: (page: number) => void,
  total: number,
  perPage: number,
};

export const Pagination: React.FC<Props> = ({
  paginationPage,
  setPaginationPage,
  total,
  perPage,
}) => {
  // const paginationPage = useAppSelector(state => state.paginationPage.value);
  const dispatch = useAppDispatch();
  
  const totalPages = Math.ceil(total / perPage);
  const visiblePages = generateVisiblePages(
    paginationPage,
    totalPages,
    6, // this number defines the number of shown numbers in pagination(length of pagination)
  );

  const handlePageChange = (page: number) => {
    if (paginationPage !== page && page >= 1 && page <= totalPages) {
      setPaginationPage(page);

      window.scrollTo({
        top: 60, left: 0, behavior: 'smooth'
      });
    }
  };

  return (
    <ul className="pagination">
      <li className={
        cn('pagination__page-item pagination__page-item--prev-page', {
          'pagination__page-item--inActive': paginationPage <= 1,
        })}
      >
        <a
          className="pagination__page-link"
          aria-disabled={paginationPage === 1}
          onClick={() => handlePageChange(paginationPage - 1)}
        >
        </a>
      </li>
      {visiblePages.map(page => (
        <li
          className={cn('pagination__page-item', {
            'pagination__page-item--active': paginationPage === page,
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
          'pagination__page-item--inActive': paginationPage === totalPages,
        })}
      >
        <a
          className="pagination__page-link"
          aria-disabled={paginationPage === totalPages}
          onClick={() => handlePageChange(paginationPage + 1)}
        >
        </a>
      </li>
    </ul>
  );
};
