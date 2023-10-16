import React from 'react';
import './Homepage.scss';
import { Slider } from '../../components/Slider/Slider';
import { BookPS } from '../../components/BookPS/BookPS';
import { PopularGames } from '../../components/PopularGames/PopularGames';
import { AboutPS5 } from '../../components/AboutPS5/AboutPS5';
import games from '../../data/games.json'
import { Aaa } from '../../components/111/111';
import { Carousel } from '../../components/Carousel/Carousel';

export const Homepage: React.FC = () => {
  // let categories: string[] = [];

  // const addd = games.map(game => game.category.map(cat =>
  //   categories.push(cat)
  // ))

  // const catSet = new Set(categories);

  // const fff = Array.from(catSet)

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
  //   'Жахи',
  //   'Настільні',
  //   'Детективи',
  //   'Виживання',
  //   "Для нього та для неї"
  // ]

  return (
    <div className="homepage">
      <Slider />

      {/* <Carousel title={'Колекція'} /> */}
      
      <Aaa />.

      {/* <div>
        <ul>
          {fff.map(game => (
            <li>{game}</li>
            // <img src={`${game.poster}`} alt="" className='aaa'/>
          ))}
        </ul>
      </div> */}

      <BookPS />

      <PopularGames />

      <AboutPS5 />
    </div>
  );
}
