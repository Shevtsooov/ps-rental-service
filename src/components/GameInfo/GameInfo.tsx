import './GameInfo.scss';
import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../../Redux/store';
import { filterShoppingCartGames, setShoppingCartGames } from '../../Redux/Slices/shoppingCartGames.slice';
import { Game } from '../../types/Game';
import { NavLink } from 'react-router-dom';
import { useEditUserMutation } from '../../Redux/RTK_Query/users.service';
import { setUser } from '../../Redux/Slices/user.slice';

type Props = {
  game: Game,
}

export const GameInfo: React.FC<Props> = ({ game }) => {
  const user = useAppSelector(state => state.user.value);
  const dispatch = useAppDispatch();

  const [ editUser ] = useEditUserMutation();
  const {
    title,
    icon,
    gameId,
    price,
    discountedPrice,
    isAvailable,
  } = game;

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

  const scrollToTop = () => {
    window.scrollTo({ top: 60, left: 0, behavior: 'smooth' });
  };

  return (
    <div className="gameInfo">

      {!isAvailable && <div className="gameInfo--unavailable" />}
      
      <NavLink to={`/games/${gameId}`}>
        <img
          // src={game.iconLink}
          src={`../images/games/${icon}`}
          alt={`${title} - logo`}
          className="gameInfo_image"
          onClick={scrollToTop}
        />
      </NavLink>
      <NavLink
        className="gameInfo_heading"
        to={`/games/${gameId}`}
        onClick={scrollToTop}
      >
        {title}
      </NavLink>
     
      <div className="gameInfo_price">
      {user?.cartGames.length === 0 || user?.cartGames[0] === gameId
        ? (
          <p className={cn('gameInfo_price_discountedPrice',{
            'gameInfo_price_discountedPrice--off': !isAvailable
          })}
          >
           Одна гра - безкоштовно
          </p>
        )
        : (
          <>
            <p 
            className={cn({
              'gameInfo_price_regularPrice': discountedPrice
            })}
            >
              {`${price}₴`}
            </p>
            {discountedPrice && (
              <p className="gameInfo_price_discountedPrice">{`${discountedPrice}₴`}</p>
            )}
          </>
        )}
      </div>
      
      {user !== null
        ? (
          <div className="gameInfo_buttons">
            <button 
              className={cn('gameInfo_buttons_cart', {
                'gameInfo_buttons_cart--added': user.cartGames.includes(game.gameId),
                'gameInfo_buttons_cart--disabled': !isAvailable,
              })}
              onClick={() => handleAddToCartGame(game.gameId)}
            >
              {user.cartGames.includes(gameId)
              ? 'видалити'
              : 'додати в кошик'}
            </button>
            <button
              className={cn('gameInfo_buttons_heart', {
                'gameInfo_buttons_heart--active': user.likedGames.includes(game.gameId)
              })}
              onClick={() => handleSaveGame(game.gameId)}
            />
          </div>
        )
        : (
          <div className="gameInfo_noUser">
            Увійдіть або зареєструйтесь, щоб робити замовлення та зберігати улюблені ігри
          </div>
        )
      }
    </div>
  );
}
