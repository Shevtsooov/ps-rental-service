import './DeliveryDetails.scss';
import shipping from '../../assets/images/shipping.png'
import selfPickup from '../../assets/images/self-pickup.png'
import { useState } from 'react';
import cn from "classnames";

export const DeliveryDetails: React.FC = () => {
  const [openDelivery, setOpenDelivery] = useState<string>('');

  const handleToggleDelivery = (delivery: string) => {
    if (openDelivery === delivery) {
      setOpenDelivery('');

      return;
    }

    setOpenDelivery(delivery);
  }
  
  return (
    <div className='deliveryDetailsBlock'>
      <div
        className='deliveryDetails'
        onClick={() => handleToggleDelivery('Самовивіз')}
      >

        <img
          src={`${selfPickup}`}
          alt="Самовивіз"
          className="deliveryDetails__icon"
        />

        <div className="deliveryDetails__info">
          <p className="deliveryDetails__info_heading">
            Самовивіз
          </p>
        </div>

        <button
          className={cn('deliveryDetails__arrow', {
            'deliveryDetails__arrow--active': openDelivery === 'Самовивіз'
          })}
        />

        {openDelivery === 'Самовивіз' && (
          <p className="deliveryDetails__description">
            {`Якщо обираєте саме цей спосіб доставки - менеджер зв'яжеться з вами після замовлення для уточнення всіх деталей.`}
          </p>
        )}

      </div>

      <div
        className='deliveryDetails'
        onClick={() => handleToggleDelivery('Доставка')}
      >

        <img
          src={`${shipping}`}
          alt="Доставка"
          className="deliveryDetails__icon"
        />

        <div className="deliveryDetails__info">
          <p className="deliveryDetails__info_heading">
              Доставка по Львову
          </p>

          <p className="deliveryDetails__info_desc">
            100₴
          </p>
        </div>

        <button
          className={cn('deliveryDetails__arrow', {
            'deliveryDetails__arrow--active': openDelivery === 'Доставка'
          })}
        />

        {openDelivery === 'Доставка' && (
          <p className="deliveryDetails__description">
            {`Доставка в межах Львова в будь-який район міста.\n\nТакож, якщо ви проживаєте недалеко за межами Львова - можемо розлянути ваш запит та узгодити деталі такої доставки`}
          </p>
        )}
      </div>
    </div>
  );
}
