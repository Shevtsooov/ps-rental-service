import React, { useState } from 'react';
import './Calendar.scss';
import cn from 'classnames';

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

export const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [currentMonth, setCurrentMonth] = useState<number>(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState<number>(currentDate.getFullYear());

  const [start, setStart] = useState<Date | null>(null);
  const [end, setEnd] = useState<Date | null>(null);
  const [bookedPeriod, setBookedPeriod] = useState<Date[] | []>([]);

  const handleDayClick = (date: Date) => {
    if (start && end) {
      setStart(date);
      setBookedPeriod([]);
      setEnd(null);

      return;
    }

    if (start && (start.getMonth() < date.getMonth() || start.getFullYear() < date.getFullYear())) {
      setEnd(date);

      return;
    };

    if (start && start.getDate() > date.getDate()) {
      setStart(date);

      return;
    };

    if (start && start.getDate() < date.getDate()) {
      setEnd(date);

      return;
    }

    setStart(date);
    setBookedPeriod([]);
  };

  const generateBookedPeriod = () => {
    if (start && !end) {
      setBookedPeriod(state => [...state, start]);
      setStart(null);

      return;
    }

    if (start && end) {
      // Calculate the number of days between start and end (inclusive)
      const startTime = start.getTime();
      const endTime = end.getTime();
      
      for (let time = startTime; time <= endTime; time += 24 * 60 * 60 * 1000) {
        const date = new Date(time);
        setBookedPeriod(state => [...state, date]);
      }
    }

    setStart(null);
    setEnd(null);
  }

  // Function to generate days for a given month
  const generateMonthDays = (year: number, month: number) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    let firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const days = [];
    
    // Map the days of the week, starting from Monday (0 = Monday, 6 = Sunday)
    const daysOfWeek = [6, 0, 1, 2, 3, 4, 5,];
  
    // Calculate the index of the first day in the new order
    const startingIndex = daysOfWeek[firstDay];

    for (let i = 0; i < startingIndex; i++) {
      days.push(
      <div key={`empty-${i}`} className="calendar__day calendar__day--empty">
        
      </div>);
    }
  
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);

      const isDayOff = date.getDay() === 0 || date.getDay() === 6;

      const isToday = date.getDate() === currentDate.getDate()
      && date.getMonth() === currentDate.getMonth()
      && date.getFullYear() === currentDate.getFullYear();

      const IsStartEndSelected = date.getTime() === start?.getTime() || date.getTime() === end?.getTime();

      const includedSelectedDays = (start && end && date.getTime() > start?.getTime() && date.getTime() < end?.getTime())

      days.push(
        <div
          key={i}
          className={cn('calendar__day', {
            'calendar__day--off': isDayOff,
            'calendar__day--today': isToday,
            'calendar__day--selected': IsStartEndSelected,
            'calendar__day--selected_between': includedSelectedDays
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

  console.log('start - ', start?.getDate());
  console.log('end - ', end?.getDate());
  console.log('period - ', bookedPeriod);

  let amountOfDays = 'доба';

  if (bookedPeriod.length > 1) {
    amountOfDays = 'доби';
  }

  if (bookedPeriod.length > 4) {
    amountOfDays = 'діб';
  }

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
      <button onClick={generateBookedPeriod}>click</button>
      <hr />
      {bookedPeriod.length > 1 && (
        <p>{`${bookedPeriod[0].toDateString()} - ${bookedPeriod[bookedPeriod.length - 1].toDateString()}`}</p>
      )}
      <hr />
      <ul>
        {bookedPeriod.map(day => (
          <li key={day.toDateString()}>{day.toDateString()}</li>
        ))}
      </ul>
      <hr />
      {bookedPeriod.length > 0 && (
        <p>{`${bookedPeriod.length} ${amountOfDays}`}</p>
      )}
    </div>
  );
};
