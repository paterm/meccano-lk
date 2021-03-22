import React from 'react';
import { classes } from '@utils';
import './ToneMeter.css';

const cls = classes('tone-meter');
const METER_SIZE = 24;

const emoji = {
  negative: '😡',
  semiNegative: '🙁',
  neutral: '😐',
  semiPositive: '🙂',
  positive: '😁',
};

enum ETones {
  negative = 0,
  semiNegative = 25,
  neutral = 50,
  semiPositive = 75,
  positive = 100,
}

interface IToneMeter {
  value: keyof typeof ETones
  className: string
}

const ToneMeter: React.FC<IToneMeter> = (props) => {
  const {
    className: mix = '',
    value
  } = props;
  const barColor = ETones[value] >= 50 ? 'green' : 'red';
  const meterOffset = {
    left: `calc(${ETones[value]}% - ${ETones[value] * (METER_SIZE / 100)}px)`
  };

  const getEmoji = (tone: keyof typeof ETones) => emoji[tone];

  return (
    <div
      { ...cls('', barColor, mix) }
    >
      <div
        { ...cls('value') }
        style={ meterOffset }
      >
        { getEmoji(value) }
      </div>
    </div>
  );
};

export default ToneMeter;
