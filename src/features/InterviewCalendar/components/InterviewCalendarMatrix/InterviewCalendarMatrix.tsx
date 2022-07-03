import { FC } from 'react';
import styled from 'styled-components';
import { TIME_COLUMN_WIDTH } from '../../const';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { interviewCalendarSlice } from '../../slice';
import { DataMatrix, MatrixItem } from '../../types';
import { createDataMatrixKey, getDataMatrix } from './helpers';

export const InterviewCalendarMatrix: FC = () => {
  const currentEventDateTimeList = useAppSelector(
    interviewCalendarSlice.selectors.getCurrentEventDateTimeList,
  );

  const currentMatrixItem = useAppSelector(
    interviewCalendarSlice.selectors.getCurrentMatrixItem,
  );

  const dispatch = useAppDispatch();

  // console.log(
  //   'Это массив с событиями отобранными по дате для текущей недели',
  //   currentEventDateTimeList.map((date) => new Date(date)),
  // );

  const dataMatrix: DataMatrix = getDataMatrix(currentEventDateTimeList);

  console.log('Это матрица данных для вывода', dataMatrix);

  const handeEventButtonClick = (matrixItem: MatrixItem) => {
    dispatch(interviewCalendarSlice.actions.setCurrentMatrixItem(matrixItem));
  };

  return (
    <SWrap>
      <STable>
        <STbody>
          {Array(24)
            .fill(null)
            .map((_, timeIndex) => (
              <STr key={timeIndex}>
                <STd>
                  <STime>
                    {timeIndex < 9 ? 0 : ''}
                    {timeIndex + 1}:00
                  </STime>
                </STd>
                {Array(7)
                  .fill(null)
                  .map((_, dayOfWeekIndex) => (
                    <STd key={dayOfWeekIndex}>
                      {dataMatrix[
                        createDataMatrixKey(dayOfWeekIndex, timeIndex)
                      ] && (
                        <EventButton
                          isActive={
                            dayOfWeekIndex ===
                              currentMatrixItem?.dayOfWeekIndex &&
                            timeIndex === currentMatrixItem.timeIndex
                          }
                          onClick={() =>
                            handeEventButtonClick({ timeIndex, dayOfWeekIndex })
                          }
                        />
                      )}
                    </STd>
                  ))}
              </STr>
            ))}
        </STbody>
      </STable>
    </SWrap>
  );
};

const SWrap = styled.div`
  overflow: auto;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: #fff;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #666;
    border-radius: 20px;
    border: 1px solid #fff;
  }
`;

const STable = styled.table`
  border-collapse: collapse;
  width: 100%;
  border-top: 3px solid white;
  border-right: 3px solid white;
`;

const STbody = styled.tbody``;

const STr = styled.tr``;

const STd = styled.td`
  border: 2px solid #ccc;
  width: 14%;
  min-height: 50px;

  &:first-child {
    border: 1px solid white;
    display: flex;
    position: relative;
    width: ${TIME_COLUMN_WIDTH}px;
    color: #ccc;
  }

  &:nth-child(2) {
    border-left: 3px solid white;
  }

  &:not(:first-child) {
    padding: 3px !important;
    vertical-align: center;
  }
`;

const STime = styled.div`
  position: absolute;
  left: 0;
  top: 37px;
  z-index: 1;
  width: 100%;
  display: flex;
  justify-content: center;
  font-size: 20px;
`;

const EventButton = styled.button<{ isActive: boolean }>`
  background-color: ${({ isActive }) => (isActive ? '#b0b6fb' : '#e9ebfd')};
  display: flex;
  width: 100%;
  height: 42px;
  border: none;
  margin: 0 auto;
  cursor: pointer;
`;
