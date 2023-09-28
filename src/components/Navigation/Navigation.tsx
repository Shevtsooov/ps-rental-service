import { NavLink } from 'react-router-dom';
import cn from 'classnames';

import './Navigation.scss';

export const Navigation = () => {
  return (
    <nav className="nav">
    <ul className="nav__list">
      <li className="nav__item ">
        <NavLink
          className={({ isActive }) => cn(
            'nav__link', { 'is-active': isActive },
          )}
          to="questions"
        >
          Сторінка 1
        </NavLink>
      </li>

      <li className="nav__item">
        <NavLink
          className={({ isActive }) => cn(
            'nav__link', { 'is-active': isActive },
          )}
          to="new-question"
        >
          Сторінка 2
        </NavLink>
      </li>
    </ul>
  </nav>
  )
}
