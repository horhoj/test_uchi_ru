import { configureStore } from '@reduxjs/toolkit';
import { interviewCalendarSlice } from '../features/InterviewCalendar/slice';
import { appSlice } from './app';

export const store = configureStore({
  devTools: true,
  reducer: {
    app: appSlice.reducer,
    interviewCalendar: interviewCalendarSlice.reducer,
  },
});
