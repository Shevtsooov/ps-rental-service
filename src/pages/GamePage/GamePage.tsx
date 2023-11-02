import React, { useEffect, useRef, useState } from 'react';
import './GamePage.scss';
import { useParams } from 'react-router-dom';
import games from '../../data/games.json'
import parse from 'html-react-parser';
import cn from 'classnames';
import { filterSavedGames, setSavedGames } from '../../Redux/Slices/savedGames.slice';
import { filterShoppingCartGames, setShoppingCartGames } from '../../Redux/Slices/shoppingCartGames.slice';
import { useAppSelector, useAppDispatch } from '../../Redux/store';
import { Game } from '../../types/Game';
import { Carousel } from '../../components/Carousel/Carousel';

export const GamePage: React.FC = () => {
  const { gameIdLink } = useParams();
  const [collectionGames, setCollectionGames] = useState<Game[]>([])
  const game = games.find(g => g.gameId === gameIdLink);
  const user = useAppSelector(state => state.user.value);

  const savedGames = useAppSelector(state => state.savedGames.value);
  const shoppingCartGames = useAppSelector(state => state.shoppingCartGames.value);
  const dispatch = useAppDispatch();

  const handleSaveGame = (game: Game) => {
    if (savedGames.includes(game)) {
      dispatch(filterSavedGames(game.gameId));

      return;
    }

    dispatch(setSavedGames(game));
  };

  const handleAddToCartGame = (game: Game) => {
    if (shoppingCartGames.includes(game)) {
      dispatch(filterShoppingCartGames(game.gameId));

      return;
    }

    dispatch(setShoppingCartGames(game));
  };

  useEffect(() => {
    setCollectionGames(games.filter(g => (
      g.collection === game?.collection
    )))
  }, []);

  // THIS BLOCK ENSURES THE PAGE OPENS FROM THE TOP
  const topContainer = useRef<null | HTMLDivElement>(null); 

  useEffect(() => {
    topContainer.current?.scrollIntoView({ block: "start" });
    }, []);
  
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

      {game && user && (
        <>
          <div className="game_page__price">
          {shoppingCartGames.length === 0 || shoppingCartGames[0].gameId === game.gameId
            ? (
              <p className='game_page__price_discountedPrice'>
                {game.isAvailable && 'Одна гра - безкоштовно'}
              </p>
            )
            : (
              <>
                <p 
                className={cn({
                  'game_page__price_regularPrice': game.discountedPrice
                })}
                >
                  {game.isAvailable && `${game.price}₴`}
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
                'game_page_buttons_cart--added': shoppingCartGames.includes(game),
                'game_page_buttons_cart--disabled': !game?.isAvailable,
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

      {game && game.collection !== "" && (
        <Carousel
          title="Колекція"
          showNumberOFGames={true}
          description=''
          games={collectionGames}
        />
      )}
    </div>
  );
}
