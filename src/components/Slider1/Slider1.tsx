import React, { useState, useEffect } from 'react';
import './Slider1.scss';

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


export const Slider1: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = posters.map(poster => poster.image)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="slider-container">
      <button className="slider-button" onClick={prevSlide}>
        &lt;
      </button>
      <div className="slider">
        {images.map((image, index) => (
          <div
            key={index}
            className={`slide ${index === currentIndex ? 'active' : ''}`}
            style={{ backgroundImage: `url(${image})` }}
          ></div>
        ))}
      </div>
      <button className="slider-button" onClick={nextSlide}>
        &gt;
      </button>
      <div className="dots">
        {images.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentIndex ? 'active-dot' : ''}`}
            onClick={() => handleDotClick(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};
