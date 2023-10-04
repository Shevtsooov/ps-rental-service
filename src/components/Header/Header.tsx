import { SavedGamesLink } from '../SavedGamesLink/SavedGamesLink';
import { Login } from '../Login/Login';
import { Logo } from '../Logo/Logo';
import { MobileNavigation } from '../MobileNavigation/MobileNavigation';
import { Navigation } from '../Navigation/Navigation';
import { ShoppingCartLink } from '../ShoppingCartLink/ShoppingCartLink';
import './Header.scss';

export const Header: React.FC = () => {
  const user = true;

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

      {!user && <Login />}
      
      {user && (
        <div className='header__actions'>
          <SavedGamesLink />
          <ShoppingCartLink />
        </div>
      )}
      </div>
    </div>
  );
}
