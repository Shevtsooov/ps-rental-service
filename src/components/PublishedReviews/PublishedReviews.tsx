import { useRef } from 'react';
import { useGetAllReviewsQuery } from '../../Redux/RTK_Query/reviews.service';
import { PublishedReviewsInfo } from '../PublishedReviewsInfo/PublishedReviewsInfo';
import './PublishedReviews.scss';

export const PublishedReviews: React.FC = () => {
  const { data: reviews } = useGetAllReviewsQuery();

  const publishedReviews = reviews?.filter(review => (
    review.status === 'Опублікований'
  ));

  const listRef = useRef<HTMLDivElement | null>(null);
   
  const handlePrevClick = () => {
    if (listRef.current) {
      listRef.current.scrollLeft -= 250;
    }
  };

  const handleNextClick = () => {
    if (listRef.current) {
      listRef.current.scrollLeft += 250;
    }
  };
  
  return (
    <div className='publishedReviews'>
      <div className='publishedReviews__block'>
        <h4 className='publishedReviews__title'>Відгуки наших клієнтів</h4>
        <div className="carousel__slider">
          <button
            className="carousel__button"
            onClick={handlePrevClick}
          >
            <span
              className="
                carousel__button-icon
                carousel__button-icon--left"
            ></span>
          </button>
          <button
            className="carousel__button"
            onClick={handleNextClick}
          >
            <span
              className="
                carousel__button-icon
                carousel__button-icon--right"
            ></span>
          </button>
        </div>
      </div>
      
      <div className="publishedReviews__content" ref={listRef}>
        <div className="publishedReviews__scroll-wrapper">
          {publishedReviews?.map(review => (
            <PublishedReviewsInfo review={review} key={review._id} />
          ))}
        </div>
      </div>

    </div>
  );
}
