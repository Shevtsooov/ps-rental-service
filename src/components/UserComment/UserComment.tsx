import './UserComment.scss';
import comment from '../../assets/images/comment.png'
import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../Redux/store';
import { resetUserComment, setUserComment } from '../../Redux/Slices/userComment.slice';

export const UserComment: React.FC = () => {
  const userComment = useAppSelector(state => state.userComment.value);
  const dispatch = useAppDispatch();
  const [isCommentShown, setIsCommentShown] = useState(false);

  const handleShowComment = () => {
    setIsCommentShown(true);
  };

  const handleHideComment = () => {
    setIsCommentShown(false);
    dispatch(resetUserComment());
  };

  const handleAddComment = (comment: string) => {
    dispatch(setUserComment(comment));
  };

  const handleClearComment = () => {
    dispatch(resetUserComment());
  };

  return (
    <div className="comment">
      {isCommentShown || userComment !== ''
        ? (
            <div className='comment__comment'>
              <h5 className='comment__comment_title'>Коментар:</h5>
              <textarea
                className='comment__comment_input'
                value={userComment}
                onChange={(e) => handleAddComment(e.target.value)}
              />

            {userComment !== '' && (
              <button
                className='comment__comment--clear'
                onClick={handleClearComment}
              />
            )}

              <button
                className='comment__comment--hide'
                onClick={handleHideComment}
              >
                Видалити коментар
              </button>
            </div>
        )
        : (
          <> 
            <div className="comment__img">
              <img
                src={comment}
                alt="Коментар"
                className="comment__img_icon"
              />
            </div>
            
            <div className="comment__info">
              <p className="comment__info_heading">Коментар</p>

                <button
                  className='comment__userComment'
                  onClick={handleShowComment}
                >
                  Додати коментар
                </button>
            </div>
          </>
        )
      }
    </div>
  );
}
