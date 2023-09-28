import { NavLink } from 'react-router-dom';
import './Login.scss';

export const Login: React.FC = () => {

  return (
    <div className="login">
      <button 
        className="login__button"
      >
        <NavLink to="login" className="login__button_text">
          Увійти
        </NavLink>
      </button>
    </div>
  );
}
