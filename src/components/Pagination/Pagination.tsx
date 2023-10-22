import React from 'react';
import cn from 'classnames';
import './Pagination.scss';
import {
  generateVisiblePages,
} from '../../helpers/generateVisiblePages';
import { useAppDispatch, useAppSelector } from '../../Redux/store';
import { setPaginationPage } from '../../Redux/Slices/paginationPage.slice';

/* eslint-disable */
interface Props {
  total: number,
  perPage: number,
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
}) => {
  const paginationPage = useAppSelector(state => state.paginationPage.value);
  const dispatch = useAppDispatch();
  
  const totalPages = Math.ceil(total / perPage);
  const visiblePages = generateVisiblePages(
    paginationPage,
    totalPages,
    8, // this number defines the number of shown numbers in pagination(length of pagination)
  );

  const handlePageChange = (page: number) => {
    if (paginationPage !== page && page >= 1 && page <= totalPages) {
      dispatch(setPaginationPage(page));

      window.scrollTo({
        top: 0,
        behavior: 'smooth',
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
            // href={`#${page}`}
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
          // href="#next"
          aria-disabled={paginationPage === totalPages}
          onClick={() => handlePageChange(paginationPage + 1)}
        >
        </a>
      </li>
    </ul>
  );
};
