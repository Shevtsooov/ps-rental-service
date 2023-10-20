import React from 'react';
import './Homepage.scss';
import { Slider } from '../../components/Slider/Slider';
import { BookPS } from '../../components/BookPS/BookPS';
import { AboutPS5 } from '../../components/AboutPS5/AboutPS5';
import games from '../../data/games.json'
import { Aaa } from '../../components/111/111';
import { Carousel } from '../../components/Carousel/Carousel';

export const Homepage: React.FC = () => {
  // let categories: string[] = [];

  const addd = games.map(game => game.players)

  const catSet = new Set(addd);

  const fff = Array.from(catSet)

  // const allTheCategories = [
  //   'Пригоди',
  //   'Платформери',
  //   'Екшн',
  //   'Бійки',
  //   'Кооперативні',
  //   'Симулятори',
  //   'Головоломки',
  //   'Шутери',
  //   'Космос',
  //   'Рольові',
  //   'Сімейні',
  //   'Стратегії',
  //   'Аркади',
  //   'Спортивні',
  //   'Відкритий світ',
  //   'Гонки',
  //   'Музика',
  //   'Риболовля',
  //   'Дитячі',
  //   'Ретро',
  //   'Кіберпанк',
  //   'Жахи',
  //   'Настільні',
  //   'Детективи',
  //   'Виживання',
  //   "Для нього та для неї"
  // ]

  const sortedGames = games
  .sort((gameA, gameB) => (
    gameB.popularity - gameA.popularity
  ))
  .slice(0, 15);

  return (
    <div className="homepage">
      <Slider />
{/* 
      {fff.sort().map(year => (
        <li>{`'${year}',`}</li>
      ))} */}

      {/* <Aaa /> */}

      <BookPS />

      <Carousel 
        title="Вибір гравців"
        showNumberOFGames={false}
        description={`ТОП-${sortedGames.length} ігор, які замовляють найчастіше`}
        games={sortedGames}
      />

      <AboutPS5 />
    </div>
  );
}
