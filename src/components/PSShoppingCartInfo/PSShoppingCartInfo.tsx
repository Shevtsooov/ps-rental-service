import './PSShoppingCartInfo.scss';
import Playstation from '../../assets/images/ps-shopping-cart.png'
import { useEffect, useState } from 'react';
import { Calendar } from '../Calendar/Calendar';
import { render } from 'react-dom';

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
  const [isCalendarShown, setIsCalendarShown] = useState(false);
  const [selectedDays, setSelectedDays] = useState<string[]>(() => {
    const storedDays = localStorage.getItem('storedDays');
    const parsedDays = storedDays ? JSON.parse(storedDays) : [];

    if (parsedDays.length > 0) {
      return parsedDays;
    }

    return []; // Default to an empty array if no data is in localStorage.
  });

  useEffect(() => {
    // Define a function to handle changes in localStorage
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'storedDays') {
        // Update the state with the new data from localStorage
        setSelectedDays(JSON.parse(e.newValue || '[]'));
      }
    };

    // Add an event listener to listen for storage changes
    window.addEventListener('storage', handleStorageChange);

    return () => {
      // Remove the event listener when the component unmounts
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []); // This effect runs once during component initialization

  // for (let i = 0; i < selectedDays.length; i++) {
  //  selectedPeriod.push(new Date(selectedDays[i]))
  // }

  const firstDay = new Date(selectedDays[0]);
  const lastDay = new Date(selectedDays[selectedDays.length - 1]);

  const days = 1;

  let psPricing = 450;

  if (days > 2) {
    psPricing = 350; 
  }

  if (days > 6) {
    psPricing = 300; 
  }

   let amountOfDays = 'доба';

  if (selectedDays.length > 1) {
    amountOfDays = 'доби';
  }

  if (selectedDays.length > 4) {
    amountOfDays = 'діб';
  }

  return (
      <div className="psShoppingCartInfo">

        {isCalendarShown && (
          <div className="psShoppingCartInfo__calendar">
            <Calendar />
          </div>
        )}

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
            {selectedDays?.length > 1 && (
              <p 
                className="psShoppingCartInfo__info_booking_period"
                onClick={() => setIsCalendarShown(prev => !prev)}
              >
                {`${firstDay.getDate()} ${monthsSelected[firstDay.getMonth()]} (${daysOfWeek[firstDay.getDay()]}) - ${lastDay.getDate()} ${monthsSelected[lastDay.getMonth()]} (${daysOfWeek[lastDay.getDay()]})`}
              </p>
            )}
            {selectedDays?.length === 1 && (
              <p className="psShoppingCartInfo__info_booking_period">
                {`${firstDay.getDate()} ${monthsSelected[firstDay.getMonth()]}`}
              </p>
            )}
            <p 
              className="psShoppingCartInfo__info_booking_days"
            >
              {`${selectedDays.length} ${amountOfDays}`}
            </p>
          </div>
        </div>
      </div>
  );
}
