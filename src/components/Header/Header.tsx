import { Login } from '../Login/Login';
import { Logo } from '../Logo/Logo';
import { MobileNavigation } from '../MobileNavigation/MobileNavigation';
import { Navigation } from '../Navigation/Navigation';
import './Header.scss';

export const Header: React.FC = () => {

  return (
    <div className="header">
      <div className='header__logo'>
        <Logo />
      </div>

      <div className='header__navigation'>
        <Navigation />
        <MobileNavigation />
      </div>

      <div className='header__login'>
        <Login />
      </div>
    </div>
  );
}
