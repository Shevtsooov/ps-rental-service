import './PSShoppingCartInfo.scss';
import Playstation from '../../assets/images/ps-shopping-cart.png'
import { useEffect, useState } from 'react';

const monthsSelected = [
  'cічня',
  'лютого',
  'березня',
  'квітня',
  'травня',
  'червня',
  'липня',
  'серпень',
  'вересня',
  'жовтня',
  'листопада',
  'грудня',
];

const daysOfWeek = [
  'Нд',
  'Пн',
  'Вт',
  'Ср',
  'Чт',
  'Пт',
  'Сб',
]

export const PSShoppingCartInfo: React.FC = () => {
  const [selectedDays, setSelectedDays] = useState<string[]>(() => {
    const storedDays = localStorage.getItem('storedDays');
    const parsedDays = storedDays ? JSON.parse(storedDays) : [];
    
    if (parsedDays.length > 0) {
      return parsedDays;
    }
    
    return []; // Default to an empty array if no data is in localStorage.
  });

  const selectedPeriod = [];

  for (let i = 0; i < selectedDays.length; i++) {
   selectedPeriod.push(new Date(selectedDays[i]))
  }

  const firstDay = selectedPeriod[0];
  const lastDay = selectedPeriod[selectedPeriod.length - 1];

  useEffect(() => {
    localStorage.setItem("storedDays", JSON.stringify(selectedDays));
  }, [selectedDays]);

  const days = 1;

  let psPricing = 450;

  if (days > 2) {
    psPricing = 350; 
  }

  if (days > 6) {
    psPricing = 300; 
  }

   let amountOfDays = 'доба';

  if (selectedPeriod.length > 1) {
    amountOfDays = 'доби';
  }

  if (selectedPeriod.length > 4) {
    amountOfDays = 'діб';
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
            {/* <p 
              className="psShoppingCartInfo__info_booking_period"
            >
              1 жовтня(пт) - 3 жовтня(нд)
            </p> */}
            {selectedPeriod?.length > 1 && (
              <p 
                className="psShoppingCartInfo__info_booking_period"
              >
                {`${firstDay.getDate()} ${monthsSelected[firstDay.getMonth()]} (${daysOfWeek[firstDay.getDay()]}) - ${selectedPeriod[selectedPeriod.length - 1].getDate()} ${monthsSelected[selectedPeriod[selectedPeriod.length - 1].getMonth()]} (${daysOfWeek[lastDay.getDay()]})`}
              </p>
            )}
            {selectedPeriod?.length == 1 && (
              <p className="psShoppingCartInfo__info_booking_period">
                {`${selectedPeriod[0].getDate()} ${monthsSelected[selectedPeriod[0].getMonth()]}`}
              </p>
            )}
            <p 
              className="psShoppingCartInfo__info_booking_days"
            >
              {`${selectedPeriod.length} ${amountOfDays}`}
            </p>
          </div>
        </div>
      </div>
  );
}
