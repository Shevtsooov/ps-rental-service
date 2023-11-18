import React, { useEffect, useState } from 'react';
import './AccountPage.scss';
import { NavLink, useNavigate } from 'react-router-dom';
import { logOut } from '../../Redux/Slices/user.slice';
import { useAppDispatch, useAppSelector } from '../../Redux/store';
import { refreshTokenService } from '../../helpers/refreshTokenService';
import { useLogOutUserMutation } from '../../Redux/RTK_Query/authApi.service';
import { monthsSelected } from '../../helpers/CorrectDateNames';
import { calculateDaysPassed } from '../../helpers/calculatePassedDays';
import { Loader } from '../../components/Loader/Loader';

export const AccountPage: React.FC = () => {
  const [ serverLogOut ] = useLogOutUserMutation();
  const user = useAppSelector(state => state.user.value);
  const [year, setYear] = useState<number | null>(null);
  const [month, setMonth] = useState<number | null>(null);
  const [day, setDay] = useState<number | null>(null);
  const [passedDays, setPassedDays] = useState<number | null>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogOut = async () => {
    const refreshToken = refreshTokenService.get();

    console.log('refreshToken - ', refreshToken);
    
    try {
      if (refreshToken) {
        const response = await serverLogOut({
          refreshToken: refreshToken
        });

        console.log(response);
      }

      refreshTokenService.remove();
      dispatch(logOut());
      navigate('/')
    } catch (error) {
      console.error('Error logOut user:', error);
    } 
  };

  useEffect(() => {
    if (user) {
      const [year, month, day] = user?.createdAt.toString().slice(0, 10).split('-');

      setYear(+year);
      setMonth(+month);
      setDay(+day);
      setPassedDays(calculateDaysPassed(user?.createdAt.toString()));
    }
  }, [user]);

  useEffect(() => {
    if (!refreshTokenService.get()) {
      navigate('/');
    }
  }, []);

  return (
    <>
      {user
      ? (
        <div className="accountPage">
          <div className="accountPage__block">
            <h1 className="accountPage__field accountPage__title">{user?.fullName}</h1>
            <h2 className="accountPage__field accountPage__email">{user?.email}</h2>
            <h3 className="accountPage__field">{user?.address}</h3>
            <h3 className="accountPage__field">{user?.phoneNumber}</h3>
            {year && month && day && (
              <h4 className="accountPage__field">{`Аккаунт створено: ${day} ${monthsSelected[month - 1]} ${year} року`}</h4>
            )}
            <p className="accountPage__field">{`З нами ${passedDays} днів`}</p>
          </div>
          
          <div className="accountPage__navigation">
            <NavLink
              className="accountPage__button"
              to="/account/orders"
            >
              Мої замовлення
            </NavLink>

            <NavLink
              className="accountPage__button"
              to="/saved-games"
            >
              Збережені ігри
            </NavLink>

            <NavLink
              className="accountPage__button"
              to="/shopping-cart"
            >
              Кошик
            </NavLink>
          </div>
          

          <NavLink
            className="accountPage__logOut"
            to="/"
            onClick={handleLogOut}
          >
            Вийти з аккаунту
          </NavLink>
        </div>
      )
      : <Loader />
      }
    </>
  );
}
