import './Delivery.scss';
import selfPickup from '../../assets/images/self-pickup.png'
import shipping from '../../assets/images/shipping.png'
import { useEffect, useState } from 'react';
import { openDelivery } from '../../Redux/Slices/isDeliveryShown.slice';
import { useAppSelector, useAppDispatch } from '../../Redux/store';
import { setChosenDelivery } from '../../Redux/Slices/chosenDelivery.slice';
import { DeliveryModal } from '../DeliveryModal/DeliveryModal';
import cn from 'classnames';

interface ErrorType {
  noDaysSelected: boolean,
  noDeliverySelected: boolean,
};

type Props = {
  error: ErrorType,
};

export const Delivery: React.FC<Props> = ({ error }) => {
  const isDeliveryShown = useAppSelector(state => state.isDeliveryShown.value);
  const chosenDelivery = useAppSelector(state => state.chosenDelivery.value);
  const savedAddress = useAppSelector(state => state.savedAddress.value);
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
  }, [isDeliveryShown]);

  const handleOpenDelivery = () => {
    dispatch(openDelivery());
  };

  const handleChooseDelivery = (delivery: string) => {
    setSelectedDelivery(delivery);
    dispatch(setChosenDelivery(delivery));
  };

  let shippingWay = chosenDelivery === '' || chosenDelivery === 'Доставка'
  ? 'Доставка'
  : 'Самовивіз'

  return (
    <div className="delivery" onClick={handleOpenDelivery}>
      {isDeliveryShown && (
        <DeliveryModal
          chosenDelivery={chosenDelivery}
          handleChooseDelivery={handleChooseDelivery}
        />
      )}

      <div className="delivery__img">
        <img
          src={chosenDelivery === "Самовивіз"
            ? selfPickup
            : shipping}
          alt={chosenDelivery === "Самовивіз"
            ? "Самовивіз"
            : "Доставка"}
          className="delivery__img_icon"
        />
      </div>
      
      <div className="delivery__info">
        <p className="delivery__info_heading">{shippingWay}</p>

        {chosenDelivery === 'Доставка' && (
          <p className="delivery__info_price">
            {savedAddress
              ? `100₴ - ${savedAddress}`
              : "100₴ - будь ласка, вкажіть адресу"}
          </p>
        )}

        {chosenDelivery === 'Самовивіз' && (
          <p className="delivery__info_text">
            Менеджер зв'яжеться з вами після замовлення для уточнення деталей.
          </p>
        )}

        {!chosenDelivery && (
          <p className={cn("delivery__info_button", {
            "delivery__info_button--error": error.noDeliverySelected
          })}>
            Оберіть спосіб доставки
          </p>
        )}
      </div>
    </div>
  );
}
