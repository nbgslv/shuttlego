import {parse, parseISO} from 'date-fns';

export const dateToString = (date) => {
  if (typeof date !== 'object') {
    date = parseISO(date);
  }
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  return `${year}-${month + 1}-${day}`;
};

export const dateToTimeString = (date) => {
  if (typeof date !== 'object') {
    date = parseISO(date);
  }
  const dateStr = date.toString();
  const i = dateStr.indexOf(':');
  const hour = dateStr.substring(i, i - 2);
  const minute = dateStr.substring(i + 1, i + 3);
  return {
    hour,
    minute,
  };
};
