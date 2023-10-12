import './Delivery.scss';
import selfPickup from '../../assets/images/self-pickup.png'
import shipping from '../../assets/images/shipping.png'
import { useEffect, useState } from 'react';
import { openDelivery } from '../../Redux/Slices/isDeliveryShown.slice';
import { useAppSelector, useAppDispatch } from '../../Redux/store';
import cn from 'classnames';
import { setChosenDelivery } from '../../Redux/Slices/chosenDelivery.slice';

export const Delivery: React.FC = () => {
  const isDeliveryShown = useAppSelector(state => state.isDeliveryShown.value);
  const chosenDelivery = useAppSelector(state => state.chosenDelivery.value);
  const dispatch = useAppDispatch();

  const [selectedDelivery, setSelectedDelivery] = useState<string>(() => {
    const storedDelivery = sessionStorage.getItem('storedDelivery');
    const parsedDelivery = storedDelivery ? JSON.parse(storedDelivery) : '';
    
    if (parsedDelivery.length !== '') {
      return parsedDelivery;
    }
    
    return '';
  });

  useEffect(() => {
    sessionStorage.setItem("storedDelivery", JSON.stringify(selectedDelivery));
  }, [selectedDelivery]);

  useEffect(() => {
    if (isDeliveryShown) {
      document.body.style.overflow = 'hidden';

      return;
    }

    document.body.style.overflow = 'auto'
  }, [isDeliveryShown])

  const handleOpenDelivery = () => {
    dispatch(openDelivery());
  }

  let shippingWay = chosenDelivery === '' || chosenDelivery === 'Доставка'
    ? 'Доставка'
    : 'Самовивіз'

  const handleChooseDelivery = (delivery: string) => {
    setSelectedDelivery(delivery);
    dispatch(setChosenDelivery(delivery));
  }

  return (
      <div className="delivery" onClick={handleOpenDelivery}>

        {isDeliveryShown && (
          <div className="delivery__modal">
            <h4 className="delivery__modal_title">
              Оберіть спосіб доставки
            </h4>

            <div
              className={cn('delivery__modal_option', {
                'delivery__modal_option--active': chosenDelivery === 'Доставка'
              })}
              onClick={() => handleChooseDelivery('Доставка')}
            >
                <img
                  src={`${shipping}`}
                  alt="Доставка"
                  className="delivery__modal_icon"
                />
              <div className="delivery__info">
                <p className="delivery__info_heading">Доставка по Львову</p>
                <p className="delivery__info_price">100₴</p>
              </div>
            </div>

            <div
              className={cn('delivery__modal_option', {
                'delivery__modal_option--active': chosenDelivery === 'Самовивіз'
              })}
              onClick={() => handleChooseDelivery('Самовивіз')}
            >
                <img
                  src={`${selfPickup}`}
                  alt="Доставка"
                  className="delivery__modal_icon"
                />
              <div className="delivery__info">
                <p className="delivery__info_heading">Самовивіз</p>
                <p className="delivery__info_price">Сихівський район</p>
              </div>
            </div>
          </div>
        )}

        {(chosenDelivery === '' || chosenDelivery === 'Доставка') && (
          <div className="delivery__img">
            <img
              src={`${shipping}`}
              alt="Доставка"
              className="delivery__img_icon"
            />
          </div>)}
          
          {selectedDelivery === 'Самовивіз' && (
            <div className="delivery__img">
              <img
                src={`${selfPickup}`}
                alt="Самовивіз"
                className="delivery__img_icon"
              />
            </div>
          )}
        
        <div className="delivery__info">
            <p className="delivery__info_heading">
              {shippingWay}
            </p>

            {chosenDelivery === 'Доставка' && (
              <p className="delivery__info_price">100₴</p>
            )}

            {chosenDelivery === 'Самовивіз' && (
              <p className="delivery__info_text">
                Менеджер зв'яжеться з вами після замовлення для уточнення деталей.
              </p>
            )}
            {chosenDelivery === '' && (
              <p 
                className="delivery__info_button"
              >
                Оберіть спосіб доставки
              </p>
            )}
        </div>
      </div>
  );
}
