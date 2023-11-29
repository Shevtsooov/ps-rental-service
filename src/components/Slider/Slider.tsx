import './Slider.scss';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

const posters = [
  {
    title: 'Spider-Man: Miles Morales',
    description: 'Станьте частиною Спайдервсесвіту у Marvel\'s Spider-Man: Miles Morales!',
    image: 'https://m.media-amazon.com/images/S/aplus-media/vc/7e789534-7bf9-4b77-88a4-a493e189ac20.__CR0,0,800,600_PT0_SX800_V1___.jpg',
    bgColor: '#4a0304',
    link: '/games/marvels-spider-man-miles-morales-ps4-ps5'
  },
  {
    title: 'FIFA 23',
    description: 'Завдяки реалістичній графіці, ви зануритесь в атмосферу гри!',
    image: 'https://w0.peakpx.com/wallpaper/120/566/HD-wallpaper-fifa-23-paris-saint-germain-games-fifa23.jpg',
    bgColor: '#c2c2c2',
    link: '/games/fifa-23'
  },
  {
    title: 'God of War',
    description: 'Стати богом не так легко.',
    image: 'https://videogames.si.com/.image/ar_16:9%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTkzNjAwNTg5MDA2NTEzNjQ4/god-of-war-ragnarok-kratos.jpg',
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

  const handlePreviousPoster = () => {
    if (index === 0) {
      setIndex(posters.length - 1);

      return;
    }

    setIndex((prevIndex) => prevIndex - 1);
  }

  const handleNextPoster = () => {
    if (index === posters.length - 1) {
      setIndex(0);
      
      return;
    }

    setIndex((prevIndex) => prevIndex + 1);
  }

  return (
    <div className="slider">
      <button
        className="slider__button slider__button--previous"
        onClick={handlePreviousPoster}
      />
      <button
        className="slider__button slider__button--next"
        onClick={handleNextPoster}
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
