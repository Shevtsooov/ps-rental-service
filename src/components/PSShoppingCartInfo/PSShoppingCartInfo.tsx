import './PSShoppingCartInfo.scss';
import Playstation from '../../assets/images/ps-shopping-cart.png'
import { useEffect, useState } from 'react';
import { Calendar } from '../Calendar/Calendar';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../Redux/store';
import { daysOfWeek, monthsSelected } from '../../helpers/CorrectDateNames';
import { resetBookedDays, setBookedDays } from '../../Redux/Slices/bookedDays.slice';

export const PSShoppingCartInfo: React.FC = () => {
  const [isCalendarShown, setIsCalendarShown] = useState(false);
  const [selectedDays, setSelectedDays] = useState<string[]>(() => {
    const storedDays = sessionStorage.getItem('storedDays');
    const parsedDays = storedDays ? JSON.parse(storedDays) : [];
    
    if (parsedDays.length > 0) {
      return parsedDays;
    }
    
    return [];
  });

  const bookedDays = useAppSelector(state => state.bookedDays.value);
  const dispatch = useAppDispatch();
  
  const toggleCalendar = () => {
    setIsCalendarShown(state => !state);
  };

  useEffect(() => {
    sessionStorage.setItem("storedDays", JSON.stringify(selectedDays));
  }, [selectedDays]);

  useEffect(() => {
    dispatch(resetBookedDays());

    selectedDays.map(day => (
      dispatch(setBookedDays(day))
    ))
      console.log('bookedDays - ', bookedDays);
  }, []);

  const firstDay = new Date(bookedDays[0]);
  const lastDay = new Date(bookedDays[bookedDays.length - 1]);

  let psPricing = 450;

  if (bookedDays.length > 2) {
    psPricing = 350; 
  }

  if (bookedDays.length > 6) {
    psPricing = 300; 
  }

   let amountOfDays = 'доба';

  if (bookedDays.length > 1) {
    amountOfDays = 'доби';
  }

  if (bookedDays.length > 4) {
    amountOfDays = 'діб';
  }


  return (
      <div className="psShoppingCartInfo">

        {isCalendarShown && (
          <div className="psShoppingCartInfo__calendar">
            <button
              className="psShoppingCartInfo__calendar_button"
              onClick={toggleCalendar}
            >X</button>
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
          {bookedDays.length === 0 && (
            <p 
              className="psShoppingCartInfo__info_booking_period"
              onClick={toggleCalendar}
            >
              Обрати дати
            </p>)}
            {bookedDays?.length > 1 && (
              <p 
                className="psShoppingCartInfo__info_booking_period"
                onClick={toggleCalendar}
              >
                {`${firstDay.getDate()} ${monthsSelected[firstDay.getMonth()]} (${daysOfWeek[firstDay.getDay()]}) - ${lastDay.getDate()} ${monthsSelected[lastDay.getMonth()]} (${daysOfWeek[lastDay.getDay()]})`}
              </p>
            )}
            {bookedDays?.length === 1 && (
              <p
                className="psShoppingCartInfo__info_booking_period"
                onClick={toggleCalendar}
              >
                {`${firstDay.getDate()} ${monthsSelected[firstDay.getMonth()]}`}
              </p>
            )}
             {bookedDays?.length > 0 && (
            <p 
              className="psShoppingCartInfo__info_booking_days"
            >
              {`${bookedDays.length} ${amountOfDays}`}
            </p>)}
          </div>
        </div>
      </div>
  );
};
