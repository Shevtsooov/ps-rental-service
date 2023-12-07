import { Review } from '../../types/Review';
import cn from "classnames";
import './ReviewInfo.scss';
import { removeActiveReview, setActiveReview } from '../../Redux/Slices/activeReview.slice';
import { useAppSelector, useAppDispatch } from '../../Redux/store';
import { useGetAllUsersQuery } from '../../Redux/RTK_Query/users.service';
import { useState, useEffect } from 'react';
import { User } from '../../types/User';
import { useEditReviewMutation, useGetAllReviewsQuery } from '../../Redux/RTK_Query/reviews.service';

type Props = {
  review: Review,
};

export const ReviewInfo: React.FC<Props> = ({ review }) => {
  const {
    _id,
    userId,
    status,
    stars,
    comment,
  } = review;

  const activeReview = useAppSelector(state => state.activeReview.value);
  const [reviewUser, setreviewUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

const { data: users } = useGetAllUsersQuery();
const { data: allTheReviews, refetch } = useGetAllReviewsQuery();
const [ editReview, isSuccess ] = useEditReviewMutation();

useEffect(() => {
  const reviewUser = users?.find(user => user.id === userId);

  if (reviewUser) {
    setreviewUser(reviewUser);
  }
}, [users]);


  const handleactiveReview = (_id: string) => {
    if (activeReview === _id) {
      dispatch(removeActiveReview());
      setIsModalOpen(false);

      return;
    }

    dispatch(setActiveReview(_id));
  };

  const handleToggleModal = (_id: string) => {
    if (activeReview === _id) {
      // dispatch(removeactiveReview());
      setIsModalOpen(state => !state);
      
      return;
    }
    setIsModalOpen(state => !state);
    dispatch(setActiveReview(_id));
  };

  const handleUpdateStatus = async (status: string) => {
    setIsLoading(true);

    try {
      await editReview({
        _id: _id,
        status: status
      })

      if (isSuccess) {
        setIsModalOpen(false);
        
        refetch();
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error)
    }
  };

  return (
    <div
      className={cn("reviewInfo", {
        "reviewInfo--active": activeReview === _id,
      })}
    >

      {isModalOpen && (
        <div
          className='reviewInfo__modal'
          onClick={() => handleToggleModal(_id)}
        >

        </div>
      )}

      {isModalOpen && (
        <div
          className='reviewInfo__modal__box'
          // className={cn('reviewInfo__modal__box', {
          //   'statusModal--isLoading': isLoading
          // })}
        >
          <p
            className={cn('reviewInfo__statusModal reviewInfo__statusModal--onReview', {
              'reviewInfo__statusModal--isInactive': isLoading || status === 'На перегляді'
            })}
            onClick={() => handleUpdateStatus('На перегляді')}
          >На перегляді</p>

          <p
            className={cn('reviewInfo__statusModal reviewInfo__statusModal--published', {
              'reviewInfo__statusModal--isInactive': isLoading || status === 'Опублікований'

            })}
            onClick={() => handleUpdateStatus('Опублікований')}
          >Опублікований</p>
        </div>
      )}

      <div className="reviewInfo__header">
        
        <div className='reviewInfo__stars'>
          <button
            className={cn('reviewInfo__star', {
              'reviewInfo__star--active': stars >= 1
            })}
          />

          <button
            className={cn('reviewInfo__star', {
              'reviewInfo__star--active': stars >= 2
            })}
          />

          <button
            className={cn('reviewInfo__star', {
              'reviewInfo__star--active': stars >= 3
            })}
          />

          <button
            className={cn('reviewInfo__star', {
              'reviewInfo__star--active': stars >= 4
            })}
          />

          <button
            className={cn('reviewInfo__star', {
              'reviewInfo__star--active': stars >= 5
            })}
          />
        </div>

        <div className="reviewInfo__firstBlock">
          <p
            className={cn('reviewInfo__status', {
              'reviewInfo__status--onReview': status === 'На перегляді',
              'reviewInfo__status--published': status === 'Опублікований',
            })}
            onClick={() => handleToggleModal(_id)}
          >
            {status}
          </p>
          
          <span
            className={cn('reviewInfo__arrow', {
              'reviewInfo__arrow--active': activeReview === _id
            })}
            onClick={() => handleactiveReview(_id)}
          />
        </div>
      </div>

      <div
        className={cn('allInfo', {
          'allInfo--active': activeReview === _id
        })}
      >
        <div className='allInfo__client'>
          <p>{reviewUser?.fullName}</p>
          <a
            href={`tel:+38${reviewUser?.phoneNumber}`}
            className='reviewInfo__phoneNumber'
          >
            {`+38${reviewUser?.phoneNumber}`}
          </a>
        </div>

        {comment && (
          <div className='reviewInfo__clientComment'>
            <p className='reviewInfo__clientComment--title'>Коментар:</p>
            <p className='reviewInfo__clientComment--text'>
              <em>
                {`"${comment}"`}
              </em>
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
