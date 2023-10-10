import React, { useEffect, useRef } from 'react';
import './GamePage.scss';
import { useParams } from 'react-router-dom';
import games from '../../data/games.json'
import parse from 'html-react-parser';

export const GamePage: React.FC = () => {
  const { gameIdLink } = useParams();

  // THIS BLOCK ENSURES THE PAGE OPEN FROM THE TOP
  const topContainer = useRef<null | HTMLDivElement>(null); 

  useEffect(() => {
    topContainer.current?.scrollIntoView({ block: "start" });
    }, []);
  
  const game = games.find(g => g.gameId === gameIdLink);

  const videoReviev = parse(`${game?.videoReview}`);
  const videoGameplay = parse(`${game?.videoGameplay}`);

  return (
    <div className="game_page" ref={topContainer}>
      <div className="game_page__images">
        <img
          src={`${game?.poster}`}
          alt={`${game?.title}`}
          className='game_page__poster'
        />

        <img
          src={`../images/games/${game?.icon}`}
          alt={`${game?.title}`}
          className='game_page__icon'
        />
        <h1 className='game_page__title'>{game?.title}</h1>
      </div>
      
      <div className="game_page__info">
        <p>{`${game?.description}`}</p>
      </div>

      <div className="game_page__disclaimers">
        <h4 className="game_page__disclaimers_title">Настанови та застереження:</h4>
        {game?.disclaimers.map(disclaimer => (
          <p
            className="game_page__disclaimers_item"
            key={disclaimer}
          >
            {`* ${disclaimer}`}
          </p>
        ))}
      </div>

      <div className="game_page__video">
        <div className="game_page__video_frame">
          {videoReviev}
        </div>
          {/* <hr /> */}
        <div className="game_page__video_frame">
          {videoGameplay}
        </div>
      </div>
    </div>
  );
}
