import './FullPrice.scss';
import price from '../../assets/images/price.png'

type Props = {
  finalPrice: number,
};

export const FullPrice: React.FC<Props> = ({ finalPrice }) => {
  return (
    <div className="fullPrice">
     
      <div className="fullPrice__img">
        <img
          src={price}
          alt="Загальна вартість"
          className="fullPrice__img_icon"
        />
      </div>
      
      <div className="fullPrice__info">
        <p className="fullPrice__info_heading">Загальна вартість</p>

        <p className="fullPrice__info_price">
          {`${finalPrice}₴`}
        </p>
      </div>
    </div>
  );
}
