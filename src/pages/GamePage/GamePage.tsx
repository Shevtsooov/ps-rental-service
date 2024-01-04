import React, { useEffect, useState } from 'react';
import './GamePage.scss';
import { useParams } from 'react-router-dom';
import parse from 'html-react-parser';
import { Game } from '../../types/Game';
import { Carousel } from '../../components/Carousel/Carousel';
import { Loader } from '../../components/Loader/Loader';
import games from '../../data/games.json';

export const GamePage: React.FC = () => {
  const { gameIdLink } = useParams();
  const [collectionGames, setCollectionGames] = useState<Game[]>([])

  const game = games?.find(g => g.gameId === gameIdLink);

  useEffect(() => {
    window.scrollTo({
      top: 60, left: 0,
    });

    document.title = `Ігри > ${game?.title}`;
  }, []);

  useEffect(() => {
    if (games) {
      setCollectionGames(games?.filter(g => (
        g.collection === game?.collection
      )))
    }
  }, [games]);

  
  const videoReviev = parse(`${game?.videoReview}`);
  const videoGameplay = parse(`${game?.videoGameplay}`);

  return (
    <>
      {game
        ? (
          <div className="game_page">
            <div className="game_page__images">
              <img
                src={`${game?.poster}`}
                alt={`${game?.title}`}
                className='game_page__poster'
                />
      
              {!game?.isAvailable && <div className="game_page--unavailable" />}
      
              <img
                src={`../images/games/${game?.icon}`}
                alt={`${game?.title}`}
                className='game_page__icon'
              />
              <h1 className='game_page__title'>{game?.title}</h1>
            </div>
            
            <div className="game_page__info">
              <p className="game_page__info_title">{`${game?.description}`}</p>
      
              <ul className="game_page__info_categories">
                {game?.category.map(category => (
                  <li className="game_page__info_categories_item">
                    {category}
                  </li>
                ))}
              </ul>
      
              <p className="game_page__info_players">
                {`Кількість гравців: ${game?.players}`}
              </p>
      
              <p className="game_page__info_release">
                {`Дата релізу: ${game?.releasedOn}`}
              </p>
            </div>
      
            {game?.disclaimers && game.disclaimers.length > 0 && (
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
            )}
            
      
            <div className="game_page__video">
              <div>
                <h4 className="game_page__video_title">Трейлер до гри:</h4>
                <div className="game_page__video_frame">
                  {videoReviev}
                </div>
              </div>
      
              <div>
                <h4 className="game_page__video_title">
                  Геймплей та проходження гри:
                </h4>
                <p className="game_page__video_description">
                  Тут можна ознайомитись з геймплеєм гри або ж підглянути, як саме проходити той чи інший рівень
                </p>
                <div className="game_page__video_frame">
                  {videoGameplay}
                </div>
              </div>
            </div>
      
            {game && game.collection !== "" && (
              <Carousel
                title="Колекція"
                showNumberOFGames={true}
                description=''
                games={collectionGames}
              />
            )}
          </div>
        )
      : (
        <div className="game_page__loader">
          <Loader />
        </div>
      )
      }
    </>
  );
}
