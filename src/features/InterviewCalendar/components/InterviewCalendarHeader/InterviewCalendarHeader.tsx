import { FC, useMemo } from 'react';
import styled, { css } from 'styled-components';
import { isToday } from 'date-fns';
import { useAppSelector } from '../../../../store/hooks';
import { interviewCalendarSlice } from '../../slice';
import { TIME_COLUMN_WIDTH } from '../../const';
import { getDateList } from './helpers';

const DAY_LABEL_LIST = ['M', 'T', 'W', 'T', 'F', 'S', 'S'] as const;

export const InterviewCalendarHeader: FC = () => {
  const startViewDate = useAppSelector(
    interviewCalendarSlice.selectors.getStartOfWeekDate,
  );

  const dateList = useMemo(
    () => getDateList(new Date(startViewDate)),
    [startViewDate],
  );

  return (
    <SWrap>
      {dateList.map((date, index) => (
        <SDateLabel key={date.getTime()}>
          <SDayOfWeekLabel>{DAY_LABEL_LIST[index]}</SDayOfWeekLabel>
          <SDayLabel isToday={isToday(date)}>{date.getDate()}</SDayLabel>
        </SDateLabel>
      ))}
    </SWrap>
  );
};

const SWrap = styled.div`
  padding-left: ${TIME_COLUMN_WIDTH}px;
  border-top: 2px solid #ccc;
  border-left: 2px solid #ccc;
  border-right: 2px solid #ccc;
  padding-top: 15px;
  background-color: #eee;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;

const SDateLabel = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const SDayOfWeekLabel = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  font-weight: 500;
`;

const SDayLabel = styled.div<{ isToday: boolean }>`
  display: flex;
  justify-content: center;
  width: 40px;
  height: 40px;
  align-items: center;
  margin-top: 10px;
  font-size: 24px;
  font-weight: 500;
  ${(props) => (props.isToday ? SDayLabelIsTodayCSSHelper : '')};
`;

const SDayLabelIsTodayCSSHelper = css`
  background-color: red;
  border-radius: 50%;
  color: white;
`;
