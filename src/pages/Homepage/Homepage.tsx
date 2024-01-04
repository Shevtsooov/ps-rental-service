import React, { useEffect } from 'react';
import './Homepage.scss';
import { Slider } from '../../components/Slider/Slider';
import { Carousel } from '../../components/Carousel/Carousel';
import { Loader } from '../../components/Loader/Loader';
import games from '../../data/games.json';

export const Homepage: React.FC = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0, left: 0,
    });
  }, []);

  const sortedGames = games.sort((gA, gB) => {
    const [dayA, monthA, yearA] = gA.releasedOn!.toString().split('/').map(Number);
    const [dayB, monthB, yearB] = gB.releasedOn!.toString().split('/').map(Number);

    if (yearA !== yearB) {
      return yearB - yearA
    }

    if (monthA !== monthB) {
      return  monthB - monthA
    }

    return dayB - dayA
  });


  return (
    <div className="homepage">

      <Slider />

      <div className="homepage__seoBlock">
        <h1 className="homepage__seoBlock__title">Оренда PlayStation у Львові</h1>
        <div className='block'>
          <p className="block__title">
        {`Орендуйте PlayStation для невеликих вечірок, дня народження або щоб просто пограти у FC(FIFA). У нас ви знайдете широкий вибір ігор, обладнання в чудовому стані, зручний каталог та пошук ігор, а також рекомендації від наших менеджерів.\nЗробіть ваші заходи неповторними та яскравими - орендуйте PlayStation у Львові у нас, і кожен момент стане захоплюючим та неймовірним!`}
        </p>
        </div>
      </div>
      
      {games 
        ? (
          <Carousel 
            title="Новинки"
            showNumberOFGames={false}
            description=''
            games={sortedGames.slice(0, 15)}
          />)
        : <Loader />
      }
    </div>
  );
}
