import './Slider.scss';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

const posters = [
  {
    title: 'Spider-Man: Miles Morales',
    description: 'Станьте частиною Спайдервсесвіту у Marvel\'s Spider-Man: Miles Morales!',
    image: 'https://www.godisageek.com/wp-content/uploads/Miles-Morales-review.jpg',
    bgColor: '#4a0304',
    link: '/games/marvels-spider-man-miles-morales-ps4-ps5'
  },
  {
    title: 'FIFA 23',
    description: 'Завдяки реалістичній графіці, ви зануритесь в атмосферу гри!',
    image: 'https://assets.beartai.com/uploads/2023/02/fifa-23-image-11.jpg',
    bgColor: '#c2c2c2',
    link: '/games/fifa-23'
  },
  {
    title: 'God of War',
    description: 'Стати богом не так легко.',
    image: 'https://3238leblogdemarvelll-1278.kxcdn.com/wp-content/uploads/2018/05/god-of-war-2018-kratos-atreus.jpg',
    bgColor: '#c2c2c2',
    link: '/games/god-of-war'
  },
];

export const Slider: React.FC = () => {
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    const timerId = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % posters.length);
    }, 3000);

    // Cleanup the interval on unmount
    return () => {
      clearInterval(timerId);
    };
  }, []);

  return (
    <div className="slider">
      <button
        className="slider__button slider__button--previous"
        onClick={() => setIndex((prevIndex) => (prevIndex - 1) % posters.length)}
      />
      <button
        className="slider__button slider__button--next"
        onClick={() => setIndex((prevIndex) => (prevIndex + 1) % posters.length)}
      />
      {posters.map((poster, i) => (
        <div 
          className={`slider__poster
            ${index === i
              ? ''
              : 'slider__poster-hidden'}`
          }
          style={{ background: `${poster.bgColor}`}}
          key={poster.title}
        >
          <img
            className="slider__poster_image"
            src={poster.image}
            alt={`${poster.title}`}
          />
          <div className="slider__poster_info">
            <h1 className="slider__poster_heading">{poster.title}</h1>
            <p className="slider__poster_description">{poster.description}</p>
            <NavLink 
              className="slider__poster_button"
              to={poster.link}
            >
              До гри
            </NavLink>
          </div>
        </div>
      ))}
    </div>
  );
};
