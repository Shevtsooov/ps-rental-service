import React, { useEffect, useState } from 'react';
import './ShoppingCart.scss';
import { useAppSelector } from '../../Redux/store';
import { Link } from 'react-router-dom';
import { ShoppingCartList } from '../../components/ShoppingCartList/ShoppingCartList';
import { PSShoppingCartInfo } from '../../components/PSShoppingCartInfo/PSShoppingCartInfo';
import { Delivery } from '../../components/Delivery/Delivery';


export const ShoppingCart: React.FC = () => {
  const shoppingCartGames = useAppSelector(state => state.shoppingCartGames.value);

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

          {/* <p className="savedGames__empty_list_">
            Хутчіш додавай:
          </p> */}

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

      <div className="shoppingCart__checkout">
        <button className="shoppingCart__checkout_button">
          Оформити прокат
        </button>
      </div>
    
    </div>
  );
}
