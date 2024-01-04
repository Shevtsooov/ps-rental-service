import React, { useEffect, useState } from 'react';
import './PlansAndDelivery.scss';
import { PricingTable } from '../../components/PricingTable/PricingTable';
import { PriceCalculator } from '../../components/PriceCalculator/PriceCalculator';

import { DeliveryDetails } from '../../components/DeliveryDetails/DeliveryDetails';
import { NavLink } from 'react-router-dom';

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
    </div>
  );
}
