export interface LastAddEventDateTimeOperationStatus {
  value: null | 'incorrectDateTime' | 'timeIsBusy' | 'success';
}

export interface DataMatrix {
  [keys: string]: boolean;
}

export interface MatrixItem {
  timeIndex: number;
  dayOfWeekIndex: number;
}
