import './Slider.scss';
import spiderMan from '../../assets/images/spider-man.png'
import fifa23 from '../../assets/images/fifa-23.jpg'
import cyberpunk from '../../assets/images/cyberpunk.jpg'
import { useEffect, useState } from 'react';

const posters = [
  {
    title: 'Spider Man 2',
    description: 'Пітер Паркер та Майлз Моралес повертаються у новій захоплюючій пригоді! Наступна частина франшизи "Marvel\'s"',
    image: spiderMan,
    bgColor: '#4a0304'
  },
  {
    title: 'FIFA 23',
    description: 'FIFA FIFA FIFA FIFA FIFA FIFA FIFA FIFA FIFA FIFA FIFA FIFA FIFA FIFA FIFA ',
    image: fifa23,
    bgColor: '#c2c2c2'
  },
  {
    title: 'Cyberpunk',
    description: 'Cyberpunk Cyberpunk Cyberpunk Cyberpunk Cyberpunk Cyberpunk Cyberpunk Cyberpunk Cyberpunk Cyberpunk Cyberpunk Cyberpunk Cyberpunk ',
    image: cyberpunk,
    bgColor: '#c2c2c2'
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
            <button className="slider__poster_button">До гри</button>
          </div>
        </div>
      ))}
    </div>
  );
};
