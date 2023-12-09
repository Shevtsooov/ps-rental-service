import { useEffect, useState } from 'react';
import cn from 'classnames';
import './PriceCalculator.scss';
import { useNavigate } from 'react-router-dom';

type Props = {
  chosenNumber: number
  setChosenNumber: React.Dispatch<React.SetStateAction<number>>,
  isCalculatorOpen: boolean
  setIsCalculatorOpen: React.Dispatch<React.SetStateAction<boolean>>,
};

export const PriceCalculator: React.FC<Props> = ({
  chosenNumber,
  setChosenNumber,
  isCalculatorOpen,
  setIsCalculatorOpen,
}) => {
  const [correctForm, setCorrectForm] = useState<string>('добу');
  const [price, setPrice] = useState<number>(450);
  const [sum, setSum] = useState<number>(450);
  const [chosenDelivery, setChosenDelivery] = useState<string>('Самовивіз');
  const [deliveryPrice, setDeliveryPrice] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (chosenNumber > 1) {
      setCorrectForm('доби')
    }
    if (chosenNumber > 4) {
      setCorrectForm('діб')
    }
    if (chosenNumber === 1) {
      setCorrectForm('добу')
    }

    if (chosenNumber < 3) {
      setPrice(450);
    } else if (chosenNumber > 6) {
      setPrice(350);
    } else {
      setPrice(400);
    }

    setSum((chosenNumber * price) + deliveryPrice);
  }, [chosenNumber, deliveryPrice]);

  useEffect(() => {
    setSum((chosenNumber * price) + deliveryPrice);
  }, [price, deliveryPrice]);

  useEffect(() => {
    if (chosenDelivery === 'Доставка') {
      setDeliveryPrice(200);
      
      return;
    }

    setDeliveryPrice(0);
  }, [chosenDelivery]);


  const handleAddDay = () => {
    if (chosenNumber === 20) {
      return;
    }
    setChosenNumber(number => number + 1);
  }

  const handleSubtractDay = () => {
    if (chosenNumber === 1) {
      return;
    }

    setChosenNumber(number => number - 1);
  };

  const goToShoppingCart = () => {
    navigate("/shopping-cart");
  }

  return (
    <div className="priceCalculator">
      <div
        className="priceCalculator__title"
        onClick={() => setIsCalculatorOpen(!isCalculatorOpen)}
      >
        <h2 className="priceCalculator__title--text">Калькулятор</h2>
        <button
          className={cn('priceCalculator__title--arrow', {
            'priceCalculator__title--arrow--active': isCalculatorOpen
          })}
        />
      </div>
      {isCalculatorOpen && (
        <>
          <p
            className="priceCalculator__description"
          >
            Загальну суму з іграми можна підрахувати
            <span
              className="priceCalculator__link"
              onClick={goToShoppingCart}
            >
              тут
            </span>
          </p>
          
          <div className="calculator">
            <p className="calculator__sum">{`${sum}₴`}</p>

            <p>за</p>

            <div className="calculator__nod">
              <p className="calculator__nod--number">
                {chosenNumber}
              </p>

              <p className="calculator__nod--correctForm">{correctForm}</p>
            </div>

            <div className="calculator__actions">
              <button
                className="calculator__actions_button calculator__actions--add"
                onClick={handleAddDay}
              />

              <button
                className="calculator__actions_button calculator__actions--subtract"
                onClick={handleSubtractDay}
              />
            </div>
          </div>
          <div className="calculator__delivery">
            <div
              className={cn('calculator__delivery_option', {
                'calculator__delivery_option--active': chosenDelivery === 'Самовивіз'
              })}
              onClick={() => setChosenDelivery('Самовивіз')}
            >
              Самовивіз
            </div>

            <div 
              className={cn('calculator__delivery_option', {
                'calculator__delivery_option--active': chosenDelivery === 'Доставка'
              })}
              onClick={() => setChosenDelivery('Доставка')}
            >
              Доставка
            </div>
          </div>
        </>
      )}
    </div>
  );
}
