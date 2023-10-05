import { useAppDispatch, useAppSelector } from '../../Redux/store';
import cn from 'classnames';
import './ShoppingCartList.scss';
import { Game } from '../../types/Game';
import { filterSavedGames, setSavedGames } from '../../Redux/Slices/savedGames.slice';
import { filterShoppingCartGames, setShoppingCartGames } from '../../Redux/Slices/shoppingCartGames.slice';

export const ShoppingCartList: React.FC = () => {
  const shoppingCartGames = useAppSelector(state => state.shoppingCartGames.value);
  const savedGames = useAppSelector(state => state.savedGames.value);
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
  };

  return (
    <div className="shoppingCartList">

      {shoppingCartGames.map(game => (
        <div className="shoppingCartList__game">
          <div className="shoppingCartList__game_box">
            <div className="shoppingCartList__game_img">
              <img
                src={`./images/games/${game.icon}`}
                alt={game.title}
                className="shoppingCartList__game_img_icon"
              />
            </div>

            <div className="shoppingCartList__game_info">
              <div>
                <h5 
                  className="shoppingCartList__game_info_title"
                >
                  {game.title}
                </h5>

              </div>
              
              <div className="shoppingCartList__game_info_price">
              {shoppingCartGames.length === 0 || shoppingCartGames[0].id === game.id
                ? (
                  <p className='game_price_discountedPrice'>Одна гра - безкоштовно</p>
                )
                : (
                  <>
                    <p 
                    className={cn({
                      'game_price_regularPrice': game.discountedPrice
                    })}
                    >
                      {`${game.price}₴`}
                    </p>
                    {game.discountedPrice && (
                      <p className="game_price_discountedPrice">{`${game.discountedPrice}₴`}</p>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="shoppingCartList__game_actions">
            <button
              className={cn('shoppingCartList__game_actions--save', {
                'shoppingCartList__game_actions--save--active': savedGames.includes(game)
              })}
              onClick={() => handleSaveGame(game)}
            />
            <button
              className="shoppingCartList__game_actions--clear"
              onClick={() => handleAddToCartGame(game)}
            >X</button>
          </div>
        </div>
      ))}
    </div>
  );
}
