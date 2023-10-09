// import { NavLink } from 'react-router-dom';
import cn from 'classnames';

import './MobileNavigation.scss';
import { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';

export const MobileNavigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return () => {
      setIsMenuOpen(false);
    }
  }, [])

  const handleClickOutside: EventListener = (event) => {
    const targetNode = event.target as Node;

    if (navBoxRef.current && !navBoxRef.current.contains(targetNode)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';

      return;
    }

    document.body.style.overflow = 'auto'
  }, [isMenuOpen])
  
  return (
    <nav className="mobileNav" ref={navBoxRef}>
      <button
        className={cn(
          'mobileNav__burger', { 
            'mobileNav__burger--active': isMenuOpen
          },
        )}
        onClick={() => setIsMenuOpen(p => !p)}
      >
      </button>
      {isMenuOpen && (
        <div
        className={cn(
          'mobileNav__box', { 
            'mobileNav__box--active': isMenuOpen
          },
        )}
        
      >
          <ul className="mobileNav__list">
            <li>
              <NavLink
                className="mobileNav__link"
                to="/home"
                onClick={() => setIsMenuOpen(p => !p)}
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
                onClick={() => setIsMenuOpen(p => !p)}
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
                onClick={() => setIsMenuOpen(p => !p)}
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
                onClick={() => setIsMenuOpen(p => !p)}
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
                onClick={() => setIsMenuOpen(p => !p)}
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
                onClick={() => setIsMenuOpen(p => !p)}
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
