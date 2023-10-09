import { NavLink } from 'react-router-dom';
import './BookPS.scss';

export const BookPS: React.FC = () => {

  return (
    <div className="bookPS">
      <button className="bookPS__button">
        <NavLink to="/shopping-cart" className="bookPS__link">
          Забронювати
        </NavLink>
      </button>
    </div>
  );
}
