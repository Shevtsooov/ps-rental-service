import './Slider.scss';
import { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';

const posters = [
  {
    title: 'FC24',
    description: 'Завдяки реалістичній графіці, ви зануритесь в атмосферу гри!',
    image: 'https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2023/07/ea-sports-fc-24-haaland-3084268.jpg?tf=3840x',
    bgColor: '#c2c2c2',
    link: '/games/fc-24'
  },
  {
    title: 'Mortal Kombat 11',
    description: 'Чи зможете ви стати справжнім майстром бойових мистецтв?',
    image: 'https://images.hdqwalls.com/download/2020-mortal-kombat-11-4k-ag-1280x720.jpg',
    bgColor: '#c2c2c2',
    link: '/games/mortal-kombat-11'
  },
  {
    title: 'Spider-Man: Miles Morales',
    description: 'Станьте частиною Спайдервсесвіту у Marvel\'s Spider-Man: Miles Morales!',
    image: 'https://sm.pcmag.com/t/pcmag_au/news/c/can-your-p/can-your-pc-run-spider-man-remastered_w245.1200.jpg',
    bgColor: '#4a0304',
    link: '/games/marvels-spider-man-miles-morales-ps4-ps5'
  },
  {
    title: 'God of War',
    description: 'Стати богом не так легко.',
    image: 'https://cdn.vox-cdn.com/thumbor/sM8BpfT8YCXPqL5IHGZSrjGU0eE=/0x0:1600x987/2400x1356/filters:focal(800x494:801x495)/cdn.vox-cdn.com/uploads/chorus_asset/file/11578187/god27.jpg',
    bgColor: '#c2c2c2',
    link: '/games/god-of-war'
  },
  {
    title: 'It Takes Two',
    description: 'Будь ласка, тільки не сваріться!',
    image: 'https://mms.businesswire.com/media/20210326005331/en/867516/5/IT2-Key-Art-Standard-Logo-Horizontal-4K_%281%29.jpg',
    bgColor: '#c2c2c2',
    link: '/games/it-takes-two'
  },
];

export const Slider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % posters.length);
    }, 4000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const handlePreviousPoster = () => {
    if (currentIndex === 0) {
      setCurrentIndex(posters.length - 1);
    } else {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const handleNextPoster = () => {
    if (currentIndex === posters.length - 1) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

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
            ${currentIndex === i
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

      <div className="slider__dots">
        {posters.map((poster, index) => (
          <span
            key={index}
            className={`slider__dot ${index === currentIndex ? 'slider__dot--active-dot' : ''}`}
            onClick={() => handleDotClick(index)}
          ></span>
        ))}
      </div>

    </div>
  );
};
