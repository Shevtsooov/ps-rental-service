import React, { useEffect } from 'react';
import './Homepage.scss';
import { Slider } from '../../components/Slider/Slider';
import { BookPS } from '../../components/BookPS/BookPS';
// import { AboutPS5 } from '../../components/AboutPS5/AboutPS5';
import { Carousel } from '../../components/Carousel/Carousel';
import { useGetAllGamesQuery } from '../../Redux/RTK_Query/games.service';
import { Loader } from '../../components/Loader/Loader';
import { Aaa } from '../../components/111/111';
import { Calendar } from '../../components/Calendar/Calendar';
import { PublishedReviews } from '../../components/PublishedReviews/PublishedReviews';
import { useGetAllReviewsQuery } from '../../Redux/RTK_Query/reviews.service';
import { Slider1 } from '../../components/Slider1/Slider1';

export const Homepage: React.FC = () => {
  const { data: games } = useGetAllGamesQuery();
  const { data: reviews } = useGetAllReviewsQuery();

  const publishedReviews = reviews?.filter(review => (
    review.status === 'Опублікований'
  ));

  useEffect(() => {
    window.scrollTo({
      top: 0, left: 0,
    });
  }, []);

  const sortedGames = games?.slice(0, 15);

  return (
    <div className="homepage">

      {/* <Slider1 /> */}

      <Slider />

      {/* <Aaa /> */}

      <h2 className="homepage__title">Перевір свої дати</h2>

      <Calendar />

      <div className="homepage__seoBlock">
        <h1 className="homepage__seoBlock__title">Оренда PlayStation у Львові</h1>
        <p className="homepage__seoBlock__description">
        {`Орендуйте PlayStation для невеликих вечірок, дня народження або щоб просто пограти у FC(FIFA). У нас ви знайдете широкий вибір ігор, обладнання в чудовому стані, зручний каталог та пошук ігор, а також рекомендації від наших менеджерів.
        \nЗробіть ваші заходи неповторними та яскравими - орендуйте PlayStation у Львові у нас, і кожен момент стане захоплюючим та неймовірним!`}
        </p>
      </div>

      <BookPS />
      
      {games 
        ? (
          <Carousel 
            title="Новинки"
            showNumberOFGames={false}
            description=''
            games={sortedGames}
          />)
        : <Loader />
      }

      {publishedReviews && publishedReviews?.length > 0 && (
        <PublishedReviews />
      )}
      

      {/* <AboutPS5 /> */}
    </div>
  );
}
