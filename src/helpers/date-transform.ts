import { IDayInMonth } from '../types/IDayInMonth';

export const getDate = (str: string) => {
  const date = new Date(str);
  const monthArr = [
    '',
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря'
  ];
  const day = date.getUTCDate() < 10 ? `0${date.getUTCDate()}` : date.getUTCDate();
  const year = date.getUTCFullYear();
  const month = monthArr[date.getMonth() + 1];

  return `${day} ${month} ${year}`;
}

export const getShortDate = (str: string) => {
  const date = new Date(str);
  const day = date.getUTCDate() < 10 ? `0${date.getUTCDate()}` : date.getUTCDate();
  const month = date.getUTCMonth() + 1 < 10 ? `0${date.getUTCMonth() + 1}` : date.getUTCMonth() + 1;

  return `${day}.${month}`;
}

export const monthNames = [
  'январь',
  'февраль',
  'март',
  'апрель',
  'май',
  'июнь',
  'июль',
  'август',
  'сентябрь',
  'октябрь',
  'ноябрь',
  'декабрь'
];


export const getDayArray = (month: number, year: number): IDayInMonth[] => {
  const daysInCurrentMonth = new Date(year, month, 0).getDate();
  const daysInPreviousMonth = new Date(year, month - 1, 0).getDate();

  const firstDayMonthInWeek = new Date(year, month - 1, 1).getDay() || 7;
  const arr: IDayInMonth[] = [];

  for (let i = 0; i < daysInCurrentMonth; i++) {
    arr[firstDayMonthInWeek - 1 + i] = { day: i + 1, current: true };
  }

  if (firstDayMonthInWeek !== 1) {
    for (let i = 0; i < firstDayMonthInWeek - 1; i++) {
      arr[i] = { day: daysInPreviousMonth - firstDayMonthInWeek + 2 + i, current: false };
    }
  }

  const arrLength = arr.length;
  for (let i = arrLength; i < (arrLength < 35 ? 35 : 42); i++) {
    arr.push({ day: i - arrLength + 1, current: false });
  }

  return arr;
};

export const getNextPossibleDate = (currentDay: number, dayOfWeek: number) => {
  const daysToAdd = dayOfWeek === 5 ? 3 : dayOfWeek === 6 ? 2 : 1;
  return currentDay + daysToAdd;
}

export const dateTransformer = (day?: number) => {
  const date = new Date();
  const year = date.getUTCFullYear().toString();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const orderDay = (day ?? date.getDate()).toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');

  return `${year}-${month}-${orderDay}T${hours}:${minutes}:${seconds}.000Z`;
}

export const isDateOverdue = (orderDate: string, todayDate: string): boolean => {
  const order = new Date(orderDate);
  const today = new Date(todayDate);
  const isYearOverdue = order.getFullYear() < today.getFullYear();
  const isMonthOverdue = order.getMonth() + 1 < today.getMonth() + 1;
  const isDayOverdue = order.getDate() < today.getDate();

  return isDayOverdue || isMonthOverdue || isYearOverdue;
}
