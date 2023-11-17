import { NavLink } from 'react-router-dom';
import './Login.scss';

export const Login: React.FC = () => {

  return (
    <div className="login">
      <NavLink
        to="/login"
        className="login__button"
      >
          Увійти
      </NavLink>
    </div>
  );
}
