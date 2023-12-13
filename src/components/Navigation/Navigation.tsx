import { NavLink } from 'react-router-dom';
import cn from 'classnames';

import './Navigation.scss';
import { useAppSelector } from '../../Redux/store';

export const Navigation = () => {
  const user = useAppSelector(state => state.user.value);
  
  return (
    <nav className="nav">
    <ul className="nav__list">
      <li className="nav__item ">
        <NavLink
          className={({ isActive }) => cn(
            'nav__link', { 'is-active': isActive },
          )}
          to="/home"
        >
         Головна
        </NavLink>
      </li>

      <li className="nav__item">
        <NavLink
          className={({ isActive }) => cn(
            'nav__link', { 'is-active': isActive },
          )}
          to="/games"
        >
          Ігри
        </NavLink>
      </li>

      <li className="nav__item">
        <NavLink
          className={({ isActive }) => cn(
            'nav__link', { 'is-active': isActive },
          )}
          to="/pricing-and-delivery"
        >
          Тарифи і доставка
        </NavLink>
      </li>

      <li className="nav__item">
        <NavLink
          className={({ isActive }) => cn(
            'nav__link', { 'is-active': isActive },
          )}
          to="/agreement"
        >
          Умови прокату
        </NavLink>
      </li>

      <li className="nav__item">
        <NavLink
          className={({ isActive }) => cn(
            'nav__link', { 'is-active': isActive },
          )}
          to="/contacts"
        >
          Контакти
        </NavLink>
      </li>

      {user?.role === 'admin' && (
        <li className="nav__item">
          <NavLink
            className={({ isActive }) => cn(
              'nav__link', { 'is-active': isActive },
            )}
            to="/admin-panel"
          >
            Адмін-панель
          </NavLink>
        </li>
      )}
      
    </ul>
  </nav>
  )
}
