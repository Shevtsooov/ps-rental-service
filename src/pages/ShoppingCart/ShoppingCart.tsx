import React, { useEffect, useRef, useState } from 'react';
import './ShoppingCart.scss';
import { useAppDispatch, useAppSelector } from '../../Redux/store';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShoppingCartList } from '../../components/ShoppingCartList/ShoppingCartList';
import { PSShoppingCartInfo } from '../../components/PSShoppingCartInfo/PSShoppingCartInfo';
import { Delivery } from '../../components/Delivery/Delivery';
import { closeCalendar } from '../../Redux/Slices/isCalendarShown.slice';
import { closeDelivery } from '../../Redux/Slices/isDeliveryShown.slice';
import { resetChosenDelivery, setChosenDelivery } from '../../Redux/Slices/chosenDelivery.slice';
import { refreshTokenService } from '../../helpers/refreshTokenService';
import { useAddNewOrderMutation, useGetAllOrdersQuery } from '../../Redux/RTK_Query/orders.service';
import { setSavedAddress } from '../../Redux/Slices/savedAddress.slice';
import { Loader } from '../../components/Loader/Loader';
import { resetBookedDays } from '../../Redux/Slices/bookedDays.slice';
import { useEditUserMutation } from '../../Redux/RTK_Query/users.service';
import { useRefreshUserMutation } from '../../Redux/RTK_Query/authApi.service';
import { setUser } from '../../Redux/Slices/user.slice';
import orderSuccessful from '../../assets/gifs/orderSuccessful.gif'
import { UserComment } from '../../components/UserComment/UserComment';
import cn from 'classnames';
import { resetUserComment } from '../../Redux/Slices/userComment.slice';
import { FullPrice } from '../../components/FullPrice/FullPrice';

const noErrors = {
  noDaysSelected: false,
  noDeliverySelected: false,
  isConditionsConfirmed: false,
};

export const ShoppingCart: React.FC = () => {
  const {data: allTheOrders, refetch } = useGetAllOrdersQuery();
  const [ editUser ] = useEditUserMutation();

  const user = useAppSelector(state => state.user.value);
  const bookedDays = useAppSelector(state => state.bookedDays.value);
  const isCalendarShown = useAppSelector(state => state.isCalendarShown.value);
  const isDeliveryShown = useAppSelector(state => state.isDeliveryShown.value);
  const chosenDelivery = useAppSelector(state => state.chosenDelivery.value);
  const savedAddress = useAppSelector(state => state.savedAddress.value);
  const userComment = useAppSelector(state => state.userComment.value);
  const [isLoading, setIsLoading] = useState(false);
  const [isResult, setIsResult] = useState(false);
  const [error, setError] = useState(noErrors);
  const [isConditionsConfirmed, setIsConditionsConfirmed] = useState(false);

  const [finalPrice, setFinalPrice] = useState<number>(0);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [ makeNewOrder, isSuccess ] = useAddNewOrderMutation();
  const [refreshUser] = useRefreshUserMutation();

  useEffect(() => {
    window.scrollTo({
      top: 0, left: 0,
    });
  }, []);

  useEffect(() => {
    if (user && savedAddress === '') {
      dispatch(setSavedAddress(user?.address));
    }
  }, [user]);

  const [selectedDelivery, setSelectedDelivery] = useState<string>(() => {
    const storedDelivery = sessionStorage.getItem('storedDelivery');
    const parsedDelivery = storedDelivery ? JSON.parse(storedDelivery) : '';
    
    if (parsedDelivery.length !== '') {
      return parsedDelivery;
    }
    
    return '';
  });

  useEffect(() => {
    sessionStorage.setItem("storedDelivery", JSON.stringify(selectedDelivery));
  }, [selectedDelivery,]);

  useEffect(() => {
    dispatch(resetChosenDelivery());
    dispatch(setChosenDelivery(selectedDelivery))
  }, [selectedDelivery, dispatch]);

  useEffect(() => {
    if (user) {
      const gamesPrice = (user?.cartGames?.length - 1) * 100;
  
      let psPricePerDay = 450;
    
      if (bookedDays.length > 2) {
        psPricePerDay = 400; 
      }
    
      if (bookedDays.length > 6) {
        psPricePerDay = 350; 
      }
    
      const deliveryPrice = chosenDelivery === 'Доставка'
        ? 200
        : 0;
  
      const finalPriceCalc = user?.cartGames.length
      ? deliveryPrice + (psPricePerDay * bookedDays.length) + gamesPrice
      : deliveryPrice + (psPricePerDay * bookedDays.length);
  
      setFinalPrice(finalPriceCalc);
    }
  }, [bookedDays, user, chosenDelivery]);

  const handleToggleCalendar = () => {
    dispatch(closeCalendar());
    dispatch(closeDelivery());
  };

  useEffect(() => {
    if (!refreshTokenService.get() ) {
      navigate('/');
    }
  }, []);

  useEffect(() => {
    if (isLoading || isResult) {
      document.body.style.overflow = 'hidden';
      window.scrollTo({
        top: 0, left: 0,
      });

      setTimeout(() => (
        document.body.style.overflow = 'auto'
      ), 4000);

      return;
    }
  }, [isLoading, isResult]);

  const handleSubmit = async () => {
    const days = bookedDays.map(day => (
      day.toString().slice(4, 15))
    );

    const anyError = days.length === 0
    || !chosenDelivery
    || !isConditionsConfirmed;

    if (anyError) {
      if (!days.length) {
        setError(error => ({
          ...error,
          noDaysSelected: true
        }));
      }

      if (!chosenDelivery) {
        setError(error => ({
          ...error,
          noDeliverySelected: true
        }));
      }

      if (!isConditionsConfirmed) {
        setError(error => ({
          ...error,
          isConditionsConfirmed: true
        }));
      }

      setTimeout(() => {
        setError(noErrors);
      }, 2000);

      return;
    }

    try {
      setIsLoading(true);

      await makeNewOrder({
        bookedDays: days,
        orderedGames: user?.cartGames,
        deliveryOption: chosenDelivery,
        deliveryAddress: savedAddress || user?.address,
        userId: user?.id,
        orderStatus: 'Нове замовлення',
        sumOfOrder: finalPrice,
        adminComment: '',
        userComment: userComment.trim(),
        isArchived: false,
      })
    
      if (isSuccess) {
        setIsResult(true);
        sessionStorage.clear()
        dispatch(resetBookedDays());
        dispatch(resetUserComment());

        await editUser({
          id: user?.id,
          cartGames: [],
        });

        const refreshTokenFromLS = refreshTokenService.get();
      
        if (refreshTokenFromLS) {
         const response = await refreshUser({
              refreshToken: refreshTokenFromLS,
            });

            if ('data' in response) {
              const { refreshToken, user } = response.data;
              refreshTokenService.remove()
              refreshTokenService.save(refreshToken);
              dispatch(setUser(user));
            }
        };

        // setTimeout(() => {
        //   setIsResult(false);
        //   navigate('/');
        // }, 4000);

        refetch();
      }

    } catch (error) {
      console.error(error);
    }
  };

  const closeModal = () => {
    setIsResult(false);
    navigate('/');
  }

  return (
    <>
    {isResult && (
      <div
        className='shoppingCart__modal'
      >
          <img
            src={orderSuccessful}
            alt=""
            className="shoppingCart__modal__img"
          />
        <h4>Ваше замовлення прийнято</h4>
        <p>Очікуйте email з підтвердженням</p>
        <p>Скоро з вами зв'яжеться менеджер</p>

        <button
            className="shoppingCart__modal__button"
            onClick={closeModal}
          >
            OK
          </button>
      </div>
    )}

    {isLoading
      ?  (
        <div className='shoppingCart__loader'>
          <Loader />
        </div>
      )
      : (
        <>
        <div
          className="shoppingCart"
        >

            {(isCalendarShown || isDeliveryShown) && (
              <div
                className="shoppingCart__modal_bg"
                onClick={handleToggleCalendar}
              />
            )}

          <h1 className='shoppingCart__title'>Кошик</h1>
          <p
            className='shoppingCart__amount'
          >
            {`Кількість ігор: ${
              user?.cartGames
                ? user?.cartGames.length
                : 'обрахування...'
              }`}
          </p>

          <ShoppingCartList />

          <PSShoppingCartInfo error={error} />
          
          <Delivery error={error} />


          {user && (bookedDays.length > 0 || user?.cartGames?.length > 1) && (
            <FullPrice
              finalPrice={finalPrice}
            />
          )}

          <UserComment />


          <div className='shoppingCart__conditions'>
              <label
                className={cn('shoppingCart__conditions__label', {
                  'shoppingCart__conditions__label--error': error.isConditionsConfirmed
                })}
                htmlFor="condtions"
                onClick={(e) => setIsConditionsConfirmed(!isConditionsConfirmed)}
              >
                <input
                  className='shoppingCart__conditions__input'
                  name='conditions'
                  type="checkbox"
                  checked={isConditionsConfirmed}
                />

              я приймаю 
                <NavLink
                  to="/agreement"
                  className='shoppingCart__conditions__link'
                >
                  умови прокату
                </NavLink>
              </label>
          </div>

          <div className="shoppingCart__checkout">
            <button
              className="shoppingCart__checkout_button"
              onClick={handleSubmit}
            >
              Оформити прокат
            </button>
          </div>
        
        </div>
        </>
      ) 
    }
    </>
    
    
  );
}
