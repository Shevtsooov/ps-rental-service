import React from 'react';
import './ShoppingCart.scss';
import { useAppSelector } from '../../Redux/store';
import { Link } from 'react-router-dom';
import { ShoppingCartList } from '../../components/ShoppingCartList/ShoppingCartList';


export const ShoppingCart: React.FC = () => {
  const shoppingCartGames = useAppSelector(state => state.shoppingCartGames.value);

  return (
    <div className="shoppingCart">
      <h1 className='savedGames__title'>Кошик</h1>
      <p
        className='savedGames__amount'
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
        <div className="savedGames__empty_list">
          <h4 className="savedGames__empty_list_heading">
            Ти ще не обрав жодної гри
          </h4>

          {/* <p className="savedGames__empty_list_">
            Хутчіш додавай:
          </p> */}

          <button className="savedGames__empty_list_button">
            <Link
              to="/games"
              className="savedGames__empty_list_button--link"
            >
              До списку ігор
            </Link>
          </button>
        </div>
      )}
    </div>
  );
}
