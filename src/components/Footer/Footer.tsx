import './Footer.scss';
import footerLogo from '../../assets/icons/PlayAtHome-grey.svg'
import { NavLink } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <div className="footer">
      <div className="footer__block">
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
        </ul>


      </div>
      <p className='footer__years'>2022 - 2024</p>
      <div className='footer__dev'>
        <p className='footer__dev__question'>Потрібно створити сайт?</p>

        <a
          href="https://shevtsov.online/"
          target='_blank'
          rel="noreferrer"
          className='footer__dev__link'
        >
          Замов розробку тут
        </a>
      </div>
      </div>
    </div>
  );
}
