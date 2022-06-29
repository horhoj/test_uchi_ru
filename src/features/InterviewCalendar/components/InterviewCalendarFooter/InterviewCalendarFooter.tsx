import { FC } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { interviewCalendarSlice } from '../../slice';

const CONFIRM_MSG_DELETE = 'delete?';

export const InterviewCalendarFooter: FC = () => {
  const dispatch = useAppDispatch();
  const currentMatrixItem = useAppSelector(
    interviewCalendarSlice.selectors.getCurrentMatrixItem,
  );

  const handleGoToToday = () => {
    dispatch(interviewCalendarSlice.actions.goToDate(new Date().getTime()));
  };

  const handleDelete = () => {
    const confirmResult = confirm(CONFIRM_MSG_DELETE);
    if (confirmResult) {
      dispatch(interviewCalendarSlice.actions.deleteCurrentEvent());
    }
  };

  return (
    <SWrap>
      <SButton onClick={handleGoToToday}>Today</SButton>
      {currentMatrixItem && <SButton onClick={handleDelete}>Delete</SButton>}
    </SWrap>
  );
};

const SWrap = styled.div`
  min-height: 60px;
  background-color: #eee;
  border: 2px solid #ccc;
  display: flex;
  justify-content: space-between;
`;

const SButton = styled.button`
  background-color: rgba(0, 0, 0, 0);
  padding: 3px 30px;
  font-weight: 400;
  font-size: 26px;
  border: none;
  color: red;
  cursor: pointer;
  user-select: none;

  &:hover {
    font-weight: 500;
  }
`;
