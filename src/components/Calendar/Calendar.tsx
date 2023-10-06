import React, { useState } from 'react';
import './Calendar.scss';

// const months = {
//   0: 'Січень',
//   1: 'Лютий',
//   2: 'Березень',
//   3: 'Квітень',
//   4: 'Травень',
//   5: 'Червень',
//   6: 'Липень',
//   7: 'Серпень',
//   8: 'Вересень',
//   9: 'Жовтень',
//   10: 'Листопад',
//   11: 'Грудень',
// };

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

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [start, setStart] = useState<Date | null>(null);
  const [end, setEnd] = useState<Date | null>(null);


  // console.log(typeof firstDay);
  // console.log(firstDay.getDay());

  const handleDayClick = (date: Date) => {
    setStart(date);
  };

  // Function to generate days for a given month
  const generateMonthDays = (year: number, month: number) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    let firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const days = [];
    
    // Map the days of the week, starting from Monday (0 = Monday, 6 = Sunday)
    const daysOfWeek = [6, 0, 1, 2, 3, 4, 5,];

    console.log(daysOfWeek[firstDay])
  
    // Calculate the index of the first day in the new order
    const startingIndex = daysOfWeek[firstDay];
  
    for (let i = 0; i < startingIndex; i++) {
      days.push(
      <div key={`empty-${i}`} className="calendar__day calendar__day--empty">
        
      </div>);
    }
  
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      days.push(
        <div
          key={i}
          className={`calendar__day ${
            date.getTime() === selectedDate?.getTime()
            ? 'calendar__day--selected'
            : ''
          }`}
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
        <div className="calendar__day">Сб</div>
        <div className="calendar__day">Нд</div>
      </div>

      <div className="calendar__grid">
        {generateMonthDays(currentYear, currentMonth)}
      </div>
    </div>
  );
};
