import './PSShoppingCartInfo.scss';
import Playstation from '../../assets/images/ps-shopping-cart.png'

export const PSShoppingCartInfo: React.FC = () => {
  const days = 1;

  let psPricing = 450;

  if (days > 2) {
    psPricing = 350; 
  }

  if (days > 6) {
    psPricing = 300; 
  }

  return (
      <div className="psShoppingCartInfo">

        <div className="psShoppingCartInfo__img">
          <img
            src={`${Playstation}`}
            alt="Playstation"
            className="psShoppingCartInfo__img_icon"
          />
        </div>

        <div className="psShoppingCartInfo__info">
          <h5 className="psShoppingCartInfo__info_title">
            Playstation 5
          </h5>
        
          <p className="psShoppingCartInfo__info_price">
            {`${psPricing}₴ за добу`}
          </p>

          <div className="psShoppingCartInfo__info_booking">
            <p 
              className="psShoppingCartInfo__info_booking_period"
            >
              1 жовтня(пт) - 3 жовтня(нд)
            </p>
            <p 
              className="psShoppingCartInfo__info_booking_days"
            >
              {`${days} дні`}
            </p>
          </div>
        </div>
      </div>
  );
}
