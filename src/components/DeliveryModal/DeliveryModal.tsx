import './DeliveryModal.scss';
import cn from 'classnames';
import shipping from '../../assets/images/shipping.png'
import selfPickup from '../../assets/images/self-pickup.png'
import { resetSavedAddress, setSavedAddress } from '../../Redux/Slices/savedAddress.slice';
import { useAppSelector, useAppDispatch } from '../../Redux/store';

type Props = {
  chosenDelivery: string,
  handleChooseDelivery: (option: string) => void,
};

export const DeliveryModal: React.FC<Props> = ({
  chosenDelivery,
  handleChooseDelivery,
}) => {
  const savedAddress = useAppSelector(state => state.savedAddress.value);
  const dispatch = useAppDispatch();

  const handleTypeInAddress = (address: string) => {
    dispatch(setSavedAddress(address));
  }

  const handleResetAddress = () => {
    dispatch(resetSavedAddress());
  }

  return (
    <div className="deliveryModal">
      <h4 className="deliveryModal__title">
        Оберіть спосіб доставки
      </h4>

      <div
        className={cn('deliveryModal__option', {
          'deliveryModal__option--active': chosenDelivery === 'Доставка'
        })}
        onClick={() => handleChooseDelivery('Доставка')}
      >
        <img

          src={`${shipping}`}
          alt="Доставка"
          className="deliveryModal__icon"
        />

        <div className="deliveryModal__info">
          <p className="deliveryModal__info_heading">
            Доставка по Львову
          </p>

          <p className="deliveryModal__info_desc">200₴</p>

          <div
            className={cn('deliveryModal__option_address', {
              'deliveryModal__option_address--active': chosenDelivery === 'Доставка'
            })}
          >
            <input
              className="deliveryModal__option_address--input"
              type="text"
              placeholder='Вкажіть адресу'
              value={savedAddress}
              onChange={(e) => handleTypeInAddress(e.target.value)}
            />
            {savedAddress !== '' && (
            <span
              className="deliveryModal__option_address--clear"
              onClick={handleResetAddress}
            />)}
          </div>
        </div>
      </div>

      <div
        className={cn('deliveryModal__option', {
          'deliveryModal__option--active': chosenDelivery === 'Самовивіз'
        })}
        onClick={() => handleChooseDelivery('Самовивіз')}
      >
          <img
            src={`${selfPickup}`}
            alt="Доставка"
            className="deliveryModal__icon"
          />
        <div className="deliveryModal__info">
          <p className="deliveryModal__info_heading">Самовивіз</p>
          <p className="deliveryModal__info_desc">Сихівський район</p>
        </div>
      </div>
    </div>
  );
}
