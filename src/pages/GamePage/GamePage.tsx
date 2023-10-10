import React, { useEffect, useRef } from 'react';
import './GamePage.scss';
import { useParams } from 'react-router-dom';
import games from '../../data/games.json'
import parse from 'html-react-parser';
import cn from 'classnames';
import { filterSavedGames, setSavedGames } from '../../Redux/Slices/savedGames.slice';
import { filterShoppingCartGames, setShoppingCartGames } from '../../Redux/Slices/shoppingCartGames.slice';
import { useAppSelector, useAppDispatch } from '../../Redux/store';
import { Game } from '../../types/Game';

export const GamePage: React.FC = () => {
  const { gameIdLink } = useParams();

  // THIS BLOCK ENSURES THE PAGE OPEN FROM THE TOP
  const topContainer = useRef<null | HTMLDivElement>(null); 

  useEffect(() => {
    topContainer.current?.scrollIntoView({ block: "start" });
    }, []);

  const savedGames = useAppSelector(state => state.savedGames.value);
  const shoppingCartGames = useAppSelector(state => state.shoppingCartGames.value);
  const dispatch = useAppDispatch();

  const handleSaveGame = (game: Game) => {
    if (savedGames.includes(game)) {
      dispatch(filterSavedGames(game.gameId));
      console.log('includes')
      return;
    }

    dispatch(setSavedGames(game));
  }

  const handleAddToCartGame = (game: Game) => {
    if (shoppingCartGames.includes(game)) {
      dispatch(filterShoppingCartGames(game.gameId));

      return;
    }

    dispatch(setShoppingCartGames(game));
  }
  
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

      <div className="game_page__release">
        {`Дата релізу: ${game?.releasedOn}`}
      </div>

      {game && (
        <>
          <div className="game_page__price">
          {shoppingCartGames.length === 0 || shoppingCartGames[0].gameId === game.gameId
            ? (
              <p className='game_page__price_discountedPrice'>Одна гра - безкоштовно</p>
            )
            : (
              <>
                <p 
                className={cn({
                  'game_page__price_regularPrice': game.discountedPrice
                })}
                >
                  {`${game.price}₴`}
                </p>
                {game.discountedPrice && (
                  <p className="game_page__price_discountedPrice">{`${game.discountedPrice}₴`}</p>
                )}
              </>
            )}
          </div>
          
          <div className="game_page_buttons">
            <button 
              className={cn('game_page_buttons_cart', {
                'game_page_buttons_cart--added': shoppingCartGames.includes(game)
              })}
              onClick={() => handleAddToCartGame(game)}
            >
              {shoppingCartGames.includes(game)
              ? 'видалити'
              : 'додати в кошик'}
            </button>
            <button
              className={cn('game_page_buttons_heart', {
                'game_page_buttons_heart--active': savedGames.includes(game)
              })}
              onClick={() => handleSaveGame(game)}
            />
          </div>
        </>
      )}

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
    </div>
  );
}
