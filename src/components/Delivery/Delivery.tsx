import './Delivery.scss';
import selfPickup from '../../assets/images/self-pickup.png'
import shipping from '../../assets/images/shipping.png'
import { useEffect, useState } from 'react';
import { openDelivery } from '../../Redux/Slices/isDeliveryShown.slice';
import { useAppSelector, useAppDispatch } from '../../Redux/store';
import { setChosenDelivery } from '../../Redux/Slices/chosenDelivery.slice';
import { DeliveryModal } from '../DeliveryModal/DeliveryModal';


export const Delivery: React.FC = () => {
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

  // const [savedAddress, setSavedAddress] = useState<string>(() => {
  //   const storedAddress = localStorage.getItem('savedAddress');
  //   const parsedAddress = storedAddress ? JSON.parse(storedAddress) : '';
    
  //   if (parsedAddress.length !== '') {
  //     return parsedAddress;
  //   }
    
  //   return '';
  // });

  useEffect(() => {
    sessionStorage.setItem("storedDelivery", JSON.stringify(selectedDelivery));
    // localStorage.setItem("savedAddress", JSON.stringify(savedAddress));
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
          <p className="delivery__info_button">
            Оберіть спосіб доставки
          </p>
        )}
      </div>
    </div>
  );
}
