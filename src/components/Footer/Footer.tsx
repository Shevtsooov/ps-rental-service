import './Footer.scss';
import footerLogo from '../../assets/icons/PlayAtHome-grey.svg'
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../Redux/store';

export const Footer: React.FC = () => {
  const user = useAppSelector(state => state.user.value);

  return (
    <div className="footer">
      <img
        src={`${footerLogo}`}
        alt="Playstation logo"
        className='footer__logo'
      />

      <div className='footer__links'>
        <ul className='footer__list'>
          <li 
            className='footer__item'
          >
            <NavLink to="/home" className='footer__item_link'>
              Головна
            </NavLink>
          </li>
          <li 
            className='footer__item'
          >
            <NavLink to="/games" className='footer__item_link'>
              Ігри
            </NavLink>
          </li>
          <li 
            className='footer__item'
          >
            <NavLink to="/pricing-and-delivery" className='footer__item_link'>
              Тарифи і доставка
            </NavLink>
          </li>
          <li
            className='footer__item'
          >
            <NavLink to="/agreement" className='footer__item_link'>
              Умови прокату
            </NavLink>
          </li>
          <li
            className='footer__item'
          >
            <NavLink to="/contacts" className='footer__item_link'>
              Контакти
            </NavLink>
          </li>
          {/* <li 
            className='footer__item'
          >
            <NavLink to="about-ps5" className='footer__item_link'>
              Про PS5
            </NavLink>
          </li> */}
          {user
            ? (
              <li 
                className='footer__item'
              >
                <NavLink to="/account" className='footer__item_link'>
                  Мій аккаунт
                </NavLink>
              </li>
            )
          : (
            <li 
              className='footer__item'
            >
              <NavLink to="/login" className='footer__item_link'>
                Увійти
              </NavLink>
            </li>
          )}
          
        </ul>
      </div>
    </div>
  );
}
