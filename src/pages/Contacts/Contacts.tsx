import React, { useEffect } from 'react';
import './Contacts.scss';
import nazar from '../../assets/images/nazar.png'
import sergiy from '../../assets/images/sergiy.png'
import igor from '../../assets/images/igor.png'

const contacts = [
  {
    link: "https://t.me/nazar_ua_ua",
    img: nazar,
    name: "Назарій",
    nickname: "@nazar_ua_ua"
  },
  {
    link: "https://t.me/SseevaA",
    img: sergiy,
    name: "Сергій",
    nickname: "@SseevaA"
  },
  {
    link: "https://t.me/Shevtsooov",
    img: igor,
    name: "Ігор",
    nickname: "@Shevtsooov"
  },
]

export const Contacts: React.FC = () => {
  
  useEffect(() => {
    window.scrollTo({
      top: 0, left: 0,
    });

    document.title = 'Контакти';
  }, []);
  
  return (
    <div className='contacts'>
      <h1 className='contacts__title'>Контакти</h1>

      {contacts.map(contact => (
        <a
          href={`${contact.link}`}
          className='contacts__item'
          key={contact.name}
        >
        <div className='contacts__itemImg'>
          <img
            className='contacts__img'
            src={`${contact.img}`}
            alt={`${contact.name}`}
          />
          <span
            className='contacts__telegram'
          />
        </div>
 
  
          <div className='contacts__info'>
            <h2 className='contacts__name'>{contact.name}</h2>
            <p className='contacts__nickname'>{contact.nickname}</p>
          </div>
        </a>
      ))}

      <p className='contacts__notice'>Наші менеджери раді допомогти вам з будь-якими питаннями відносно прокату.</p>
      <p className='contacts__notice'>Зверніть увагу, що ми доступні з 10:00 по 20:00.</p>
      <p className='contacts__notice'>Залишайте свої питання, і ми з радістю дамо на них відповіді протягом цього періоду.</p>
      <p className='contacts__notice'>Дякуємо за розуміння та чекаємо на ваші повідомлення!</p>
 
    </div>
  );
}
