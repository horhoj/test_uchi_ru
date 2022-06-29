import { FC, useEffect } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { interviewCalendarSlice } from '../../slice';

const PROMPT_MSG_INPUT = 'Enter event time:\n YYYY-MM-DD HH:mm:ss';
const PROMPT_MSG_INPUT_ERROR = 'wrong format, please fix!!!';
const PROMPT_MSG_TIME_IS_BUSY = 'time is busy!!!';
const PROMPT_MSG_SUCCESS = 'success!!!';

export const InterviewCalendarTitle: FC = () => {
  const dispatch = useAppDispatch();
  const lastEventDateTimeValue = useAppSelector(
    interviewCalendarSlice.selectors.getLastEventDateTimeValue,
  );

  const lastAddEventDateTimeOperationStatus = useAppSelector(
    interviewCalendarSlice.selectors.getLastAddEventDateTimeOperationStatus,
  );

  console.log(lastAddEventDateTimeOperationStatus);

  useEffect(() => {
    if (lastAddEventDateTimeOperationStatus.value === 'incorrectDateTime') {
      alert(PROMPT_MSG_INPUT_ERROR);
      handleAddEvent();
      return;
    }
    if (lastAddEventDateTimeOperationStatus.value === 'timeIsBusy') {
      alert(PROMPT_MSG_TIME_IS_BUSY);
      handleAddEvent();
      return;
    }
    if (lastAddEventDateTimeOperationStatus.value === 'success') {
      alert(PROMPT_MSG_SUCCESS);
    }
  }, [lastAddEventDateTimeOperationStatus]);

  useEffect(
    () => () => {
      dispatch(interviewCalendarSlice.actions.clear());
    },
    [],
  );

  const handleAddEvent = () => {
    //выводим запрос на ввод времени
    const eventDateTimeStr = prompt(PROMPT_MSG_INPUT, lastEventDateTimeValue);
    //если нажата отмена, то ничего не делаем
    if (eventDateTimeStr === null) {
      return;
    }

    dispatch(interviewCalendarSlice.actions.addEvent(eventDateTimeStr));
  };

  return (
    <SWrap>
      <STitle>Interview Calendar</STitle>
      <SButton onClick={handleAddEvent}>+</SButton>
    </SWrap>
  );
};

const SWrap = styled.div`
  min-height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  gap: 10px;
`;

const STitle = styled.span`
  font-weight: 400;
  font-size: 30px;
`;

const SButton = styled.button`
  background-color: rgba(0, 0, 0, 0);
  padding: 3px;
  font-weight: 200;
  font-size: 60px;
  border: none;
  color: red;
  cursor: pointer;
  user-select: none;

  &:hover {
    font-weight: 300;
  }
`;
