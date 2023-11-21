import { Order } from '../../types/Order';
import cn from "classnames";
import './OrderInfo.scss';
import { removeActiveOrder, setActiveOrder } from '../../Redux/Slices/activeOrder.slice';
import { useAppSelector, useAppDispatch } from '../../Redux/store';
import { useGetAllUsersQuery, useGetOneUserQuery } from '../../Redux/RTK_Query/users.service';
import { useState, useEffect } from 'react';
import { User } from '../../types/User';
import { Game } from '../../types/Game';
import { useGetAllGamesQuery } from '../../Redux/RTK_Query/games.service';

type Props = {
  order: Order,
};

export const OrderInfo: React.FC<Props> = ({ order }) => {
  const {
    _id,
    bookedDays,
    orderedGames,
    deliveryOption,
    deliveryAddress,
    userId,
    orderStatus,
    sumOfOrder,
    userComment,
    adminComment,
    isArchived,
    createdAt,
    updatedAt,
  } = order;

  const activeOrder = useAppSelector(state => state.activeOrder.value);
  const [orderUser, setOrderUser] = useState<User | null>(null);
  const [orderGames, setOrderGames] = useState<Game[]>([]);
  const dispatch = useAppDispatch();

const { data: users } = useGetAllUsersQuery();
const { data: games } = useGetAllGamesQuery();

useEffect(() => {
  const orderUser = users?.find(user => user.id === userId);

  if (orderUser) {
    setOrderUser(orderUser);
  }
}, [users]);

// console.log('orderUser - ', orderUser);

  const handleActiveOrder = (_id: string) => {
    if (activeOrder === _id) {
      dispatch(removeActiveOrder());

      return;
    }

    dispatch(setActiveOrder(_id));
  };

  useEffect(() => {
    if (users && games) {
      const gamesToAdd = games.filter((game) => (
        orderedGames.includes(game.gameId)
      ));
  
      setOrderGames(gamesToAdd);
    } 
  }, [users, games]);

  return (
    <div className="orderInfo">
      <div className="orderInfo__firstBlock">
        <h2>{createdAt.toString().slice(0, 10)}</h2>

        <div className="orderInfo__firstBlock">
          <p>{orderStatus}</p>

          <span
            className={cn('orderInfo__arrow', {
              'orderInfo__arrow--active': activeOrder === _id
            })}
            onClick={() => handleActiveOrder(_id)}
          />
        </div>
      </div>

      <div
        className={cn('clientInfo__text', {
          'clientInfo__text--active': activeOrder === _id
        })}
      >
        <p>{orderUser?.fullName}</p>
        <a
          href={`tel:+38${orderUser?.phoneNumber}`}
          className='clientInfo__phoneNumber'
        >
          {`+38${orderUser?.phoneNumber}`}
        </a>

        <div>
          {orderGames.map(game => (
            <div className='game'>
              <a href={`/games/${game.gameId}`} >
                <img
                  className='game__img'
                  src={`${game.iconLink}`}
                  alt=""
                />
              </a>
      
              <a href={`/games/${game.gameId}`} >
                <h4 className='game__title'>{game.title}</h4>
              </a>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
