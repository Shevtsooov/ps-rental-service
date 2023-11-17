import React, { useEffect, useRef, useState } from 'react';
import './ShoppingCart.scss';
import { useAppDispatch, useAppSelector } from '../../Redux/store';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCartList } from '../../components/ShoppingCartList/ShoppingCartList';
import { PSShoppingCartInfo } from '../../components/PSShoppingCartInfo/PSShoppingCartInfo';
import { Delivery } from '../../components/Delivery/Delivery';
import { closeCalendar } from '../../Redux/Slices/isCalendarShown.slice';
import { closeDelivery } from '../../Redux/Slices/isDeliveryShown.slice';
import { resetChosenDelivery, setChosenDelivery } from '../../Redux/Slices/chosenDelivery.slice';
import { refreshTokenService } from '../../helpers/refreshTokenService';

export const ShoppingCart: React.FC = () => {
  const user = useAppSelector(state => state.user.value);
  const shoppingCartGames = useAppSelector(state => state.shoppingCartGames.value);
  const bookedDays = useAppSelector(state => state.bookedDays.value);
  const isCalendarShown = useAppSelector(state => state.isCalendarShown.value);
  const isDeliveryShown = useAppSelector(state => state.isDeliveryShown.value);
  const chosenDelivery = useAppSelector(state => state.chosenDelivery.value);
  const [finalPrice, setFinalPrice] = useState<number | null>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

    // THIS BLOCK ENSURES THE PAGE OPENS FROM THE TOP
    const topContainer = useRef<null | HTMLDivElement>(null); 

    useEffect(() => {
      topContainer.current?.scrollIntoView({ block: "start" });
      }, []);

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
  }, [selectedDelivery]);

  useEffect(() => {
    dispatch(resetChosenDelivery());
    dispatch(setChosenDelivery(selectedDelivery))
  }, [selectedDelivery, dispatch]);

  useEffect(() => {
    if (user) {
      const gamesPrice = (user?.cartGames?.length - 1) * 100;
  
      let psPricePerDay = 450;
    
      if (bookedDays.length > 2) {
        psPricePerDay = 350; 
      }
    
      if (bookedDays.length > 6) {
        psPricePerDay = 300; 
      }
    
      const deliveryPrice = chosenDelivery === 'Доставка'
        ? 100
        : 0;
  
      const finalPriceCalc = user?.cartGames.length
      ? deliveryPrice + (psPricePerDay * bookedDays.length) + gamesPrice
      : deliveryPrice + (psPricePerDay * bookedDays.length);
  
      setFinalPrice(finalPriceCalc);
    }
  }, []);
  
  const handleToggleCalendar = () => {
    dispatch(closeCalendar());
    dispatch(closeDelivery());
  };

  useEffect(() => {
    if (!refreshTokenService.get()) {
      navigate('/');
    }
  }, []);

  return (
    <div
      className="shoppingCart"
      // ref={topContainer}
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

      {user?.cartGames.length
      ? <ShoppingCartList />
      : (
        <div className="shoppingCart__empty_list">
          <h4 className="shoppingCart__empty_list_heading">
            Ти ще не обрав жодної гри
          </h4>

          <button className="shoppingCart__empty_list_button">
            <Link
              to="/games"
              className="shoppingCart__empty_list_button--link"
            >
              До списку ігор
            </Link>
          </button>
        </div>
      )}

      <PSShoppingCartInfo />
      
      <Delivery />

      {bookedDays.length > 0 && (
        <div className="shoppingCart__finalPrice">
          <h5 className="shoppingCart__finalPrice_title">
            Загальна вартість:
          </h5>
          <p className="shoppingCart__finalPrice_amount">
            {`${finalPrice}₴`}
          </p>
        </div>
      )}

      <div className="shoppingCart__checkout">
        <button className="shoppingCart__checkout_button">
          Оформити прокат
        </button>
      </div>
    
    </div>
  );
}
