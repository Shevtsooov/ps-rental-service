import './ShoppingBuble.scss';
import shoppingCart from '../../assets/icons/shoppingCart-white.svg'
import { useAppSelector } from '../../Redux/store';
import { NavLink } from 'react-router-dom';


export const ShoppingBuble: React.FC = () => {
  const shoppingCartGames = useAppSelector(state => state.shoppingCartGames.value);
  
  return (
    <NavLink className="shoppingBuble" to='/shopping-cart'>
      <img
        src={`${shoppingCart}`}
        alt="Кошик"
        className="shoppingBuble__img"
      />
      <p className="shoppingBuble__amount">
        {shoppingCartGames.length}
      </p>
    </NavLink>
  );
}
