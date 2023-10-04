import './GameInfo.scss';
import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../../Redux/store';
import { filterSavedGames, setSavedGames } from '../../Redux/Slices/savedGames.slice';
import { Game } from '../../types/Game';
import { filterShoppingCartGames, setShoppingCartGames } from '../../Redux/Slices/shoppingCartGames.slice';

type Props = {
  game: Game,
}

export const GameInfo: React.FC<Props> = ({ game }) => {
  const savedGames = useAppSelector(state => state.savedGames.value);
  const shoppingCartGames = useAppSelector(state => state.shoppingCartGames.value);
  const dispatch = useAppDispatch();

  const handleSaveGame = (game: Game) => {
    if (savedGames.includes(game)) {
      dispatch(filterSavedGames(game.id));
      console.log('includes')
      return;
    }

    dispatch(setSavedGames(game));
  }

  const handleAddToCartGame = (game: Game) => {
    if (shoppingCartGames.includes(game)) {
      dispatch(filterShoppingCartGames(game.id));

      return;
    }

    dispatch(setShoppingCartGames(game));
  }

  return (
    <div className="game">
      <img
        src={`./images/games/${game.icon}`}
        alt="2"
        className="game_image"
      />
      <h3 className="game_heading">{game.title}</h3>
      <div className="game_price">
        <p className={cn({
          'game_price_regularPrice': game.discountedPrice
        })}>{`${game.price}₴`}</p>
        {game.discountedPrice && (
          <p className="game_price_discountedPrice">{`${game.discountedPrice}₴`}</p>
        )}
      </div>
      <div className="game_buttons">
        <button 
          className={cn('game_buttons_cart', {
            'game_buttons_cart--added': shoppingCartGames.includes(game)
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
