import { addDays, startOfDay } from 'date-fns';

const currentStartOfDay = startOfDay(new Date().getTime()).getTime();

export const defaultData: number[] = [
  //на текущий день с часа до двух
  currentStartOfDay + 3600 * 1000,
  //на предыдущий день с часа до двух
  currentStartOfDay - 24 * 3600 * 1000 + 3600 * 1000,
  //на предыдущий день с двух до трех
  currentStartOfDay - 24 * 3600 * 1000 + 3600 * 2 * 1000,
  //на неделю назад с двух до трех
  addDays(currentStartOfDay, -7).getTime() + 3600 * 2 * 1000,
  //на неделю назад с трех до четырех
  addDays(currentStartOfDay, -7).getTime() + 3600 * 3 * 1000,
  //на неделю вперед с двух до трех
  addDays(currentStartOfDay, 7).getTime() + 3600 * 2 * 1000,
  //на неделю вперед с трех до четырех
  addDays(currentStartOfDay, 7).getTime() + 3600 * 3 * 1000,
];

console.log(
  'Это массив с дефолтными датами событий',
  defaultData.map((date) => new Date(date)),
);
