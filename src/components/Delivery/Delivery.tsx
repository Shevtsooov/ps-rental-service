import './Delivery.scss';
import DeliveryImg from '../../assets/images/shipping.png'

export const Delivery: React.FC = () => {

  return (
      <div className="delivery">
        <div className="delivery__img">
          <img
            src={`${DeliveryImg}`}
            alt="Shipping"
            className="delivery__img_icon"
          />
        </div>

        <div className="delivery__info">
            <p className="delivery__info_heading">Доставка</p>
            <p className="delivery__info_price">100₴</p>
        </div>
      </div>
  );
}
