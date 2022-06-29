import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  isMatch,
  isValid,
  nextMonday,
  previousMonday,
  startOfWeek,
  startOfHour,
  endOfHour,
  addDays,
  addHours,
} from 'date-fns';
import { LastAddEventDateTimeOperationStatus, MatrixItem } from '../types';
import { SLICE_NAME } from './types';
import { defaultData } from './defaultData';

interface InitialState {
  startViewDate: number;
  eventDateTimeList: number[];
  lastEventDateTimeValue: string;
  lastAddEventDateTimeOperationStatus: LastAddEventDateTimeOperationStatus;
  currentMatrixItem: MatrixItem | null;
}

const initialState: InitialState = {
  startViewDate: startOfWeek(new Date(), { weekStartsOn: 1 }).getTime(),
  eventDateTimeList: defaultData,
  lastEventDateTimeValue: '',
  lastAddEventDateTimeOperationStatus: { value: null },
  currentMatrixItem: null,
};

const DATE_MASK = 'yyyy-MM-dd HH:mm:ss';

export const { actions, reducer } = createSlice({
  initialState,
  name: SLICE_NAME,
  reducers: {
    goToNextWeek: (state) => {
      state.startViewDate = nextMonday(state.startViewDate).getTime();
      state.currentMatrixItem = null;
    },

    goToPreviousWeek: (state) => {
      state.startViewDate = previousMonday(state.startViewDate).getTime();
      state.currentMatrixItem = null;
    },

    addEvent: (state, action: PayloadAction<string>) => {
      state.lastEventDateTimeValue = action.payload;
      // а вот здесь я делаю дополнительную проверку введенного значения по регулярке,
      //так как date-fns, несмотря на указанную маску все равно принимает довольно странные значения
      // типа 12-12-12 12:12:12, а 21-12-12 12:12:12 уже вызывает ошибку
      //к сожалению не удалось выяснить причины подобной интерпретации
      const checkPayload =
        /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(action.payload) &&
        isMatch(action.payload, DATE_MASK) &&
        isValid(new Date(action.payload));
      //в общем если введенное время не соответствует формату
      //то в статусе пишем сообщение об ошибке "incorrectDateTime"
      if (!checkPayload) {
        state.lastAddEventDateTimeOperationStatus = {
          value: 'incorrectDateTime',
        };
        return;
      }
      //получаем время события в числовой форме
      const currentEventDateTime = new Date(action.payload).getTime();
      //получаем время начала и конца текущего часа
      const currentStartOfHour = startOfHour(currentEventDateTime).getTime();
      const currentEndOfHour = endOfHour(currentEventDateTime).getTime();
      // console.log(new Date(currentStartOfHour), new Date(currentEndOfHour));
      //отфильтровываем события которые попадают в один и тот же час с новым событием
      const oldEventDateTimeList: number[] = state.eventDateTimeList.filter(
        (eventDateTime) =>
          eventDateTime >= currentStartOfHour &&
          eventDateTime <= currentEndOfHour,
      );
      // ЕСЛИ В ТЕЧЕНИИ ЧАСА В КОТОРЫЙ ПОПАДАЕТ ВВЕДЕННОЕ ВРЕМЯ УЖЕ ЕСТЬ ЗАПЛАНИРОВАННОЕ СОБЫТИЕ
      // ТОГДА ОТКЛОНЯЕМ ВВОД ДАННЫХ
      if (oldEventDateTimeList.length !== 0) {
        state.lastAddEventDateTimeOperationStatus = { value: 'timeIsBusy' };
        return;
      }
      //если все проверки прошли успешно, то добавляем новое событие
      //и сообщаем об успехе
      state.eventDateTimeList.push(currentEventDateTime);
      state.lastAddEventDateTimeOperationStatus = { value: 'success' };
    },

    clear: (state) => {
      state.lastEventDateTimeValue = '';
      state.lastAddEventDateTimeOperationStatus = { value: null };
      state.currentMatrixItem = null;
    },

    goToDate: (state, action: PayloadAction<number>) => {
      state.startViewDate = startOfWeek(action.payload, {
        weekStartsOn: 1,
      }).getTime();
      state.currentMatrixItem = null;
    },

    setCurrentMatrixItem: (state, action: PayloadAction<MatrixItem | null>) => {
      state.currentMatrixItem = action.payload;
    },

    deleteCurrentEvent: (state) => {
      if (state.currentMatrixItem) {
        const { dayOfWeekIndex, timeIndex } = state.currentMatrixItem;

        const currentDate = addDays(
          state.startViewDate,
          dayOfWeekIndex,
        ).getTime();

        const currentStartHour = addHours(currentDate, timeIndex).getTime();
        const currentEndHour = endOfHour(currentStartHour).getTime();

        state.eventDateTimeList = state.eventDateTimeList.filter(
          (eventDateTime) =>
            eventDateTime < currentStartHour || eventDateTime > currentEndHour,
        );

        state.currentMatrixItem = null;
      }
    },
  },
});
