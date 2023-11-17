import { Link } from 'react-router-dom';
import './ShoppingCartLink.scss';

import shoppingCart from '../../assets/icons/shoppingCart.svg'
import { useAppSelector } from '../../Redux/store';

export const ShoppingCartLink: React.FC = () => {
  const user = useAppSelector(state => state.user.value);
  
  return (
    <div className="shoppingCartLink">
      <Link
        to="shopping-cart"
      >
        <img
          className="shoppingCartLink__img"
          src={`${shoppingCart}`}
          alt="Shopping cart"
        />

        {user && user.cartGames.length > 0 && (
          <p className="shoppingCartLink__amount">
            {user.cartGames.length}
          </p>
        )}
      </Link>
    </div>
  );
}
