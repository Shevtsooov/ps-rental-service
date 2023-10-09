import React from 'react';
import './ShoppingCart.scss';
import { useAppSelector } from '../../Redux/store';
import { Link } from 'react-router-dom';
import { ShoppingCartList } from '../../components/ShoppingCartList/ShoppingCartList';
import { PSShoppingCartInfo } from '../../components/PSShoppingCartInfo/PSShoppingCartInfo';
import { Delivery } from '../../components/Delivery/Delivery';

export const ShoppingCart: React.FC = () => {
  const shoppingCartGames = useAppSelector(state => state.shoppingCartGames.value);
  const bookedDays = useAppSelector(state => state.bookedDays.value);
  
  const gamesPrice = (shoppingCartGames.length - 1) * 100;

  let psPricePerDay = 450;

  if (bookedDays.length > 2) {
    psPricePerDay = 350; 
  }

  if (bookedDays.length > 6) {
    psPricePerDay = 300; 
  }

  const deliveryPrice = 100;

  const finalPrice = shoppingCartGames.length
  ? deliveryPrice + (psPricePerDay * bookedDays.length) + gamesPrice
  : deliveryPrice + (psPricePerDay * bookedDays.length);

  console.log('finalPrice - ', finalPrice);

  return (
    <div className="shoppingCart">
      <h1 className='shoppingCart__title'>Кошик</h1>
      <p
        className='shoppingCart__amount'
      >
        {`Кількість ігор: ${
          shoppingCartGames
            ? shoppingCartGames.length
            : 'обрахування...'
          }`}
      </p>

      {shoppingCartGames.length
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
