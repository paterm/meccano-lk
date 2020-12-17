import React, { useState } from 'react';
import { classes } from '@utils';
import { ReactComponent as FilterIcon } from '@assets/icons/button/filter.svg';
// import { ReactComponent as CloseIcon } from '@assets/icons/button/close.svg';
import Select, { ISelectOption } from '../../ui/Select/Select';
import ButtonSwitcher from '../../ui/ButtonSwitcher/ButtonSwicther';
import './Messages.css';
import DatePicker from '../../ui/DatePicker/DatePicker';
import Button from '../../ui/Button/Button';
import DropDown from '../../ui/DropDown/DropDown';
import FilterPanel from './FilterPanel/FilterPanel';

const cls = classes('messages');
const pOptions: ISelectOption[] = [
  { label: <span>Все <i>+195</i> <b>3297</b></span>, value: 'all' },
  { label: <span>Требуют реакции <b>27</b></span>, value: 'require-reaction' },
  { label: <span>Необработанные <b>3297</b></span>, value: 'not-processed' },
  { label: <span>Обработанные <b>795</b></span>, value: 'processed' },
  { label: <span>Назначенные мне <b>4</b></span>, value: 'my' },
];
const filterTemplates: ISelectOption[] = [
  { label: <span>Шаблон 1</span>, value: 'template-1' },
  { label: <span>Шаблон 2</span>, value: 'template-2' },
  { label: <span>Шаблон 3</span>, value: 'template-3' },
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

const Messages: React.FC = () => {
  const [ activeType, setActiveType ] = useState<string | number>(ScreenType.SMI);
  const [ filters, setFilters ] = useState(initFilters);
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

  return (
    <div { ...cls('', '', 'container') }>
      <section { ...cls('head') }>
        {/* TODO: Мне кажется у селекторов нужно сделать как у кнопок rounded | square */}
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

        <DatePicker />

        <div { ...cls('filter-with-drop-down') }>
          <Button
            { ...cls('filter-button') }
            icon={ FilterIcon }
            color="coral"
            rounded
            onClick={ () => setIsOpenFilter(!isOpenFilter) }
          />
          <DropDown
            { ...cls('filter-drop-down') }
            isOpen={ isOpenFilter }
            onClose={ () => setIsOpenFilter(false) }
          >
            {// TODO: Размер 24 и програчность есть в ветке 179, активировать как вольётся в dev
            /* <Button
              icon={ CloseIcon }
              // size={ 24 }
              color="gray"
              // transparent
            /> */}
            <FilterPanel
              filters={ filters }
              templates={ filterTemplates }
              activeTemplate="template-2"
              onReset={ console.log }
              onApply={ console.log }
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
