import { User } from '../../types/User';
import heart from '../../assets/icons/heart.svg'
import shoppingCart from '../../assets/icons/shoppingCart.svg'
import cn from "classnames";
import './ClientInfo.scss';
import { removeActiveClient, setActiveClient } from '../../Redux/Slices/activeClient.slice';
import { useAppSelector, useAppDispatch } from '../../Redux/store';
import { calculateDaysPassed } from '../../helpers/calculatePassedDays';
import { useEffect, useState } from 'react';
import { monthsSelected } from '../../helpers/CorrectDateNames';

type Props = {
  client: User,
}

export const ClientInfo: React.FC<Props> = ({ client }) => {
  const activeClient = useAppSelector(state => state.activeClient.value);
  const [year, setYear] = useState<number | null>(null);
  const [month, setMonth] = useState<number | null>(null);
  const [day, setDay] = useState<number | null>(null);
  const [passedDays, setPassedDays] = useState<number | null>(null);
  const dispatch = useAppDispatch();

  const {
    fullName,
    email,
    address,
    phoneNumber,
    likedGames,
    cartGames,
    createdAt,
  } = client;
  

  const handleActiveClient = (email: string) => {
    if (activeClient === email) {
      dispatch(removeActiveClient());

      return;
    }

    dispatch(setActiveClient(email));
  };

  useEffect(() => {
      const [year, month, day] = createdAt.toString().slice(0, 10).split('-');

      setYear(+year);
      setMonth(+month);
      setDay(+day);
      setPassedDays(calculateDaysPassed(createdAt.toString()));
  }, []);

  return (
    <div className='clientInfo'>
      <div className='clientInfo__firstBlock'>
        <h4 className='clientInfo__title'>
          {fullName}
        </h4>

        <a
          href={`tel:+38${phoneNumber}`}
          className='clientInfo__phoneNumber'
        >
          {`+38${phoneNumber}`}
        </a>
      </div>
      
      <div className='clientInfo__icons'>
        <div className='clientInfo__savedGames'>
          <img
            className='clientInfo__savedGames__img'
            src={`${heart}`}
            alt="Saved games"
          />
          {likedGames.length > 0 && (
            <p className='clientInfo__savedGames__amount'>
              {likedGames.length}
            </p>
          )}
        </div>

        <div className='clientInfo__savedGames'>
          <img
            className="shoppingCartLink__img"
            src={`${shoppingCart}`}
            alt="Shopping cart"
          />

          {cartGames.length > 0 && (
            <p className='clientInfo__savedGames__amount'>
              {cartGames.length}
            </p>
          )}
        </div>

        <span
          className={cn('clientInfo__arrow', {
            'clientInfo__arrow--active': activeClient === email
          })}
          onClick={() => handleActiveClient(email)}
        />
      </div>

      <div
        className={cn('clientInfo__text', {
          'clientInfo__text--active': activeClient === email
        })}
      >
        <p>{email}</p>
        <p>{address}</p>
        {year && month && day && (
          <h4>{`Аккаунт створено: ${day} ${monthsSelected[month - 1]} ${year} року`}</h4>
        )}
        <p>{`З нами ${passedDays} днів`}</p>
      </div>
    </div>
  );
}
