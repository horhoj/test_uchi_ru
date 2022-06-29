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
    const currentDayOfWeek = currentEventDateTime.getDay() - 1;
    const currentHours = currentEventDateTime.getHours();
    // console.log(currentEventDateTime, currentDayOfWeek, currentHours);

    dataMatrix[createDataMatrixKey(currentDayOfWeek, currentHours)] = true;
  });

  return dataMatrix;
};
