import React, { useEffect, useState } from 'react';
import './PlansAndDelivery.scss';
import { PricingTable } from '../../components/PricingTable/PricingTable';
import { PriceCalculator } from '../../components/PriceCalculator/PriceCalculator';

// import { Accordion } from '../../components/Accordion/Accordion';
import { DeliveryDetails } from '../../components/DeliveryDetails/DeliveryDetails';
import { NavLink } from 'react-router-dom';

// const faq = [
//   {
//     header: 'По чьом ігри?',
//     text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae ut quasi ratione sunt magnam eveniet corporis qui cumque incidunt dolorum. Est itaque illum totam et quasi dignissimos pariatur corrupti dolore.',
//     id: 1
//   },
//   {
//     header: 'Де приставка?',
//     text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae ut quasi ratione sunt magnam eveniet corporis qui cumque incidunt dolorum. Est itaque illum totam et quasi dignissimos pariatur corrupti dolore.',
//     id: 2
//   },
//   {
//     header: 'Я мать трьох дітей, можна мені на тиждень безплатно?',
//     text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae ut quasi ratione sunt magnam eveniet corporis qui cumque incidunt dolorum. Est itaque illum totam et quasi dignissimos pariatur corrupti dolore.',
//     id: 3
//   }
// ];

export const PlansAndDelivery: React.FC = () => {
  const [chosenNumber, setChosenNumber] = useState<number>(1);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({
      top: 0, left: 0,
    });

    document.title = 'Тарифи та доставка';
  }, []);

  return (
    <div className="plansPage">
      <h1 className="plansPage__title">
        Тарифи
      </h1>
      
      <div>
        <p className="plansPage__description">{`Одна гра - безкоштовно. \nКожна наступна - +100₴ до суми замовлення.`}</p>
      </div>

      <div className="plansPage__plans">
        <PricingTable 
            chosenNumber={chosenNumber}
            isCalculatorOpen={isCalculatorOpen}
          />

          <PriceCalculator
            chosenNumber={chosenNumber}
            setChosenNumber={setChosenNumber}
            isCalculatorOpen={isCalculatorOpen}
            setIsCalculatorOpen={setIsCalculatorOpen}
          />
      </div>
      
      
      <h2 className="plansPage__title">
        Доставка
      </h2>
      <p className="plansPage__description">
        Наразі ми пропонуємо два способи доставки:
      </p>

      <DeliveryDetails />

      <h3 className='plansPage__questions'>
        Залишились питання?
      </h3>

      <NavLink
        className='plansPage__button1'
        to="/contacts"
      >
        Запитати у менеджера
      </NavLink>

      {/* <h2 className="plansPage__title">
        Популярні питання
      </h2>
      <p className="plansPage__description">
        В цьому блоці ми відповідаємо на найпопулярніші запитання від наших клієнтів
      </p>

      <Accordion faq={faq} /> */}
    </div>
  );
}
