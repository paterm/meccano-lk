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
import MessagesControlPanel from './MessagesControlPanel/MessagesControlPanel';
import MessageList from './MessageList/MessageList';

const cls = classes('messages');

const testOnClick = (message: any) => {
  // eslint-disable-next-line no-console
  console.log(`onClick => ${message}`);
};

const testMessages = [
  { id: '1', text: 'Зелёное яблоко' },
  { id: '2', text: 'Сычуаньский соус' },
  { id: '3', text: 'Вкусная дыня' },
  { id: '4', text: 'Сладкий арбуз' },
  { id: '5', text: 'Спелая вишня' },
  { id: '6', text: 'Грецкий орех' },
  { id: '7', text: 'Волосатое киви' },
  { id: '8', text: 'Вкусное манго' },
  { id: '9', text: 'Кислый лимон' },
  { id: '10', text: 'Жгучий перец' },
  { id: '11', text: 'Ядовитый гриб' },
  { id: '12', text: 'Плесневелый сыр' },
  { id: '13', text: 'Запрещённый хамон' },
  { id: '14', text: 'Яркий апельсин' },
  { id: '15', text: 'Южный виноград' },
  { id: '16', text: 'Корейская морковка' },
  { id: '17', text: 'Брюсельския капуста' },
  { id: '18', text: 'Жёлтый банан' },
  { id: '19', text: 'Двойной чисбургер' },
  { id: '20', text: 'Колючий орурец' },
  { id: '21', text: 'Плакучий лук' },
  { id: '22', text: 'Антивампирский чеснок' },
];

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
  const [ messages, setMessages ] = useState((testMessages.slice(0, 5)));
  const [ selectedMessages, setSelectedMessages ] = useState([] as string[]);
  const [ visibleRange, setVisibleRange ] = useState({
    startIndex: 0,
    endIndex: 0,
  });

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

  const handleSeletAllMessages = (value: boolean) => {
    if (value) {
      const selected: string[] = testMessages.map((el) => el.id);
      setSelectedMessages(selected);
    } else {
      setSelectedMessages([]);
    }
  };

  const addToSelected = (id: string) => {
    if (selectedMessages.includes(id)) return;
    setSelectedMessages([ ...selectedMessages, id]);
  };

  const removeFromSelected = (id: string) => {
    const indexMessage = selectedMessages.findIndex((el) => el === id);
    if (indexMessage === -1) return;
    const updatedMessages = [ ...selectedMessages ];
    updatedMessages.splice(indexMessage, 1);
    setSelectedMessages(updatedMessages);
  };

  const handleSelectMessage = (id: string, value: boolean) => {
    if (value) addToSelected(id);
    else removeFromSelected(id);
  };

  const loadMoreMessages = (lastMessageIndex: number) => {
    if (lastMessageIndex >= (testMessages.length - 1)) return;
    const slice = testMessages.slice(lastMessageIndex + 1, lastMessageIndex + 6);
    setTimeout(() => {
      setMessages([ ...messages, ...slice ]);
    }, 1000);
  };

  return (
    <div { ...cls('', '', 'container') }>
      <section { ...cls('head') }>
        <Select
          options={ pOptions }
          selected="not-processed"
          onChange={ () => {} }
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
            badge={ 1249 }
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
              onReset={ () => testOnClick('Нажал сброс') }
              onApply={ () => testOnClick('Нажал применить') }
              onChangeTemplate={ handleChangeFilterTemplate }
              onCheck={ handleCheckFilter }
              onDelete={ handleDeleteFilter }
            />
          </DropDown>
        </div>
      </section>
      <section { ...cls('body') }>
        <MessagesControlPanel
          { ...cls('messages-control-panel') }
          selected={ selectedMessages }
          onSelectAll={ handleSeletAllMessages }
          onOpenFilter={ () => setIsOpenFilter(true) }
          pagination={
            {
              currentPage: visibleRange.startIndex + 1,
              pageCount: visibleRange.endIndex + 1,
              totalCount: testMessages.length,
              perPage: 20
            }
          }
        />
        <MessageList
          messages={ messages }
          selected={ selectedMessages }
          totalMessages={ testMessages.length }
          onSelect={ handleSelectMessage }
          onChangeRange={ setVisibleRange }
          onEndReached={ loadMoreMessages }
        />
      </section>
    </div>
  );
};

export default Messages;
