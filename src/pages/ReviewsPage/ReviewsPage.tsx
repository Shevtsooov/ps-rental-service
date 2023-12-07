import React, { useEffect, useState } from 'react';
import './ReviewsPage.scss';
import { Pagination } from '../../components/Pagination/Pagination';
import { Loader } from '../../components/Loader/Loader';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../Redux/store';
import { refreshTokenService } from '../../helpers/refreshTokenService';
import { useGetAllReviewsQuery } from '../../Redux/RTK_Query/reviews.service';
import { ReviewInfo } from '../../components/ReviewInfo/ReviewInfo';


export const ReviewsPage: React.FC = () => {
  const {data: allTheReviews} = useGetAllReviewsQuery();
  const user = useAppSelector(state => state.user.value);

  const [paginationPage, setPaginationPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(0)
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({
      top: 0, left: 0,
    });
  }, []);

  const reviewsToShow = allTheReviews?.slice(start, end);

  useEffect(() => {
    if (allTheReviews) {
      setStart(perPage * paginationPage - perPage);

      const end = perPage * paginationPage <= allTheReviews?.length
        ? perPage * paginationPage
        : allTheReviews.length;

      setEnd(end)
    }
  }, [paginationPage, allTheReviews, perPage]);

  const showPagination = (allTheReviews && allTheReviews.length <= perPage) 
  || allTheReviews?.length === 0;

  useEffect(() => {
    if (!refreshTokenService.get() || (user && user?.role === 'user')) {
      navigate('/');
    }
  }, [user]);

  return (
    <>
      {user
        ? (
          <div className="reviewsPage">
            <h1 className="reviewsPage__title">Відгуки</h1>
      
            {allTheReviews
              ? (
                <>
                  <p className="reviewsPage__amount">
                    {`Кількість відгуків: ${allTheReviews?.length}`}
                  </p>
      
                  <div className='reviewsPage__list'>
                    {reviewsToShow?.map(review => (
                      <ReviewInfo review={review} key={review._id} />
                    ))}
                  </div>
                </>
              )
              : <Loader />
            }
            
      
            {!showPagination && allTheReviews && (
              <Pagination
                paginationPage={paginationPage}
                setPaginationPage={setPaginationPage}
                total={allTheReviews.length}
                perPage={perPage}
              />
            )}
              
          </div>
        )
      : <Loader />
      }
    </>
    
  );
}
