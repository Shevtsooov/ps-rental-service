// import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import './MobileNavigation.scss';
import { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';

export const MobileNavigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      setIsMenuOpen(false);
      document.removeEventListener('click', handleClickOutside);
    }
  }, [])

  const handleClickOutside: EventListener = (event) => {
    const targetNode = event.target as Node;

    if (navBoxRef.current && !navBoxRef.current.contains(targetNode)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';

      return;
    }

    document.body.style.overflow = 'auto'
  }, [isMenuOpen]);
  
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
                to="/pricing-and-delivery"
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
                  <p>Умови прокату</p>
                </div>

                  <span className="mobileNav__link--arrow"></span>

              </NavLink>
            </li>

            <li>
              <NavLink
                className="mobileNav__link"
                to="/contacts"
                onClick={() => setIsMenuOpen(p => !p)}
              >
                <div className="mobileNav__link_text">
                  <span className="mobileNav__link--icon mobileNav__link--contacts"></span>
                  <p>Контакти</p>
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
