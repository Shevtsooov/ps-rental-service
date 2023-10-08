import React, { useCallback, useEffect, useState } from 'react';
import './Calendar.scss';
import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../../Redux/store';
import { resetSelectedDays, setSelectedDays } from '../../Redux/Slices/selectedDays.slice';
import { setBookedDays } from '../../Redux/Slices/bookedDays.slice';

const months = [
  'Січень',
  'Лютий',
  'Березень',
  'Квітень',
  'Травень',
  'Червень',
  'Липень',
  'Серпень',
  'Вересень',
  'Жовтень',
   'Листопад',
   'Грудень',
];
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

export const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [currentMonth, setCurrentMonth] = useState<number>(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState<number>(currentDate.getFullYear());

  // const [start, setStart] = useState<Date | null>(null);
  // const [end, setEnd] = useState<Date | null>(null);
  // const [selectedDays, setSelectedDays] = useState<Date[]>([]);
  // const [bookedDays, setBookedDays] = useState<Date[]>([]);

  const [selectedDays, setSelectedDays] = useState<string[]>(() => {
    const storedDays = localStorage.getItem('storedDays');
    const parsedDays = storedDays ? JSON.parse(storedDays) : [];
    
    if (parsedDays.length > 0) {
      return parsedDays;
    }
    
    return []; // Default to an empty array if no data is in localStorage.
  });

  const [selectedStart, setSelectedStart] = useState<string>(() => {
    const storedStart = localStorage.getItem('storedStart');
    const parsedStart = storedStart ? JSON.parse(storedStart) : '';
    
    if (parsedStart.length > 0) {
      return parsedStart;
    }
    
    return ''; // Default to an empty array if no data is in localStorage.
  });
  const [selectedEnd, setSelectedEnd] = useState<string>(() => {
    const storedEnd = localStorage.getItem('storedEnd');
    const parsedEnd = storedEnd ? JSON.parse(storedEnd) : '';
    
    if (parsedEnd.length > 0) {
      return parsedEnd;
    }
    
    return ''; // Default to an empty array if no data is in localStorage.
  });

  // const selectedDays = useAppSelector(state => state.selectedDays.value);
  const bookedDays = useAppSelector(state => state.bookedDays.value);
  const dispatch = useAppDispatch();

  useEffect(() => {
    localStorage.setItem("storedDays", JSON.stringify(selectedDays));
    localStorage.setItem("storedStart", JSON.stringify(selectedStart));
    localStorage.setItem("storedEnd", JSON.stringify(selectedEnd));
  }, [selectedStart, selectedEnd, selectedDays]);


const handleDayClick = (date: Date) => {
  const startDate = new Date(selectedStart);

  if (startDate && selectedEnd) {
    setSelectedStart(date.toDateString());
    setSelectedEnd('');
    // setSelectedDays([date.toDateString()]); // Update selectedDays with a single date
    return;
  }

  if (startDate && startDate > date) {
    setSelectedStart(date.toDateString());
    // setSelectedDays([date.toDateString()]); // Update selectedDays with a single date
    return;
  }

  if (selectedStart && startDate < date) {
    setSelectedEnd(date.toDateString());
    // const selectedDates = getDatesBetween(start, date);
    // setSelectedDays(selectedDates); // Update selectedDays with a range of dates
    return;
  }

  setSelectedStart(date.toDateString());
  // setSelectedDays([date.toDateString()]); // Update selectedDays with a single date
};

  const generateSelectedDays = useCallback(() => {
    // dispatch(resetSelectedDays());
    setSelectedDays([]);
  
    if (selectedStart && selectedEnd) {
      // Calculate the number of days between start and end (inclusive)
      const startTime = new Date(selectedStart).getTime();
      const endTime = new Date(selectedEnd).getTime();
  
      for (let time = startTime; time <= endTime; time += 24 * 60 * 60 * 1000) {
        const date = new Date(time);
        // dispatch(setSelectedDays(date));
        setSelectedDays(days => [...days, date.toDateString()])
      }
    } else if (selectedStart) {
      // dispatch(setSelectedDays([start]));
      setSelectedDays([selectedStart]);
    }
  }, [selectedStart, selectedEnd]);
  
  useEffect(() => {
    if (selectedStart || selectedEnd) {
      generateSelectedDays();
    }
  }, [selectedStart, selectedEnd, generateSelectedDays]);

  // const handleBookDays = () => {
  //   const isOverBooking = bookedDays.some(bDay => (
  //     selectedDays.includes(bDay.toDateString())
  //     ));

  //     console.log(isOverBooking);

  //   if (isOverBooking) {
  //     alert('overbooking');

  //     return;
  //   }

  //   dispatch(setBookedDays(selectedDays));
  //   setSelectedStart('');
  // }

  // Function to generate days for a given month
  const generateMonthDays = (year: number, month: number) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    let firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const days = [];
    
    const daysOfWeek = [6, 0, 1, 2, 3, 4, 5,];
  
    const startingIndex = daysOfWeek[firstDay];

    for (let i = 0; i < startingIndex; i++) {
      days.push(
      <div key={`empty-${i}`} className="calendar__day calendar__day--empty">
        
      </div>);
    }
  
    for (let i = 1; i <= daysInMonth; i++) {

      const startDate = new Date(selectedStart);
      const endDate = new Date(selectedEnd);
      const date = new Date(year, month, i);

      const isDayOff = date.getDay() === 0 || date.getDay() === 6;

      const isToday = date.getDate() === currentDate.getDate()
      && date.getMonth() === currentDate.getMonth()
      && date.getFullYear() === currentDate.getFullYear();

      const IsStartEndSelected = date.getTime() === startDate?.getTime() || date.getTime() === endDate?.getTime();

      const includedSelectedDays = (startDate && endDate && date.getTime() > startDate?.getTime() && date.getTime() < endDate?.getTime());

      const isDisabled = date.getDate() < currentDate.getDate()
      && date.getMonth() === currentDate.getMonth()
      && date.getFullYear() === currentDate.getFullYear();

      const isBooked = bookedDays && bookedDays.some(item => item.getTime() === date.getTime());

      days.push(
        <div
          key={i}
          className={cn('calendar__day', {
            'calendar__day--off': isDayOff,
            'calendar__day--today': isToday,
            'calendar__day--selected': IsStartEndSelected,
            'calendar__day--selected_between': includedSelectedDays,
            'calendar__day--disabled': isDisabled || isBooked
          })}
          onClick={() => handleDayClick(date)}
        >
          {i}
        </div>
      );
    }
  
    return days;
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear => currentYear + 1);

      return;
    }

    setCurrentMonth(month => month + 1);
  };

  const handlePreviousMonth = () => {
    if (currentYear !== currentDate.getFullYear() && currentMonth === 0) {
      setCurrentYear(currentYear => currentYear - 1);
      setCurrentMonth(11);

      return;
    }

    if (currentMonth === currentDate.getMonth() && currentYear === currentDate.getFullYear()) {
      return;
    }

    setCurrentMonth(month => month - 1);
  }

  // console.log('start - ', start?.getDate());
  // console.log('end - ', end?.getDate());
  // console.log('selectedDays - ', selectedDays);
  // console.log('selectedDays in LS - ', selectedDays[0]);
  // console.log('selectedDays in LS - ', typeof selectedDays[0]);
  // console.log('selectedDays in LS - ', JSON.parse(selectedDays[0]));

  // console.log('bookedDays - ', bookedDays);

  // let amountOfDays = 'доба';

  // if (selectedDays.length > 1) {
  //   amountOfDays = 'доби';
  // }

  // if (selectedDays.length > 4) {
  //   amountOfDays = 'діб';
  // }

  // const daysInLS = [];

  // for (let i = 0; i > selectedDays.length; i++) {
  //   daysInLS.push(new Date(selectedDays[i]));
  // }

  // const today = new Date();
  // const todayString = today.toDateString();
  // const todayRev = new Date(todayString);
  
  // console.log(today);
  // console.log(todayString);
  // console.log(todayRev);

  return (
    <div className="calendar">
      <header className="calendar__header">
        <button onClick={handlePreviousMonth}>П</button>
        <h2>{`${months[currentMonth]}, ${currentYear}`}</h2>
        <button onClick={handleNextMonth}>Н</button>
      </header>

      <div className="calendar__days">
        <div className="calendar__day">Пн</div>
        <div className="calendar__day">Вт</div>
        <div className="calendar__day">Ср</div>
        <div className="calendar__day">Чт</div>
        <div className="calendar__day">Пт</div>
        <div className="calendar__day calendar__day--off">Сб</div>
        <div className="calendar__day calendar__day--off">Нд</div>
      </div>

      <div className="calendar__grid">
        {generateMonthDays(currentYear, currentMonth)}
      </div>

      {/* <button onClick={handleBookDays}>click</button> */}
      <hr />

      {/* {selectedDays?.length > 1 && (
        <p>
          {`${selectedDays[0].getDate()} ${monthsSelected[selectedDays[0].getMonth()]} - ${selectedDays[selectedDays.length - 1].getDate()} ${monthsSelected[selectedDays[selectedDays.length - 1].getMonth()]}`}
        </p>
      )}
      
      <hr />

      <ul>
        {selectedDays?.map(day => (
          <li key={day.toDateString()}>
            {day.toDateString()}
            {`${day.getDate()} ${monthsSelected[day.getMonth()]}`}
            </li>
        ))}
      </ul>

      <hr />

      {selectedDays?.length > 0 && (
        <p>{`${selectedDays.length} ${amountOfDays}`}</p>
      )} */}
      
    </div>
  );
};
