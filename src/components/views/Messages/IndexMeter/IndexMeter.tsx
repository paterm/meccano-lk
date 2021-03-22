import React from 'react';
import { classes } from '@utils';
import { ReactComponent as GrowthIcon } from '@assets/icons/message/growth.svg';
import { ReactComponent as DropIcon } from '@assets/icons/message/drop.svg';
import './IndexMeter.css';

const cls = classes('index-meter');

interface IIndexMeter {
  label?: string
  postfix?: string
  prevValue?: number
  value: number
  className?: string
}

const IndexMeter: React.FC<IIndexMeter> = ({
  label = '',
  postfix = '',
  prevValue = null,
  value = 0,
  className: mix = '',
}) => {
  const isChanged: boolean = prevValue !== null && value !== prevValue;
  const direction = value > Number(prevValue) ? 1 : -1;

  const directionElement = direction === 1
    ? (<GrowthIcon { ...cls('direction-icon', 'growth') } />)
    : (<DropIcon { ...cls('direction-icon', 'drop') } />);

  return (
    <div
      { ...cls('', '', mix) }
    >
      { isChanged && directionElement }
      <span { ...cls('value') }>
        { !!label && `${label} ` }
        { value }
        { postfix }
      </span>
    </div>
  );
};

export default IndexMeter;
