import React from 'react';
import './AdminPage.scss';
import { NavLink } from 'react-router-dom';

export const AdminPage: React.FC = () => {
  return (
    <div className="adminPage">
      <h1 className="adminPage__title">Адмін-панель</h1>

      <div className="adminPage__links">
        <NavLink
          className='adminPage__item'
          to="/clients"
        >
          <span className="adminPage__img adminPage__img--clients"></span>
          Клієнти
        </NavLink>

        <NavLink
          className='adminPage__item'
          to="/orders"
        >
          <span className="adminPage__img adminPage__img--orders"></span>
          Замовлення
        </NavLink>

        <NavLink
          className='adminPage__item'
          to="/reviews"
        >
          <span className="adminPage__img adminPage__img--reviews"></span>
          Відгуки
        </NavLink>

        <NavLink
          className='adminPage__item'
          to="/clients"
        >
          <span className="adminPage__img adminPage__img--clients"></span>
          Клієнти
        </NavLink>
        <NavLink
          className='adminPage__item'
          to="/clients"
        >
          <span className="adminPage__img adminPage__img--clients"></span>
          Клієнти
        </NavLink>

        <NavLink
          className='adminPage__item'
          to="/orders"
        >
          <span className="adminPage__img adminPage__img--orders"></span>
          Замовлення
        </NavLink>

        <NavLink
          className='adminPage__item'
          to="/reviews"
        >
          <span className="adminPage__img adminPage__img--reviews"></span>
          Відгуки
        </NavLink>

        <NavLink
          className='adminPage__item'
          to="/clients"
        >
          <span className="adminPage__img adminPage__img--clients"></span>
          Клієнти
        </NavLink>
      </div>
    </div>
  );
}
