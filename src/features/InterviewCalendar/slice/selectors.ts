import { createSelector } from '@reduxjs/toolkit';
import { endOfWeek } from 'date-fns';
import { RootState } from '../../../store/types';
import { LastAddEventDateTimeOperationStatus, MatrixItem } from '../types';

export const getStartOfWeekDate = (state: RootState): number =>
  state.interviewCalendar.startViewDate;

const getEventDateTimeList = (state: RootState): number[] =>
  state.interviewCalendar.eventDateTimeList;

//этот селектор возвращает только текущие EventDateTime
//т.е. те которые на текущей выбранной недели
export const getCurrentEventDateTimeList = createSelector(
  getStartOfWeekDate,
  getEventDateTimeList,
  (startOfWeekDate, eventDateTimeList) => {
    const endOfWeekDate = endOfWeek(startOfWeekDate, {
      weekStartsOn: 1,
    }).getTime();
    // console.log(new Date(startOfWeekDate), '|', new Date(endOfWeekDate));
    return eventDateTimeList.filter(
      (eventDateTime) =>
        eventDateTime >= startOfWeekDate && eventDateTime <= endOfWeekDate,
    );
  },
);

export const getLastEventDateTimeValue = (state: RootState): string =>
  state.interviewCalendar.lastEventDateTimeValue;

export const getLastAddEventDateTimeOperationStatus = (
  state: RootState,
): LastAddEventDateTimeOperationStatus =>
  state.interviewCalendar.lastAddEventDateTimeOperationStatus;

export const getCurrentMatrixItem = (state: RootState): MatrixItem | null =>
  state.interviewCalendar.currentMatrixItem;
