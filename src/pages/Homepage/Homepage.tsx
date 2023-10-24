import React from 'react';
import './Homepage.scss';
import { Slider } from '../../components/Slider/Slider';
import { BookPS } from '../../components/BookPS/BookPS';
import { AboutPS5 } from '../../components/AboutPS5/AboutPS5';
import { Carousel } from '../../components/Carousel/Carousel';
import { useGetAllGamesQuery } from '../../Redux/RTK_Query/games.service';
import { Loader } from '../../components/Loader/Loader';
import { Aaa } from '../../components/111/111';

export const Homepage: React.FC = () => {
  const { data: games } = useGetAllGamesQuery();

  const sortedGames = games?.slice(0, 15);

  // sort((gameA, gameB) => (
  //   gameB.popularity - gameA.popularity
  // ));

  return (
    <div className="homepage">
      <Slider />

      <BookPS />

      {/* <Aaa /> */}
      
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

      <AboutPS5 />
    </div>
  );
}
