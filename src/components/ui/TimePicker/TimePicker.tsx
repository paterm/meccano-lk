import React, { useState } from 'react';
import moment from 'moment';
import { classes } from '@utils';
import StringInputNumber from './StringInputNumber/StringInputNumber';

const cls = classes('time-picker');

export interface ITime {
  hours: string | number
  minutes: string | number
  seconds?: string | number
}

interface ITimePicker {
  time: ITime | string | moment.Moment
}

const TimePicker: React.FC<ITimePicker> = ({ time }) => {
  const [ hours, setHours ] = useState(0);
  const [ minutes, setMinutes ] = useState(0);
  // const [ seconds, setSeconds ] = useState(0);

  return (
    <div { ...cls() }>
      <StringInputNumber
        value={ hours }
        onChange={ (value) => setHours(value) }
      />
      :
      <StringInputNumber
        value={ minutes }
        onChange={ (value) => setMinutes(value) }
      />
    </div>
  )
};

export default TimePicker;
