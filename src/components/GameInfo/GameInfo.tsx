import './GameInfo.scss';
import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../../Redux/store';
import { filterSavedGames, setSavedGames } from '../../Redux/Slices/savedGames.slice';
import { filterShoppingCartGames, setShoppingCartGames } from '../../Redux/Slices/shoppingCartGames.slice';
import { Game } from '../../types/Game';
import { NavLink } from 'react-router-dom';

type Props = {
  game: Game,
  index: number,
}

export const GameInfo: React.FC<Props> = ({ game, index }) => {
  const savedGames = useAppSelector(state => state.savedGames.value);
  const shoppingCartGames = useAppSelector(state => state.shoppingCartGames.value);
  const dispatch = useAppDispatch();

  const {
    title,
    icon,
    gameId,
    price,
    discountedPrice,
    isAvailable,
  } = game;

  const handleSaveGame = (game: Game) => {
    if (savedGames.includes(game)) {
      dispatch(filterSavedGames(game.gameId));
      console.log('includes')
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

  const scrollToTop = () => {
    window.scrollTo({ top: 60, left: 0, behavior: 'smooth' });
  };

  return (
    <div className="game">

      {!isAvailable && <div className="game--unavailable" />}
      
      <NavLink to={`/games/${gameId}`}>
        <img
          // src={game.iconLink}
          src={`../images/games/${icon}`}
          alt={`${title} - logo`}
          className="game_image"
          // onClick={scrollToTop}
        />
      </NavLink>
      <NavLink
        className="game_heading"
        to={`/games/${gameId}`}
        onClick={scrollToTop}
      >
        {`${index + 1}. ${title}`}
      </NavLink>
     
      <div className="game_price">
      {shoppingCartGames.length === 0 || shoppingCartGames[0].gameId === gameId
        ? (
          <p className='game_price_discountedPrice'>
            {isAvailable && 'Одна гра - безкоштовно'}
          </p>
        )
        : (
          <>
            <p 
            className={cn({
              'game_price_regularPrice': discountedPrice
            })}
            >
              {`${price}₴`}
            </p>
            {discountedPrice && (
              <p className="game_price_discountedPrice">{`${discountedPrice}₴`}</p>
            )}
          </>
        )}
      </div>
      
      <div className="game_buttons">
        <button 
          className={cn('game_buttons_cart', {
            'game_buttons_cart--added': shoppingCartGames.includes(game),
            'game_buttons_cart--disabled': !isAvailable,
          })}
          onClick={() => handleAddToCartGame(game)}
        >
          {shoppingCartGames.includes(game)
          ? 'видалити'
          : 'додати в кошик'}
        </button>
        <button
          className={cn('game_buttons_heart', {
            'game_buttons_heart--active': savedGames.includes(game)
          })}
          onClick={() => handleSaveGame(game)}
        />
      </div>
    </div>
  );
}
