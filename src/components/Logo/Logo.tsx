import './Logo.scss';
import { Link } from 'react-router-dom';

import logo from '../../assets/icons/playathome-logo.svg'

export const Logo: React.FC = () => {

  return (
    <div className="logo">
      <Link
        className="logo__link"
        to="home"
      >
        <img
          className="logo__img"
          src={`${logo}`}
          alt="PS logo"
        >
        </img>
      </Link>
    </div>
  );
}

