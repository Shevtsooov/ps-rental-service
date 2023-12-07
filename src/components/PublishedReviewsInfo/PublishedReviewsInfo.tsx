import { useState, useEffect } from 'react';
import { Review } from '../../types/Review';
import { User } from '../../types/User';
import './PublishedReviewsInfo.scss';
import { useGetAllUsersQuery } from '../../Redux/RTK_Query/users.service';
import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../../Redux/store';
import { removeActiveReview, setActiveReview } from '../../Redux/Slices/activeReview.slice';

type Props = {
  review: Review,
};

export const PublishedReviewsInfo: React.FC<Props> = ({
  review,
}) => {
  const {
    _id,
    status,
    comment,
    stars,
    userId,
  } = review;
  
  const activeReview = useAppSelector(state => state.activeReview.value);
  const { data: users } = useGetAllUsersQuery();
  const [reviewUser, setreviewUser] = useState<User | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const reviewUser = users?.find(user => user.id === userId);
  
    if (reviewUser) {
      setreviewUser(reviewUser);
    }
  }, [users]);

  const handleactiveReview = (_id: string) => {
    if (activeReview === _id) {
      dispatch(removeActiveReview());
      // setIsModalOpen(false);

      return;
    }

    dispatch(setActiveReview(_id));
  };

  return (
    <div className="publishedReviewsInfo">
      <div className="publishedReviewsInfo__header">
        <div>
          <h3 className="publishedReviewsInfo__owner">
            {reviewUser?.fullName}
          </h3>
          
          <div className='publishedReviewsInfo__stars'>
            <button
              className={cn('publishedReviewsInfo__star', {
                'publishedReviewsInfo__star--active': stars >= 1
              })}
            />

            <button
              className={cn('publishedReviewsInfo__star', {
                'publishedReviewsInfo__star--active': stars >= 2
              })}
            />

            <button
              className={cn('publishedReviewsInfo__star', {
                'publishedReviewsInfo__star--active': stars >= 3
              })}
            />

            <button
              className={cn('publishedReviewsInfo__star', {
                'publishedReviewsInfo__star--active': stars >= 4
              })}
            />

            <button
              className={cn('publishedReviewsInfo__star', {
                'publishedReviewsInfo__star--active': stars >= 5
              })}
            />
          </div>
        </div>
        
        <span
            className={cn('publishedReviewsInfo__arrow', {
              'publishedReviewsInfo__arrow--inActive': !comment,
              'publishedReviewsInfo__arrow--active': activeReview === _id
            })}
            onClick={() => handleactiveReview(_id)}
          />
      </div>

      {comment && activeReview === _id && (
        <div
          className={cn('publishedReviewsInfo__allInfo', {
            'publishedReviewsInfo__allInfo--active': activeReview === _id
          })}
        >
          
            <div className='publishedReviewsInfo__clientComment'>
              <p className='publishedReviewsInfo__clientComment--text'>
                <em>
                  {`"${comment}"`}
                </em>
              </p>
            </div>
        </div>
      )}

    </div>
  );
}
