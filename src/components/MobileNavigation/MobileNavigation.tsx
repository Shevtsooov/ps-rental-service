// import { NavLink } from 'react-router-dom';
import cn from 'classnames';

import './MobileNavigation.scss';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

export const MobileNavigation = () => {
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  useEffect(() => {
    return () => {
      setIsMenuOpened(false);
    }
  }, [])

  useEffect(() => {
    if (isMenuOpened) {
      document.body.style.overflow = 'hidden';

      return;
    }

    document.body.style.overflow = 'auto'
  }, [isMenuOpened])
  
  return (
    <nav className="mobileNav">
      <button
        className={cn(
          'mobileNav__burger', { 
            'mobileNav__burger--active': isMenuOpened
          },
        )}
        onClick={() => setIsMenuOpened(p => !p)}
      >
      </button>
      {isMenuOpened && (
        <div
        className={cn(
          'mobileNav__box', { 
            'mobileNav__box--active': isMenuOpened
          },
        )}
      >
          <ul className="mobileNav__list">
            <li>
              <NavLink
                className="mobileNav__link"
                to="/home"
                onClick={() => setIsMenuOpened(p => !p)}
              >
                <div className="mobileNav__link_text">
                  <span className="mobileNav__link--icon mobileNav__link--home"></span>
                  <p>Головна</p>
                </div>

                
                <span className="mobileNav__link--arrow"></span>
              </NavLink>
            </li>

            <li>

              <NavLink
                className="mobileNav__link"
                to="/games"
                onClick={() => setIsMenuOpened(p => !p)}
              >
                <div className="mobileNav__link_text">
                  <span className="mobileNav__link--icon mobileNav__link--games"></span>
                  <p>Ігри</p>
                </div>

                <span className="mobileNav__link--arrow"></span>
              </NavLink>
            </li>

            <li>
              <NavLink
                className="mobileNav__link"
                to="/plans"
                onClick={() => setIsMenuOpened(p => !p)}
              >
                <div className="mobileNav__link_text">
                  <span className="mobileNav__link--icon mobileNav__link--plans"></span>
                  <p>Тарифи і доставка</p>
                </div>

                  <span className="mobileNav__link--arrow"></span>

              </NavLink>
            </li>

            <li>
              <NavLink
                className="mobileNav__link"
                to="/agreement"
                onClick={() => setIsMenuOpened(p => !p)}
              >
                <div className="mobileNav__link_text">
                  <span className="mobileNav__link--icon mobileNav__link--agreement"></span>
                  <p>Умови договору</p>
                </div>

                  <span className="mobileNav__link--arrow"></span>

              </NavLink>
            </li>

            <li>
              <NavLink
                className="mobileNav__link"
                to="/about-ps5"
                onClick={() => setIsMenuOpened(p => !p)}
              >
                <div className="mobileNav__link_text">
                  <span className="mobileNav__link--icon mobileNav__link--about_ps5"></span>
                  <p>Про PS5</p>
                </div>
                  <span className="mobileNav__link--arrow"></span>

              </NavLink>
            </li>

            <li>
              <NavLink
                className="mobileNav__link"
                to="/login"
                onClick={() => setIsMenuOpened(p => !p)}
              >
                <div className="mobileNav__link_text">
                  <span className="mobileNav__link--icon mobileNav__link--login"></span>
                  <p>Увійти</p>
                </div>
                  <span className="mobileNav__link--arrow"></span>

              </NavLink>
            </li>
          </ul>
      </div>
      )}  
  </nav>
  )
}
