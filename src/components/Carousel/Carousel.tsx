import React, { useRef } from 'react';

import './Carousel.scss';
import { GameInfo } from '../GameInfo/GameInfo';
import { Game } from '../../types/Game';

interface Props {
  title: string;
  description: string;
  games: Game[];
}

export const Carousel: React.FC<Props> = ({ title, description, games }) => {
    const listRef = useRef<HTMLDivElement | null>(null);
   
    const handlePrevClick = () => {
      if (listRef.current) {
        listRef.current.scrollLeft -= 250;
      }
    };
  
    const handleNextClick = () => {
      if (listRef.current) {
        listRef.current.scrollLeft += 250;
      }
    };

    const correctGamesWord = games.length < 5
      ? 'гри'
      : 'ігор';

    return (
      <div className="carousel">
        <div className="carousel__top">
          <div>
            <h3 className="carousel__title">
              {`${title} - ${games.length} ${correctGamesWord}`}
            </h3>
            <p>{description}</p>
          </div>

          <div className="carousel__slider">
            <button
              className="carousel__button"
              onClick={handlePrevClick}
            >
              <span
                className="
                  carousel__button-icon
                  carousel__button-icon--left"
              ></span>
            </button>
            <button
              className="carousel__button"
              onClick={handleNextClick}
            >
              <span
                className="
                  carousel__button-icon
                  carousel__button-icon--right"
              ></span>
            </button>
          </div>
        </div>
  
        <div className="carousel__content" ref={listRef}>
          <div className="carousel__scroll-wrapper">
            {games.map(game => (
              <GameInfo game={game} index={0} />
            ))}
          </div>
        </div>
      </div>
    );
  };
