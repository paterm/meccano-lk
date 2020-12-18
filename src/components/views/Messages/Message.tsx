import React, { useState } from 'react';
import { classes } from '@utils';
import { ReactComponent as FilterIcon } from '@assets/icons/button/filter.svg';
import { ReactComponent as CloseIcon } from '@assets/icons/button/close.svg';
import moment from 'moment';
import { TDatesPeriod } from '@types';
import Select, { ISelectOption } from '../../ui/Select/Select';
import ButtonSwitcher from '../../ui/ButtonSwitcher/ButtonSwicther';
import DatePicker from '../../ui/DatePicker/DatePicker';
import Button from '../../ui/Button/Button';
import DropDown from '../../ui/DropDown/DropDown';
import FilterPanel from './FilterPanel/FilterPanel';
import './Messages.css';

const cls = classes('messages');
const pOptions: ISelectOption[] = [
  { label: <span>Все <i>+195</i> <b>3297</b></span>, value: 'all' },
  { label: <span>Требуют реакции <b>27</b></span>, value: 'require-reaction' },
  { label: <span>Необработанные <b>3297</b></span>, value: 'not-processed' },
  { label: <span>Обработанные <b>795</b></span>, value: 'processed' },
  { label: <span>Назначенные мне <b>4</b></span>, value: 'my' },
];
const filterTemplates = [
  { name: 'Шаблон #1', id: 'a2r' },
  { name: 'Шаблон #2', id: 'b4d' },
  { name: 'Обработка негатива', id: 'k6d' },
  { name: 'Шаблон #4', id: 'uu7' },
];
const initFilters = [
  { group: 'Тональность', label: '😁 Позитив', isActived: true },
  { group: 'Тональность', label: '😐 Нейтрал', isActived: false },
  { group: 'Тональность', label: '😡 Негатив', isActived: false },
  { group: 'Источники', label: 'ТВ 400', isActived: true },
  { group: 'Источники', label: 'Радио 34', isActived: true },
  { group: 'Источники', label: 'Печатные СМИ 600', isActived: true },
  { group: 'География', label: 'Россия 400', isActived: false },
  { group: 'География', label: 'Беларусь 34', isActived: false },
  { group: 'Что-то ещё', label: 'Компании 443', isActived: false },
  { group: 'Что-то ещё', label: 'Конкуренты 3363', isActived: false },
  { group: 'Что-то ещё', label: 'Отрасль 7030', isActived: false },
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
  const [ filters, setFilters ] = useState(initFilters);
  const [ activeFilterTemplateId, setActiveFilterTemplateId ] = useState(filterTemplates[2].id);
  const [ isOpenFilter, setIsOpenFilter ] = useState(false);

  const handleCheckFilter = (values: any) => {
    const updatedFilres = [...filters];
    values.forEach((value: any) => {
      const filterIndex = filters.findIndex((el) => el.label === value.label);
      updatedFilres[filterIndex] = value;
    });
    setFilters(updatedFilres);
  };

  const handleDeleteFilter = (values: any) => {
    const updatedFilres = [...filters];
    const deleteIndices = values.map((value: any) => filters
      .findIndex((el) => el.label === value.label));
    updatedFilres.splice(deleteIndices[0], deleteIndices.length);
    setFilters(updatedFilres);
  };

  const handleChangeFilterTemplate = (id: string) => {
    setActiveFilterTemplateId(id);
  };

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

        <div { ...cls('filter-with-drop-down') }>
          <Button
            { ...cls('filter-button') }
            icon={ FilterIcon }
            color="coral"
            rounded
            onClick={ () => setIsOpenFilter(!isOpenFilter) }
          />
          {isOpenFilter && (
            <Button
              { ...cls('filter-close-button') }
              icon={ CloseIcon }
              size={ 24 }
              color="gray"
              transparent
              onClick={ () => setIsOpenFilter(true) }
            />
          )}
          <DropDown
            { ...cls('filter-drop-down') }
            isOpen={ isOpenFilter }
            onClose={ () => setIsOpenFilter(false) }
          >
            <FilterPanel
              filters={ filters }
              templates={ filterTemplates }
              activeTemplateId={ activeFilterTemplateId }
              onReset={ () => console.log('Нажал сброс') }
              onApply={ () => console.log('Нажал применить') }
              onChangeTemplate={ handleChangeFilterTemplate }
              onCheck={ handleCheckFilter }
              onDelete={ handleDeleteFilter }
            />
          </DropDown>
        </div>
      </section>
    </div>
  );
};

export default Messages;
