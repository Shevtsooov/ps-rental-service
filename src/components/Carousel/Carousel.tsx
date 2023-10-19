import React, { useEffect, useRef, useState } from 'react';
import games from '../../data/games.json'

import './Carousel.scss';
import { GameInfo } from '../GameInfo/GameInfo';
import { Game } from '../../types/Game';

interface Props {
  title: string;
  gameId: string;
}

export const Carousel: React.FC<Props> = ({ title, gameId }) => {
    const listRef = useRef<HTMLDivElement | null>(null);
    const [collectionGames, setCollectionGames] = useState<Game[]>([])

    useEffect(() => {
      const currentGame = games.find(game => game.gameId === gameId);
      setCollectionGames(games.filter(game => (
        game.collection === currentGame?.collection
      )))
    }, []);


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

    const correctGamesWord = collectionGames.length < 5
      ? 'гри'
      : 'ігор';

    return (
      <div className="carousel">
        <div className="carousel__top">
          <h3 className="carousel__title">
            {`${title} - ${collectionGames.length} ${correctGamesWord}`}
          </h3>
  
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
            {collectionGames.map(game => (
              <GameInfo game={game} index={0} />
            ))}
          </div>
        </div>
      </div>
    );
  };
