import { FC } from 'react';
import styled from 'styled-components';
import { InterviewCalendarHeader } from './components/InterviewCalendarHeader';
import { InterviewCalendarNavigator } from './components/InterviewCalendarNavigator';
import { InterviewCalendarTitle } from './components/InterviewCalendarTitle';
import { InterviewCalendarMatrix } from './components/InterviewCalendarMatrix';
import { InterviewCalendarFooter } from './components/InterviewCalendarFooter';

export const InterviewCalendar: FC = () => {
  return (
    <SWrap>
      <InterviewCalendarTitle />
      <InterviewCalendarHeader />
      <InterviewCalendarNavigator />
      <InterviewCalendarMatrix />
      <InterviewCalendarFooter />
    </SWrap>
  );
};

const SWrap = styled.div`
  display: flex;
  flex-direction: column;
  max-height: max(calc(100vh - 60px), 600px);

  @media (min-width: 740px) {
    width: 740px;
    margin: 0 auto;
  }
`;
