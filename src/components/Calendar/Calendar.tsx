import React, { useCallback, useEffect, useState } from 'react';
import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../../Redux/store';
import {
  resetBookedDays,
  setBookedDays,
} from '../../Redux/Slices/bookedDays.slice';
import { months } from '../../helpers/CorrectDateNames';
import './Calendar.scss';
import { decreaseMonthLookUpLimit, increaseMonthLookUpLimit, resetMonthLookUpLimit } from '../../Redux/Slices/monthLookUpLimit';
import { useGetAllOrdersQuery } from '../../Redux/RTK_Query/orders.service';
import { Loader } from '../Loader/Loader';

export const Calendar: React.FC = () => {
  const {data: allTheOrders} = useGetAllOrdersQuery();
  const [currentDate] = useState<Date>(new Date());
  const [currentMonth, setCurrentMonth] = useState<number>(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState<number>(currentDate.getFullYear());
  const [serverBookedDays, setServerBookedDays] = useState<string[]>([]);

  const [selectedDays, setSelectedDays] = useState<string[]>(() => {
    const storedDays = sessionStorage.getItem('storedDays');
    const parsedDays = storedDays ? JSON.parse(storedDays) : [];
    
    if (parsedDays.length > 0) {
      return parsedDays;
    }
    
    return [];
  });

  const [selectedStart, setSelectedStart] = useState<string>(() => {
    const storedStart = sessionStorage.getItem('storedStart');
    const parsedStart = storedStart ? JSON.parse(storedStart) : '';
    
    if (parsedStart.length > 0) {
      return parsedStart;
    }
    
    return '';
  });
  const [selectedEnd, setSelectedEnd] = useState<string>(() => {
    const storedEnd = sessionStorage.getItem('storedEnd');
    const parsedEnd = storedEnd ? JSON.parse(storedEnd) : '';
    
    if (parsedEnd.length > 0) {
      return parsedEnd;
    }
    
    return '';
  });

  const monthLookUpLimit = useAppSelector(state => state.monthLookUpLimit.value);
  const bookedDays = useAppSelector(state => state.bookedDays.value);
  const dispatch = useAppDispatch();

  useEffect(() => {
    sessionStorage.setItem("storedDays", JSON.stringify(selectedDays));
    sessionStorage.setItem("storedStart", JSON.stringify(selectedStart));
    sessionStorage.setItem("storedEnd", JSON.stringify(selectedEnd));
  }, [selectedStart, selectedEnd, selectedDays]);


const handleDayClick = (date: Date) => {
  const startDate = new Date(selectedStart);

  if (startDate && selectedEnd) {
    setSelectedStart(date.toDateString());
    setSelectedEnd('');

    return;
  }

  if (startDate && startDate > date) {
    setSelectedStart(date.toDateString());

    return;
  }

  if (startDate && 1123200000 < date.getTime() - startDate.getTime()) {
    setSelectedStart(date.toDateString());

    return;
  }

  if (startDate && startDate < date) {
    setSelectedEnd(date.toDateString());

    return;
  }

  setSelectedStart(date.toDateString());
};

  const generateSelectedDays = useCallback(() => {
    setSelectedDays([]);
    dispatch(resetBookedDays());

    if (selectedStart && selectedEnd) {
      // Calculate the number of days between start and end (inclusive)
      const startTime = new Date(selectedStart).getTime();
      const endTime = new Date(selectedEnd).getTime();
  
      for (let time = startTime; time <= endTime; time += 24 * 60 * 60 * 1000) {
        const date = new Date(time);

        const isOverlapping = serverBookedDays?.includes(date.toString().slice(4, 15))

        if (isOverlapping) {
            setSelectedStart('');
            setSelectedEnd('');
            setSelectedDays([]);
            dispatch(resetBookedDays());
            
            return;
        }
        
        setSelectedDays(days => [...days, date.toDateString()]);
        dispatch(setBookedDays(date.toDateString()));

        if (isOverlapping) {
          setSelectedStart('');
          setSelectedEnd('');
          setSelectedDays([]);
          dispatch(resetBookedDays());
          
          return;
        }
      }

    } else if (selectedStart) {
      setSelectedDays([selectedStart]);
      dispatch(setBookedDays(selectedStart))
    }

  }, [selectedStart, selectedEnd, dispatch]);
  
  useEffect(() => {
    let arr: string[] = [];

    const serverBookedDays = allTheOrders?.forEach(order => {
      if (order.orderStatus !== 'Скасоване' ) {
        arr = [ ...arr, ...order.bookedDays ];
      }
    });

    setServerBookedDays(arr);
  }, [selectedStart, selectedEnd, allTheOrders]);

  useEffect(() => {
    if (selectedStart || selectedEnd) {
      generateSelectedDays();
    }
  }, [selectedStart, selectedEnd, generateSelectedDays]);

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

      const dateString = date.toString().slice(4, 15);

      const isBooked = serverBookedDays?.some(item => item === dateString);

      days.push(
        <div
          key={date.toString()}
          className={cn('calendar__day', {
            'calendar__day--off': isDayOff,
            'calendar__day--today': isToday,
            'calendar__day--selected': IsStartEndSelected,
            'calendar__day--selected_between': includedSelectedDays,
            'calendar__day--disabled': isDisabled,
            'calendar__day--booked': isBooked 
          })}
          onClick={() => handleDayClick(date)}
        >
          {i}
        </div>
      );
    }
  
    return days;
  };

  const handleNextMonth = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation()
    console.log('click');

    if (monthLookUpLimit === 2) {
      return;
    }

    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear => currentYear + 1);
      dispatch(increaseMonthLookUpLimit());

      return;
    }

    setCurrentMonth(month => month + 1);
    dispatch(increaseMonthLookUpLimit());
  };

  const handlePreviousMonth = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation()
    if (currentYear !== currentDate.getFullYear() && currentMonth === 0) {
      setCurrentYear(currentYear => currentYear - 1);
      setCurrentMonth(11);
      dispatch(decreaseMonthLookUpLimit());

      return;
    }

    if (currentMonth === currentDate.getMonth() && currentYear === currentDate.getFullYear()) {
      return;
    }

    setCurrentMonth(month => month - 1);
    dispatch(decreaseMonthLookUpLimit());
  };

  useEffect(() => {
    return () => {
      dispatch(resetMonthLookUpLimit())
    }
  }, []);

  return (
    <>
      {allTheOrders
        ? (
          <div className="calendar">
            <header className="calendar__header">
              <button
                onClick={(e) => handlePreviousMonth(e)}
                className="calendar__button calendar__previousButton"
              />

              <h2
                className="calendar__title"
              >{`${months[currentMonth]}, ${currentYear}`}</h2>

              <button
                onClick={(e) => handleNextMonth(e)}
                className="calendar__button calendar__nextButton"
              />
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

            <div className="calendar__legend">
              <div className="calendar__legend_passed">
                <div className="calendar__legend_passed--day">
                  6
                </div>
                <div className="calendar__legend_passed--text">
                  - минулі дати
                </div>
              </div>

              <div className="calendar__legend_booked">
                <div className="calendar__legend_booked--day">
                  17
                </div>
                <div className="calendar__legend_booked--text">
                  - заброньовані дати
                </div>
              </div>

              <div className="calendar__legend_available">
                <div className="calendar__legend_available--day">
                  10
                </div>
                <div className="calendar__legend_available--text">
                  - доступні дати
                </div>
              </div>
            </div>    
          </div>
        )
        : <Loader />  
      }
    </>
  );
};
