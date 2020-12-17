import React, { useState } from 'react';
import moment from 'moment';
import { classes } from '@utils';
import StringInputNumber from './StringInputNumber/StringInputNumber';
import { ReactComponent as TimeIcon } from './assets/time-icon.svg';
import './TimePicker.css';

const cls = classes('time-picker');

interface ITimePicker {
  className?: string
  dateTime?: moment.Moment
  showDate?: boolean
  dateFormat?: string
  revert?: boolean
}

const TimePicker: React.FC<ITimePicker> = (
  {
    className,
    dateTime = moment(),
    showDate,
    dateFormat = 'DD. MM. YY',
    revert,
  }
) => {
  const [ hours, setHours ] = useState<number>(+dateTime.format('H'));
  const [ minutes, setMinutes ] = useState<number>(+dateTime?.format('m'));

  return (
    <div { ...cls('', { revert }, className) }>
      <TimeIcon { ...cls('icon') } />

      {showDate && (
        <span { ...cls('date') }>{ dateTime?.format(dateFormat) }</span>
      )}

      <StringInputNumber
        { ...cls('field') }
        value={ hours }
        onChange={ (value) => setHours(value) }
        buttonPosition="left"
        max={ 23 }
        min={ 0 }
      />
      <span { ...cls('separator') }>:</span>
      <StringInputNumber
        { ...cls('field') }
        value={ minutes }
        onChange={ (value) => setMinutes(value) }
        max={ 59 }
        min={ 0 }
      />
    </div>
  );
};

export default TimePicker;
