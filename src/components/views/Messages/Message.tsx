import React, { useState } from 'react';
import { classes } from '@utils';
import moment from 'moment';
import { TDatesPeriod } from '@types';
import Select, { ISelectOption } from '../../ui/Select/Select';
import ButtonSwitcher from '../../ui/ButtonSwitcher/ButtonSwicther';
import DatePicker from '../../ui/DatePicker/DatePicker';
import './Messages.css';

const cls = classes('messages');
const pOptions: ISelectOption[] = [
  { label: <span>Все <i>+195</i> <b>3297</b></span>, value: 'all' },
  { label: <span>Требуют реакции <b>27</b></span>, value: 'require-reaction' },
  { label: <span>Необработанные <b>3297</b></span>, value: 'not-processed' },
  { label: <span>Обработанные <b>795</b></span>, value: 'processed' },
  { label: <span>Назначенные мне <b>4</b></span>, value: 'my' },
];
enum ScreenType {
  SMI = 'smi',
  SOCIAL = 'social',
}

const initialPeriod: TDatesPeriod = {
  startDate: moment().subtract(1, 'w').startOf('day'),
  endDate: moment()
};

const Messages: React.FC = () => {
  const [ activeType, setActiveType ] = useState<string | number>(ScreenType.SMI);
  const [ datePeriod, setDatePeriod ] = useState<TDatesPeriod>(initialPeriod);

  return (
    <div { ...cls('', '', 'container') }>
      <section { ...cls('head') }>
        <Select
          options={ pOptions }
          selected="not-processed"
          onChange={ console.log }
        />
        <ButtonSwitcher
          activeButtonId={ activeType }
          buttons={ [
            { id: ScreenType.SMI, label: 'СМИ 1 022' },
            { id: ScreenType.SOCIAL, label: 'СОЦМЕДИА 1 480' },
          ] }
          onChange={ (buttonId) => setActiveType(buttonId) }
        />

        <DatePicker value={ datePeriod } onChange={ setDatePeriod } />
      </section>
    </div>
  );
};

export default Messages;
