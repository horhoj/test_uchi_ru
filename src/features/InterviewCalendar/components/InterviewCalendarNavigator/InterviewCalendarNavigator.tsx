import { FC } from 'react';
import styled from 'styled-components';
import { nextThursday } from 'date-fns';
import { TIME_COLUMN_WIDTH } from '../../const';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { interviewCalendarSlice } from '../../slice';

const MONTH_LABEL_LIST = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const;

export const InterviewCalendarNavigator: FC = () => {
  const startViewDate = useAppSelector(
    interviewCalendarSlice.selectors.getStartOfWeekDate,
  );

  //отображаемый месяц и год берем из четверга текущей недели
  const primaryDate = nextThursday(startViewDate);
  const primaryMonth = primaryDate.getMonth();
  const primaryYear = primaryDate.getFullYear();

  const dispatch = useAppDispatch();

  const handleGoToNextWeek = () => {
    dispatch(interviewCalendarSlice.actions.goToNextWeek());
  };

  const handleGoToPreviousWeek = () => {
    dispatch(interviewCalendarSlice.actions.goToPreviousWeek());
  };

  return (
    <SWrap>
      <SCenter>
        <SButton onClick={handleGoToPreviousWeek}>{'<'}</SButton>
      </SCenter>
      <SCenter>
        <SMonthLabel>
          {MONTH_LABEL_LIST[primaryMonth]} {primaryYear}
        </SMonthLabel>
      </SCenter>
      <SCenter>
        <SButton onClick={handleGoToNextWeek}>{'>'}</SButton>
      </SCenter>
    </SWrap>
  );
};

const SWrap = styled.div`
  padding-left: ${TIME_COLUMN_WIDTH}px;
  display: grid;
  grid-template-columns: 1fr 5fr 1fr;
  border-bottom: 2px solid #ccc;
  border-left: 2px solid #ccc;
  border-right: 2px solid #ccc;
  background-color: #eee;
`;

const SCenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SButton = styled.button`
  font-size: 40px;
  font-weight: 300;
  color: red;
  background-color: rgba(0, 0, 0, 0);
  padding: 5px 10px;
  border: none;
  cursor: pointer;
  user-select: none;

  &:hover {
    font-weight: 400;
  }
`;

const SMonthLabel = styled.div`
  font-size: 20px;
  font-weight: 500;
`;
