import React, { useEffect, useState } from 'react';
import { getDayArray, monthNames } from '../../../helpers/date-transform';

import styles from './calendar.module.scss';

import { IDayInMonth } from '../../../types/IDayInMonth';

import Arrow from '../../../static/assets/icons/arrow_date.svg';
import Drop from '../../../static/assets/icons/arrow_drop_down.svg';

import { Dates } from './dates';

interface CalendarProps {
  orderDay: number | null;
  setOrderDay: React.Dispatch<React.SetStateAction<number | null>>;
}

export const Calendar: React.FC<CalendarProps> = ({orderDay, setOrderDay}) => {
  const [calendarMonth, setCalendarMonth] = useState<number>(new Date().getMonth()) ;
  const [calendarYear, setCalendarYear] = useState<number>(new Date().getFullYear());
  const [month, setMonth] = useState<IDayInMonth[]>(getDayArray(calendarMonth, calendarYear));

  useEffect(() => {
    setMonth(getDayArray(calendarMonth + 1, calendarYear))
  }, [calendarMonth, calendarYear]);

  const backMonth = () => {
    if (monthNames[calendarMonth] === 'январь') {
      setCalendarMonth(11);
      setCalendarYear(calendarYear - 1);
    } else {
      setCalendarMonth(calendarMonth - 1);
    }
  }
  const nextMonth = () => {
    if (monthNames[calendarMonth] === 'декабрь') {
      setCalendarMonth(0);
      setCalendarYear(calendarYear + 1);
    } else {
      setCalendarMonth(calendarMonth + 1);
    }
  }

  const weekDays = ['Пн', 'Вт', 'Ср' , 'Чт', 'Пт' , 'Сб', 'Вс'];

  return (
    <div className={styles.wrapper} data-test-id='calendar'>
      <div className={styles.header}>
        <div className={styles.select}>
          <label htmlFor='select'>
            <select
              data-test-id='month-select'
              className={styles.select__month}
              value={calendarMonth}
              onChange={(event => setCalendarMonth(Number(event.currentTarget.value)))}
              id='select'
              name='select'
            >
              {monthNames.map((month, index) =>
                <option className={styles.select__option} key={month} value={index} >
                  {month} {calendarYear}
                </option>
              )}
            </select>
            <span className={styles.select__caret}>
              <img src={Drop} alt='Drop' />
            </span>
          </label>
        </div>
        <div className={styles.arrow}>
          <button
            data-test-id='button-prev-month'
            onClick={backMonth}
            type='button'
            className={styles.arrow__back}>
            <img src={Arrow} alt='Arrow' />
          </button>
          <button
            data-test-id='button-next-month'
            onClick={nextMonth}
            type='button'
            className={styles.arrow__next}>
            <img src={Arrow} alt='Arrow' />
          </button>
        </div>
      </div>
      <div className={styles.days}>
        {weekDays.map(day => <p key={day}>{day}</p>)}
      </div>
      <div className={styles.calendar}>
        <Dates
          month={month}
          calendarMonth={calendarMonth}
          calendarYear={calendarYear}
          orderDay={orderDay}
          setOrderDay={setOrderDay}
           />
      </div>
    </div>
  );
};
