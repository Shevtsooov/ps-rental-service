import './ShoppingCartBubble.scss';
import shoppingCart from '../../assets/icons/shoppingCart-white.svg'
import { useAppSelector } from '../../Redux/store';
import { NavLink } from 'react-router-dom';


export const ShoppingCartBubble: React.FC = () => {
  const shoppingCartGames = useAppSelector(state => state.shoppingCartGames.value);
  
  return (
    <NavLink className="shoppingCartBubble" to='/shopping-cart'>
      <img
        src={`${shoppingCart}`}
        alt="Кошик"
        className="shoppingCartBubble__img"
      />
      <p className="shoppingCartBubble__amount">
        {shoppingCartGames.length}
      </p>
    </NavLink>
  );
}
