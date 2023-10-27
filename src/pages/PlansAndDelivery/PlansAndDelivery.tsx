import React, { useState } from 'react';
import './PlansAndDelivery.scss';
import { PricingTable } from '../../components/PricingTable/PricingTable';
import { PriceCalculator } from '../../components/PriceCalculator/PriceCalculator';

import shipping from '../../assets/images/shipping.png'
import selfPickup from '../../assets/images/self-pickup.png'
import { Accordion } from '../../components/Accordion/Accordion';

const faq = [
  {
    header: 'По чьом ігри?',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae ut quasi ratione sunt magnam eveniet corporis qui cumque incidunt dolorum. Est itaque illum totam et quasi dignissimos pariatur corrupti dolore.',
    id: 1
  },
  {
    header: 'Де приставка?',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae ut quasi ratione sunt magnam eveniet corporis qui cumque incidunt dolorum. Est itaque illum totam et quasi dignissimos pariatur corrupti dolore.',
    id: 2
  },
  {
    header: 'Я мать трьох дітей, можна мені на тиждень безплатно?',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae ut quasi ratione sunt magnam eveniet corporis qui cumque incidunt dolorum. Est itaque illum totam et quasi dignissimos pariatur corrupti dolore.',
    id: 3
  }
]

export const PlansAndDelivery: React.FC = () => {
  const [chosenNumber, setChosenNumber] = useState<number>(1);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);

  return (
    <div className="plansPage">
      <h1 className="plansPage__title">
        Тарифи
      </h1>
      
      <div>
        <p className="plansPage__description">{`Одна гра - безкоштовно. \nКожна наступна - +100₴ до суми замовлення.`}</p>
      </div>

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
      
      <h2 className="plansPage__title">
        Доставка
      </h2>
      <p className="plansPage__description">
        Наразі ми пропонуємо два способи доставки:
      </p>

      <div className='plansPage__deliveryOption'>
        <img
          src={`${selfPickup}`}
          alt="Доставка"
          className="plansPage__deliveryOption__icon"
        />

        <div className="plansPage__deliveryOption__info">
          <p className="plansPage__deliveryOption__info_heading">
            Самовивіз
          </p>

          <p className="plansPage__deliveryOption__info_desc">
            Сихівський район
          </p>
        </div>
      </div>

      <div className='plansPage__deliveryOption'>
        <img
          src={`${shipping}`}
          alt="Доставка"
          className="plansPage__deliveryOption__icon"
        />

        <div className="plansPage__deliveryOption__info">
          <p className="plansPage__deliveryOption__info_heading">
              Доставка по Львову
          </p>

          <p className="plansPage__deliveryOption__info_desc">
            100₴
          </p>
        </div>
      </div>

      <h2 className="plansPage__title">
        Часті запитання
      </h2>
      <p className="plansPage__description">
        В цьому блоці ми відповідаємо на найпопулярніші запитання
      </p>

      <Accordion faq={faq} />
    </div>
  );
}
