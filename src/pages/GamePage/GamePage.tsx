import React, { useEffect, useRef, useState } from 'react';
import './GamePage.scss';
import { useParams } from 'react-router-dom';
import parse from 'html-react-parser';
import cn from 'classnames';
import { useAppSelector, useAppDispatch } from '../../Redux/store';
import { Game } from '../../types/Game';
import { Carousel } from '../../components/Carousel/Carousel';
import { useEditUserMutation } from '../../Redux/RTK_Query/users.service';
import { setUser } from '../../Redux/Slices/user.slice';
import { useFindGamesQuery } from '../../Redux/RTK_Query/games.service';
import { Loader } from '../../components/Loader/Loader';

export const GamePage: React.FC = () => {
  const { gameIdLink } = useParams();
  const [collectionGames, setCollectionGames] = useState<Game[]>([])
  
  const { data: games } = useFindGamesQuery({
    sortBy: 'DESC',
    query: '',
    categories: [],
    year: '',
    players: '',
  });

  const game = games?.find(g => g.gameId === gameIdLink);
  const [ editUser ] = useEditUserMutation();

  const user = useAppSelector(state => state.user.value);

  const dispatch = useAppDispatch();

  const handleSaveGame = async (gameId: string) => {
    try {
      if (user?.likedGames.includes(gameId)) {
        const response = await editUser({
          id: user?.id,
          likedGames: user?.likedGames.filter(id => id !== gameId)
        });
  
        if ('data' in response) {
          const updatedUser = response.data;
          dispatch(setUser(updatedUser));

          return;
        } else {
          console.error('Error updating user:', response.error);
        }
      }

      const response = await editUser({
        id: user?.id,
        likedGames: [ ...user!.likedGames, gameId ]
      });

      if ('data' in response) {
        const updatedUser = response.data;
        dispatch(setUser(updatedUser));

        return;
      } 
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleAddToCartGame = async (gameId: string) => {
    try {
      if (user?.cartGames.includes(gameId)) {
        const response = await editUser({
          id: user?.id,
          cartGames: user?.cartGames.filter(id => id !== gameId)
        });
  
        if ('data' in response) {
          const updatedUser = response.data;
          dispatch(setUser(updatedUser));

          return;
        } else {
          console.error('Error updating user:', response.error);
        }
      }

      const response = await editUser({
        id: user?.id,
        cartGames: [ ...user!.cartGames, gameId ]
      });

      if ('data' in response) {
        const updatedUser = response.data;
        dispatch(setUser(updatedUser));

        return;
      } 
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };


  useEffect(() => {
    if (games) {
      setCollectionGames(games?.filter(g => (
        g.collection === game?.collection
      )))
    }
  }, [games]);

  // THIS BLOCK ENSURES THE PAGE OPENS FROM THE TOP
  const topContainer = useRef<null | HTMLDivElement>(null); 

  useEffect(() => {
    topContainer.current?.scrollIntoView({ block: "start" });
    }, []);
  
  const videoReviev = parse(`${game?.videoReview}`);
  const videoGameplay = parse(`${game?.videoGameplay}`);

  return (
    <>
      {game
        ? (
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
                {user.cartGames.length === 0 || user.cartGames[0] === game.gameId
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
                      'game_page_buttons_cart--added': user.cartGames.includes(game.gameId),
                      'game_page_buttons_cart--disabled': !game?.isAvailable,
                    })}
                    onClick={() => handleAddToCartGame(game.gameId)}
                  >
                    {user.cartGames.includes(game.gameId)
                    ? 'видалити'
                    : 'додати в кошик'}
                  </button>
                  <button
                    className={cn('game_page_buttons_heart', {
                      'game_page_buttons_heart--active': user.likedGames.includes(game.gameId)
                    })}
                    onClick={() => handleSaveGame(game.gameId)}
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
