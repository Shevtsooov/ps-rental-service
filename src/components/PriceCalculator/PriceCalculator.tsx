import { useEffect, useState } from 'react';
import './PriceCalculator.scss';

export const PriceCalculator: React.FC = () => {
  const [chosenNumber, setChosenNumber] = useState<number>(1);
  const [correctForm, setCorrectForm] = useState<string>('добу');
  const [price, setPrice] = useState<number>(450);
  const [sum, setSum] = useState<number>(450);

  useEffect(() => {
    if (chosenNumber > 1) {
      setCorrectForm('доби')
    }
    if (chosenNumber > 4) {
      setCorrectForm('діб')
    }
    setSum(chosenNumber * price)
  }, [chosenNumber]);

  const handleUpdateNumber = (number: number) => {
    setChosenNumber(number);

    if (chosenNumber > 2) {
      setPrice(400);

      return;
    }

    if (chosenNumber > 6) {
      setPrice(350);

      return
    }

    setPrice(450);
  };

  return (
    <div className="priceCalculator">
      <h4>
        Калькулятор
      </h4>

      <div>
        <p>
          Беру на 
        </p>
        <input
          type="number"
          value={chosenNumber}
          onChange={(e) => handleUpdateNumber(+e.target.value)}
        />
        <p>{`${correctForm}, плачу`}</p>
        <p>{sum}</p>
      </div>
    </div>
  );
}
