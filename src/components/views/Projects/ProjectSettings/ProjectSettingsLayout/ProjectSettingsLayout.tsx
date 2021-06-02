import React, { useState } from 'react';
import { classes } from '@utils';
import { ReactComponent as EditIcon } from '@assets/icons/button/edit.svg';
import Button from '@components/ui/Button/Button';
import Radio from '@ui/Radio/Radio';
import './ProjectSettingsLayout.css';

const cls = classes('project-settings-general');

const periodOptions = [
  {
    value: 0,
    label: 'День'
  },
  {
    value: 1,
    label: 'Неделя'
  },
  {
    value: 2,
    label: 'Месяц'
  },
];

const perPageOptions = [
  {
    value: 50,
    label: '50'
  },
  {
    value: 100,
    label: '100'
  },
  {
    value: Infinity,
    label: 'Все (бесконечная лента)'
  },
];

const rateChartOption = [
  {
    value: 0,
    label: 'При загрузке страницы'
  },
  {
    value: 1,
    label: '1 раз в час'
  },
  {
    value: 2,
    label: '1 раз в  день'
  },
]

const ProjectSettingsLayout:React.FC = () => {
  const [period, setPeriod] = useState(0);
  const [perPage, setPerPage] = useState(50);
  const [rateChart, setRateChart] = useState(0);

  const handlePeriod = (index: number) => {
    setPeriod(periodOptions[index].value)
  }

  const handlePerPage = (index: number) => {
    setPerPage(perPageOptions[index].value)
  }

  const handleRateChart = (index: number) => {
    setRateChart(rateChartOption[index].value)
  }

  const submitLaoyotSettings = () => (
    {
      period,
      perPage,
      rateChart
    }
  )

  return (
    <div { ...cls() }>
      <div { ...cls('body') }>
        <Button
          { ...cls('name-button') }
          size={ 16 }
          color="gray"
          square
          link
          rightIcon={ EditIcon }
        >
          Лояльность сотрудников
        </Button>
        <h3 { ...cls('title') }>Лента сообщений</h3>
        <div { ...cls('radio-group') }>
          <span { ...cls('radio-list-label') }>Период по умолчанию</span>
          <Radio
            { ...cls('radio-list') }
            data={ periodOptions }
            onChange={ handlePeriod }
            active={ 0 }
          />
        </div>
        <div { ...cls('radio-group') }>
          <span { ...cls('radio-list-label') }>Сообщений на странице</span>
          <Radio
            { ...cls('radio-list') }
            data={ perPageOptions }
            onChange={ handlePerPage }
            active={ 0 }
          />
        </div>
        <h3 { ...cls('title') }>Аналитика</h3>
        <div { ...cls('radio-group') }>
          <span { ...cls('radio-list-label') }>Обновление графиков</span>
          <Radio
            { ...cls('radio-list') }
            data={ rateChartOption }
            onChange={ handleRateChart }
            active={ 0 }
          />
        </div>
      </div>
      <div { ...cls('footer') }>
        <Button
          { ...cls('cancel-button') }
          type="button"
          color="coral"
        >
          Отмена
        </Button>
        <Button
          { ...cls('apply-button') }
          type="button"
          filled
          onClick={ submitLaoyotSettings }
        >
          Применить
        </Button>
      </div>
    </div>
  );
}

export default ProjectSettingsLayout;
