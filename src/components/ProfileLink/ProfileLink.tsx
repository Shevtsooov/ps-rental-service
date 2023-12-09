import { Link } from 'react-router-dom';
import './ProfileLink.scss';

import account from '../../assets/icons/account.svg'

export const ProfileLink: React.FC = () => {
  return (
    <div className="profileLink">
      <Link
        to="/account"
      >
        <img
          className="profileLink__img"
          src={`${account}`}
          alt="Shopping cart"
        />
      </Link>
    </div>
  );
}
