import { DataMatrix } from '../../types';

export const createDataMatrixKey = (dayOfWeek: number, hours: number): string =>
  `${dayOfWeek}_${hours}`;

export const getDataMatrix = (
  currentEventDateTimeList: number[],
): DataMatrix => {
  const dataMatrix: DataMatrix = {};
  //заполняем матрицу данных для вывода занятых ячеек символизирующих EventDateTime
  currentEventDateTimeList.forEach((eventDateTime) => {
    const currentEventDateTime = new Date(eventDateTime);
    //1 отнимаем так как неделя у нас с понедельника, а не с воскресенья
    const dayOfWeek = currentEventDateTime.getDay() - 1;
    //кольцевой переход для воскресенья
    const currentDayOfWeek = dayOfWeek >= 0 ? dayOfWeek : 6;

    const currentHours = currentEventDateTime.getHours();
    console.log(currentEventDateTime, currentDayOfWeek, currentHours);

    dataMatrix[createDataMatrixKey(currentDayOfWeek, currentHours)] = true;
  });

  return dataMatrix;
};
