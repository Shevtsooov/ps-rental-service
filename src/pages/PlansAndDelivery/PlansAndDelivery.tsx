import React from 'react';
import './PlansAndDelivery.scss';
import { PricingTable } from '../../components/PricingTable/PricingTable';
import { PriceCalculator } from '../../components/PriceCalculator/PriceCalculator';


export const PlansAndDelivery: React.FC = () => {

  return (
    <div className="plansPage">
      <h1 className="plansPage__title">
        Тарифи
      </h1>

      <PricingTable />

      <PriceCalculator />
      
      <h2 className="plansPage__title">
        Доставка
      </h2>
      <p>
        Наразі ми пропонуємо два способи доставки:
      </p>
    </div>
  );
}
