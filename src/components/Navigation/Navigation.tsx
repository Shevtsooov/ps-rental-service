import { NavLink } from 'react-router-dom';
import cn from 'classnames';

import './Navigation.scss';
import { useAppSelector } from '../../Redux/store';
import { useCallback, useEffect, useRef, useState } from 'react';

export const Navigation = () => {
  const user = useAppSelector(state => state.user.value);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const adminLinks = useRef<HTMLUListElement>(null);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    const targetNode = event.target as Node;

    if (adminLinks.current && !adminLinks.current.contains(targetNode)) {
      setIsAdminOpen(false);
      console.log('here');
    }
  }, []);

  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => handleClickOutside(event);
    
    if (isAdminOpen) {
      window.addEventListener('mousedown', handleMouseDown);
    }

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
    };
  }, [isAdminOpen, handleClickOutside]);
  
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
          <button
            className='admin'
            onClick={() => setIsAdminOpen(state => !state)}
          >
            Адмін
          </button>

          {isAdminOpen && (
            <ul className='admin__links' ref={adminLinks}>
              <li className="nav__item">
                <NavLink
                  className={({ isActive }) => cn(
                    'nav__link', { 'is-active': isActive },
                  )}
                  to="/clients"
                  onClick={() => setIsAdminOpen(state => !state)}
                >
                  Клієнти
                </NavLink>
              </li>
  
              <li className="nav__item">
                <NavLink
                  className={({ isActive }) => cn(
                    'nav__link', { 'is-active': isActive },
                  )}
                  to="/orders"
                  onClick={() => setIsAdminOpen(state => !state)}
                >
                  Замовлення
                </NavLink>
              </li>
  
              
              <li className="nav__item">
                <NavLink
                  className={({ isActive }) => cn(
                    'nav__link', { 'is-active': isActive },
                  )}
                  to="/reviews"
                  onClick={() => setIsAdminOpen(state => !state)}
                >
                  Відгуки
                </NavLink>
              </li>
            </ul>
          )}
        </li>
      )}
      
    </ul>
  </nav>
  )
}
