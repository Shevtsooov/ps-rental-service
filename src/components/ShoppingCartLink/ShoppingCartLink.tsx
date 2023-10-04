import { Link } from 'react-router-dom';
import './ShoppingCartLink.scss';

import shoppingCart from '../../assets/icons/shoppingCart.svg'

export const ShoppingCartLink: React.FC = () => {

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
      </Link>
    </div>
  );
}
