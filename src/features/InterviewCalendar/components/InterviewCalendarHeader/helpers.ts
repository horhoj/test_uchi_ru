import { add } from 'date-fns';

export const getDateList = (startViewDate: Date): Date[] => {
  const dateList: Date[] = [];

  for (let i = 0; i < 7; i++) {
    const currentDate = add(startViewDate, { days: i });
    dateList.push(currentDate);
  }

  return dateList;
};
