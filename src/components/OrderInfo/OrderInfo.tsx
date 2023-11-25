import { Order } from '../../types/Order';
import cn from "classnames";
import './OrderInfo.scss';
import { removeActiveOrder, setActiveOrder } from '../../Redux/Slices/activeOrder.slice';
import { useAppSelector, useAppDispatch } from '../../Redux/store';
import { useGetAllUsersQuery } from '../../Redux/RTK_Query/users.service';
import { useState, useEffect } from 'react';
import { User } from '../../types/User';
import { Game } from '../../types/Game';
import { useGetAllGamesQuery } from '../../Redux/RTK_Query/games.service';
import { monthsSelected } from '../../helpers/CorrectDateNames';

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
  const [year, setYear] = useState<number | null>(null);
  const [month, setMonth] = useState<number | null>(null);
  const [day, setDay] = useState<number | null>(null);
  const [amountOfDays, setAmountOfDays] = useState<string>('доба');
  const dispatch = useAppDispatch();

const { data: users } = useGetAllUsersQuery();
const { data: games } = useGetAllGamesQuery();

useEffect(() => {
  const orderUser = users?.find(user => user.id === userId);

  if (orderUser) {
    setOrderUser(orderUser);
  }
}, [users]);

useEffect(() => {
  if (order) {
    const [year, month, day] = createdAt.toString().slice(0, 10).split('-');

    setYear(+year);
    setMonth(+month);
    setDay(+day);

    if (bookedDays.length > 1) {
      setAmountOfDays('доби');
    }
  
    if (bookedDays.length > 4) {
      setAmountOfDays('діб')
    }
  }
}, [order]);

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
      <div className="orderInfo__header">
        {year && month && day && (
         <h3 className="orderInfo__title">{`
          ${day}
          ${monthsSelected[month - 1]}
          ${year.toString().slice(2)} р.
        `}</h3>
        )}

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
        className={cn('allInfo', {
          'allInfo--active': activeOrder === _id
        })}
      >
        <div className='allInfo__client'>
          <p>{orderUser?.fullName}</p>
          <a
            href={`tel:+38${orderUser?.phoneNumber}`}
            className='orderInfo__phoneNumber'
          >
            {`+38${orderUser?.phoneNumber}`}
          </a>
        </div>

        <div className='allInfo__dates'>
          <p>Заброньовані дати:</p>
          <p>{`${bookedDays[0]} - ${bookedDays[bookedDays.length - 1]}: ${bookedDays.length} ${amountOfDays}`}</p>
        </div>

        {userComment && (
          <div className='allInfo__clientComment'>
            <p className='orderInfo__comment'>Коментар до замовлення:</p>
            <p className='orderInfo__commentText'>
              <em>
                {`"${userComment}"`}
              </em>
            </p>
          </div>
        )}

        {deliveryOption === 'Доставка'
          ? (
            <div className='allInfo__delivery'>
              <p>{`Спосіб доставки: ${deliveryOption}`}</p>
              <p>{`Адреса доставки: ${deliveryAddress}`}</p>
            </div>
          )
          : (
            <div className='allInfo__delivery'>
              <p>{`Спосіб доставки: ${deliveryOption}`}</p>
            </div>
          )
        }

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

        <p className='allInfo__price'>
          {`Сума замовлення: ${sumOfOrder} грн`}
        </p>
 

        <p className='allInfo__adminComment'>{`${adminComment}`}</p>
      </div>
    </div>
  );
}
