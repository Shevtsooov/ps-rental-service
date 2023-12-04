import { SavedGamesLink } from '../SavedGamesLink/SavedGamesLink';
import { Login } from '../Login/Login';
import { Logo } from '../Logo/Logo';
import { MobileNavigation } from '../MobileNavigation/MobileNavigation';
import { Navigation } from '../Navigation/Navigation';
import { ShoppingCartLink } from '../ShoppingCartLink/ShoppingCartLink';
import './Header.scss';
import { useAppSelector } from '../../Redux/store';

export const Header: React.FC = () => {
  const user = useAppSelector(state => state.user?.value);

  // const dispatch = useAppDispatch();
  
  // const [storedUser, setStoredUser] = useState<User | null>(() => {
  //   const storedUser = localStorage.getItem('user');
  //   const parsedUser = storedUser ? JSON.parse(storedUser) : null;
    
  //   if (parsedUser !== null) {
  //     return parsedUser;
  //   }
    
  //   return null;
  // });

  // useEffect(() => {
  //   const storedUser = localStorage.getItem('user');
  //   const parsedUser = storedUser ? JSON.parse(storedUser) : null;
    
  //   if (parsedUser !== null) {
  //     dispatch(setUser(parsedUser));
  //   }
    
  // }, [storedUser]);

  return (
    <div className="header">
      {/* <div className='header__logo'>
        <Logo />
      </div> */}

      <div className='header__navigation'>
        <Navigation />
        <MobileNavigation />
      </div>

      <div className='header__login'>

      {!user && <Login />}
      
      {user !== null && (
        <div className='header__actions'>
          <SavedGamesLink />
          <ShoppingCartLink />
        </div>
      )}
      </div>
    </div>
  );
}
