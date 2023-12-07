import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './FeedbackPage.scss';
import { useGetAllUsersQuery } from '../../Redux/RTK_Query/users.service';
import { Loader } from '../../components/Loader/Loader';
import thankYou from '../../assets/gifs/thankYou.gif'
import { FeedbackBlock } from '../../components/FeedbackBlock/FeedbackBlock';
import { useAddReviewMutation } from '../../Redux/RTK_Query/reviews.service';
import { customRound } from '../../helpers/customRound';

const noErrors = {
  isAnyError: false,
  noProcess: false,
  noDelivery: false,
  noQuality: false,
  noCatalog: false,
  noComfort: false,
  noCommunication: false,
};

export const FeedbackPage = () => {
  const [process, setProcess] = useState<number | null>(null);
  const [delivery, setDelivery] = useState<number | null>(null);
  const [quality, setQuality] = useState<number | null>(null);
  const [catalog, setCatalog] = useState<number | null>(null);
  const [comfort, setComfort] = useState<number | null>(null);
  const [communication, setCommunication] = useState<number | null>(null);
  const [comment, setComment] = useState('');

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [isResult, setIsResult] = useState(false);

  const { data: users } = useGetAllUsersQuery();
  const [ addReview, isSuccess ] = useAddReviewMutation();

  const { reviewLink } = useParams<{ reviewLink: string }>();

  const [error, setError] = useState(noErrors);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    if (users) {
      const isSuchUser = users?.find(user => (
        user.reviewLink === reviewLink
      ));
  
      if (isSuchUser) {
        setCurrentUserId(isSuchUser.id);

        return;
      } else {
        navigate('/');
      }
    }
  }, [reviewLink, users]);

if (process && delivery && quality && catalog && comfort && communication) {
  const average = (process + delivery + quality + catalog + comfort + communication) / 6;

    const customRound = (number: number) => {
      let decimalPart = number - Math.floor(number);
  
      if (decimalPart >= 0.5) {
          return Math.ceil(number);
      } else {
          return Math.floor(number);
      }
  }

    console.log('average - ', customRound(average))
}



  const handlePostFeedback = async () => {

    const anyError = !process
      || !delivery
      || !quality
      || !catalog
      || !comfort
      || !communication;

    if (anyError) {



      if (anyError) {
        setError(error => ({
          ...error,
          isAnyError: true
        }));
      }

      if (!process) {
        setError(error => ({
          ...error,
          noProcess: true
        }));
      }

      if (!delivery) {
        setError(error => ({
          ...error,
          noDelivery: true
        }));
      }

      if (!quality) {
        setError(error => ({
          ...error,
          noQuality: true
        }));
      }

      if (!catalog) {
        setError(error => ({
          ...error,
          noCatalog: true
        }));
      }

      if (!comfort) {
        setError(error => ({
          ...error,
          noComfort: true
        }));
      }

      if (!communication) {
        setError(error => ({
          ...error,
          noCommunication: true
        }));
      }

      setTimeout(() => {
        setError(noErrors);
      }, 3000);

      return;
    }

  const average = (process + delivery + quality + catalog + comfort + communication) / 6;

    try {
      setIsLoading(true);

      if (currentUserId) {
        await addReview({
          userId: currentUserId,
          stars: customRound(average),
          comment,
        });
      }

      if (isSuccess) {
        setIsLoading(false);
        window.scrollTo({
          top: 0, left: 0,
        });
        document.body.style.overflow = 'hidden';

        setIsResult(true);
      }

    } catch (error: any) {
      console.error('Review sending failed:', error);
    }
  };

  const closeModal = () => {
    document.body.style.overflow = 'auto'
    setIsResult(false);
    navigate('/');
  }

  return (
    <>
      {isResult && (
        <div
          className='feedback__modal'
        >
          <img
            src={thankYou}
            alt=""
            className="feedback__modal__img"
          />
          <h4>Дякуємо за відгук</h4>
          <p>Скоро цей відгук з'явиться на сайті</p>

          <button
            className="feedback__modal__button"
            onClick={closeModal}
          >
            OK
          </button>
        </div>
      )}

      <div className="feedback">
        <h1 className="feedback__title">
          Відгук
        </h1>
        <p className="feedback__description">Будь ласка, оцініть наш сервіс.</p>

        {isLoading
          ? <Loader />
          : (
            <>
              <FeedbackBlock
                title="Процес оренди"
                description="Наскільки легким був процес оренди?"
                value={process}
                setValue={setProcess}
                isError={error.noProcess}

              />

              <FeedbackBlock
                title="Доставка та налаштування"
                description="Оцініть процес доставки та налаштування PlayStation."
                value={delivery}
                setValue={setDelivery}
                isError={error.noDelivery}

              />

              <FeedbackBlock
                title="Якість та стан PlayStation"
                description="Поділіться своїми враженнями від якості та стану PlayStation."
                value={quality}
                setValue={setQuality}
                isError={error.noQuality}

              />

              <FeedbackBlock
                title="Каталог ігор"
                description="Наскільки ви задоволені наявним каталогом ігор?"
                value={catalog}
                setValue={setCatalog}
                isError={error.noCatalog}

              />

              <FeedbackBlock
                title="Зручність вибору"
                description="Чи швидко ви знайшли те, що шукали?"
                value={comfort}
                setValue={setComfort}
                isError={error.noComfort}
              />

              <FeedbackBlock
                title="Спілкування з менеджерами"
                description="Оцініть спілкування та домопогу від наших менеджерів."
                value={communication}
                setValue={setCommunication}
                isError={error.noCommunication}
              />

              <div className='feedback__comment'>
                <h3 className='feedback__comment__title'>
                  Коментар
                </h3>

                <p className='feedback__comment__description'>Поділіться враженнями, додайте рекомендації</p>


                <textarea
                  className='feedback__comment__input'
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />

                {comment !== '' && (
                  <button
                    className='feedback__comment--clear'
                    onClick={() => setComment('')}
                  />
                )}
                
              </div>

              <div className="feedback__actions">
                {error.isAnyError && (
                  <p className="feedback__actions__error">Будь ласка, оцініть всі пункти</p>
                )}
                <button
                  className="feedback__actions_button"
                  onClick={handlePostFeedback}
                >
                  Відправити
                </button>
              </div>
            </>
          )}
      </div>
    </>
  );
};
