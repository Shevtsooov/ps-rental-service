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

  const handleOpenDelivery = () => {
    dispatch(openDelivery());
  }

  const shippingWay = selectedDelivery === 'Доставка'
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
                'delivery__modal_option--active': selectedDelivery === 'Доставка'
              })}
              onClick={() => handleChooseDelivery('Доставка')}
            >
                <img
                  src={`${shipping}`}
                  alt="Доставка"
                  className="delivery__modal_icon"
                />
              <div className="delivery__info">
                <p className="delivery__info_heading">Доставка</p>
                <p className="delivery__info_price">100₴</p>
              </div>
            </div>

            <div
              className={cn('delivery__modal_option', {
                'delivery__modal_option--active': selectedDelivery === 'Самовивіз'
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

        {selectedDelivery === 'Доставка'
          ? (
            <div className="delivery__img">
              <img
                src={`${shipping}`}
                alt="Доставка"
                className="delivery__img_icon"
              />
            </div>
          )
          : (
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
              {selectedDelivery === ''
                ? shippingWay
                : 'Доставка'
              }
            </p>

            {selectedDelivery === 'Доставка' && (
              <p className="delivery__info_price">100₴</p>
            )}

            {selectedDelivery === 'Самовивіз' && (
              <p className="delivery__info_text">
                Менеджер зв'яжеться з вами після замовлення для уточнення деталей.
              </p>
            )}
            {selectedDelivery === '' && (
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
