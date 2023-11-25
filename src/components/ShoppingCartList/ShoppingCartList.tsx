import { useAppDispatch, useAppSelector } from '../../Redux/store';
import cn from 'classnames';
import './ShoppingCartList.scss';
import { filterShoppingCartGames, hardSetShoppingCartGames, resetShoppingCartGames } from '../../Redux/Slices/shoppingCartGames.slice';
import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import { useGetAllGamesQuery } from '../../Redux/RTK_Query/games.service';
import { useEditUserMutation } from '../../Redux/RTK_Query/users.service';
import { setUser } from '../../Redux/Slices/user.slice';

export const ShoppingCartList: React.FC = () => {
  const shoppingCartGames = useAppSelector(state => state.shoppingCartGames.value);
  const user = useAppSelector(state => state.user.value);
  const savedGames = useAppSelector(state => state.savedGames.value);
  const { data: games } = useGetAllGamesQuery();
  const [ editUser ] = useEditUserMutation();

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
          dispatch(filterShoppingCartGames(gameId));

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
    dispatch(resetShoppingCartGames());
  
    if (user) {
      const gamesToAdd = games?.filter((game) => (
        user.cartGames.includes(game.gameId)
      ));
  
      dispatch(hardSetShoppingCartGames(gamesToAdd));
    } 
  }, [user, games, dispatch]);

  return (
    <div className="shoppingCartList">

      {shoppingCartGames?.map(game => (
        <div className="shoppingCartList__game" key ={game.gameId}>
          <div className="shoppingCartList__game_box">
            <div className="shoppingCartList__game_img">
              <NavLink to={`/games/${game.gameId}`}>
                <img
                  src={`./images/games/${game.icon}`}
                  alt={game.title}
                  className="shoppingCartList__game_img_icon"
                />
              </NavLink>
            </div>

            <div className="shoppingCartList__game_info">
              <div>
                <NavLink to={`/games/${game.gameId}`}
                  className="shoppingCartList__game_info_title"
                >
                  {game.title}
                </NavLink>

              </div>
              
              <div className="shoppingCartList__game_info_price">
              {user?.cartGames.length === 0 || shoppingCartGames[0].gameId === game.gameId
                ? (
                  <p className='shoppingCartList__game_price_discountedPrice'>Одна гра - безкоштовно</p>
                )
                : (
                  <>
                    <p 
                    className={cn({
                      'shoppingCartList__game_price_regularPrice': game.discountedPrice
                    })}
                    >
                      {`${game.price}₴`}
                    </p>
                    {game.discountedPrice && (
                      <p className="shoppingCartList__game_price_discountedPrice">{`${game.discountedPrice}₴`}</p>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="shoppingCartList__game_actions">
            <button
              className={cn('shoppingCartList__game_actions--save', {
                'shoppingCartList__game_actions--save--active': user?.likedGames.includes(game.gameId)
              })}
              onClick={() => handleSaveGame(game.gameId)}
            />
            <button
              className="shoppingCartList__game_actions--clear"
              onClick={() => handleAddToCartGame(game.gameId)}
            >X</button>
          </div>
        </div>
      ))}
    </div>
  );
}
