import React from 'react';
import { classes, toPriceFormat } from '@utils';
import DashboardCard from '../../../DashboardCard/DashboardCard';
import { ReactComponent as ArrowIcon } from './assets/arrow-icon.svg';
import InfoTooltip from '../../../../../../ui/InfoTooltip/InfoTooltip';
import './TonalityDynamicData.css';

const cls = classes('tonality-dynamic-data');

type TNameMap = {
  [key: string]: {
    title: string
    info: string
  }
};

const nameMap: TNameMap = {
  messagesCount: {
    title: 'Всего сообщений',
    info: `Тут подробная информация о необходимости этих значений и значения этих значений,
    а также значимости этих значений`
  },
  coverage: {
    title: 'Охват',
    info: `Тут подробная информация о необходимости этих значений и значения этих значений,
    а также значимости этих значений`
  },
  mfi: {
    title: 'MFI',
    info: `Тут подробная информация о необходимости этих значений и значения этих значений,
    а также значимости этих значений`
  },
  er: {
    title: 'ER',
    info: `Тут подробная информация о необходимости этих значений и значения этих значений,
    а также значимости этих значений`
  }
};

type TProjectData = {
  date?: string,
  value?: number,
  messagesCount: {
    total: number,
    new: number
  },
  coverage: {
    total: number,
    new: number
  },
  mfi: {
    total: number,
    new: number
  },
  er: {
    total: number,
    new: number
  }
};

type PROPS = {
  data: TProjectData[]
};

const TonalityDynamicData: React.FC<PROPS> = ({ data }) => {
  const reduceData: { [key: string]: any } = data.reduce((prev, current) => {
    const acc = { ...prev };

    acc.messagesCount.total += current.messagesCount.total;
    acc.messagesCount.new += current.messagesCount.new;
    acc.coverage.total += current.coverage.total;
    acc.coverage.new += current.coverage.new;
    acc.mfi.total += current.mfi.total;
    acc.mfi.new += current.mfi.new;
    acc.er.total += current.er.total;
    acc.er.new += current.er.new;

    return acc;
  }, {
    messagesCount: { total: 0, new: 0 },
    coverage: { total: 0, new: 0 },
    mfi: { total: 0, new: 0 },
    er: { total: 0, new: 0 }
  });

  return (
    <DashboardCard { ...cls() }>
      { Object.keys(reduceData).map((key) => (
        <div { ...cls('card') } key={ key }>
          <div { ...cls('card-label') }>
            { nameMap[key].title }
            <InfoTooltip text={ nameMap[key].info } />
          </div>
          <div { ...cls('card-value') }>
            { toPriceFormat(reduceData[key]?.total) }
          </div>
          <div { ...cls('card-new') }>
            <ArrowIcon
              { ...cls('card-new-icon') }
              style={ reduceData[key]?.new < 0 ? { transform: 'rotate(180deg)' } : {} }
            />
            <p> { reduceData[key]?.new > 0 ? '+' : '' }{ toPriceFormat(reduceData[key]?.new) }</p>
          </div>
        </div>
      )) }
    </DashboardCard>
  );
};

export default TonalityDynamicData;
