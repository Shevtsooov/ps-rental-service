import React, { useState } from 'react';
import './PlansAndDelivery.scss';
import { PricingTable } from '../../components/PricingTable/PricingTable';
import { PriceCalculator } from '../../components/PriceCalculator/PriceCalculator';


export const PlansAndDelivery: React.FC = () => {
  const [chosenNumber, setChosenNumber] = useState<number>(1);

  return (
    <div className="plansPage">
      <h1 className="plansPage__title">
        Тарифи
      </h1>
      
      <div>
        <p className="plansPage__description">Одна гра - безкоштовно.</p>
        <p className="plansPage__description">Кожна наступна - +100₴ до суми замовлення.</p>
      </div>

      <PricingTable 
        chosenNumber={chosenNumber}
      />

      <PriceCalculator
        chosenNumber={chosenNumber}
        setChosenNumber={setChosenNumber}
      />
      
      <h2 className="plansPage__title">
        Доставка
      </h2>
      <p>
        Наразі ми пропонуємо два способи доставки:
      </p>
    </div>
  );
}
