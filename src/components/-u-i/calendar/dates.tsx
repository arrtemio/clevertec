import React from 'react';
import { getNextPossibleDate } from '../../../helpers/date-transform';

import { IDayInMonth } from '../../../types/IDayInMonth';

import './style.css'

interface DatesProps {
  month: IDayInMonth[];
  calendarMonth: number;
  calendarYear: number;
  orderDay: number | null;
  setOrderDay: React.Dispatch<React.SetStateAction<number | null>>;
}

const currentDay = new Date().getDate();
const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth();
const dayOfWeek = new Date().getDay() === 0 ? 7 : new Date().getDay();

export const Dates: React.FC<DatesProps> =
  ({
     month,
     calendarMonth,
     calendarYear,
     orderDay,
     setOrderDay
  }) => {

  const isMonthAndYearCurrent = (currentMonth === calendarMonth) && (currentYear === calendarYear);
  const nextPossibleDay = getNextPossibleDate(currentDay, dayOfWeek);

  return (
    <>
      {month.map((item, index) => {
        const isCurrentDay = item.day === currentDay;

        if (isCurrentDay && isMonthAndYearCurrent && (dayOfWeek === 6 || dayOfWeek === 7)) {
          return (
            <button
              key={Math.random()}
              type='button'
              className='weekend'
              disabled={true}
            >
              <span className='weekend__today'>{item.day}</span>
            </button>
          );
        }

        if (((index + 2) % 7) === 0 && item.current && (index + 1)
          || ((index + 1) % 7) === 0 && item.current && (index + 1)) {
          return (
            <button
              key={Math.random()}
              type='button'
              className='weekend'
              disabled={true}
            >
              <span className='weekend__day'>{item.day}</span>
            </button>
          );
        }

        if (((index + 2) % 7) !== 0 && item.current && (index + 1)
          && isCurrentDay && isMonthAndYearCurrent
          || ((index + 1) % 7) !== 0 && item.current && (index + 1)
          && isCurrentDay && isMonthAndYearCurrent) {
          return (
            <button
              key={Math.random()}
              type='button'
              className={item.day === orderDay ? 'selected' : 'current'}
              onClick={() => setOrderDay(item.day)}
            >
              <span className={item.day === orderDay ? 'selected_day' : 'current_day'}>
                {item.day}
              </span>
            </button>
          );
        }

        if (item.day === nextPossibleDay && item.current && isMonthAndYearCurrent) {
          return (
            <button
              key={Math.random()}
              type='button'
              className={item.day === orderDay ? 'selected' : 'current'}
              onClick={() => setOrderDay(item.day)}
            >
              <span className={item.day === orderDay ? 'selected_day' : 'current_regular'}>
                {item.day}
              </span>
            </button>
          );
        }

        return (
          <button
            key={Math.random()}
            type='button'
            className='regular'
            data-test-id='day-button'
          >
            {item.day}
          </button>
        );
      })}
    </>
  );
};
