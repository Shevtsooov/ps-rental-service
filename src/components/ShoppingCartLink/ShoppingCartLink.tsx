import { Link } from 'react-router-dom';
import './ShoppingCartLink.scss';

import shoppingCart from '../../assets/icons/shoppingCart.svg'
import { useAppSelector } from '../../Redux/store';

export const ShoppingCartLink: React.FC = () => {
  const shoppingCartGames = useAppSelector(state => state.shoppingCartGames.value);
  
  return (
    <div className="shoppingCartLink">
      <Link
        to="shopping-cart"
      >
        <img
          className="shoppingCartLink__img"
          src={`${shoppingCart}`}
          alt="Shopping cart"
        >
        </img>
        {shoppingCartGames.length > 0 && (
          <p className="shoppingCartLink__amount">
            {shoppingCartGames.length}
          </p>
        )}
      </Link>
    </div>
  );
}
