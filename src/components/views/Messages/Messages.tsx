import React, { useEffect, useState } from 'react';
import { classes, useQueryParams } from '@utils';
import { ReactComponent as FilterIcon } from '@assets/icons/button/filter.svg';
import { ReactComponent as CloseIcon } from '@assets/icons/button/close.svg';
import moment from 'moment';
import { TDatesPeriod } from '@t';
import Select, { ISelectOption } from '../../ui/Select/Select';
import ButtonSwitcher from '../../ui/ButtonSwitcher/ButtonSwicther';
import DatePicker from '../../ui/DatePicker/DatePicker';
import Button from '../../ui/Button/Button';
import DropDown from '../../ui/DropDown/DropDown';
import FilterPanel from './FilterPanel/FilterPanel';
import MessagesControlPanel from './MessagesControlPanel/MessagesControlPanel';
import MessageList from './MessageList/MessageList';
import avatarRbk from '../../../assets/temp/rbk.jpg';
import avatarSber from '../../../assets/temp/sber.jpg';
import { IMessage } from '../../../interfaces/IMessage';
import './Messages.css';

const cls = classes('messages');

const testOnClick = (message: any) => {
  // eslint-disable-next-line no-console
  console.log(`onClick => ${message}`);
};

enum ScreenType {
  SMI = 'smi',
  SOCIAL = 'social',
}

const testMessagesExample: IMessage[] = [
  {
    id: '1',
    typeId: 'T1',
    typeSlug: ScreenType.SMI,
    typeName: 'СМИ',
    date: '11:25 15.01.2021',
    needReaction: true,
    isCompleted: false,
    isFavorited: false,
    isDeleted: false,
    title: 'Сбербанк купит сервис 2ГИС Зачем госбанку понадобился один из конкурентов «Яндекс.Карты»',
    annotation: 'Сбербанк получит 72% сервиса 2ГИС, одной из самых дорогих компаний Рунета, — в рамках сделки ее оценили в 14,3 млрд руб. Еще 3% будет у СП банка и Mail.ru Group. Из капитала выйдут Baring Vostok и структуры Леонида Богуславского. Сбербанк подписал обязывающие документы об инвестициях…',
    text: '',
    mfiPrevValue: 30,
    mfiValue: 34,
    erPrevValue: 60,
    erValue: 57,
    tone: 'neutral',
    sourceId: '',
    sourceName: 'РИА Новости',
    sourceLink: 'https://qwertyqwertyqwerty.com/news/1',
    cityId: '',
    cityName: 'Москва',
    sourceAvatar: avatarRbk,
    tags: []
  },
  {
    id: '2',
    typeId: 'T1',
    typeSlug: ScreenType.SMI,
    typeName: 'СМИ',
    date: '12:30 15.06.2020',
    needReaction: false,
    isCompleted: false,
    isFavorited: false,
    isDeleted: false,
    title: 'В работе онлайн-сервисов Сбербанка произошел сбой',
    annotation: 'У пользователей Сбербанка возникли трудности с доступом к его онлайн-сервисам. О невозможности воспользоваться приложением «Сбербанк Онлайн» сообщали пользователи сети Twitter (1, 2). Данные о сбоях в онлайн-сервисах банка появились и на портале Downdetector, отслеживающем работу различных интернет-ресурсов.',
    text: '',
    mfiPrevValue: 0,
    mfiValue: 47,
    erPrevValue: 63,
    erValue: 63,
    tone: 'negative',
    sourceId: '',
    sourceName: 'Лента',
    sourceLink: 'https://qwertyqwertyqwerty.com/news/1',
    cityId: '',
    cityName: 'Москва',
    sourceAvatar: avatarSber,
    tags: []
  },
  {
    id: '3',
    typeId: 'T2',
    typeSlug: ScreenType.SOCIAL,
    typeName: 'СОЦМЕДИА',
    date: '14:44 15.06.2020',
    needReaction: false,
    isCompleted: false,
    isFavorited: false,
    isDeleted: false,
    title: 'Подслушано Сбербанк | Как вам новая карта сбербанка?',
    annotation: 'Мне очень нравится, сам пользую, хочу родителям тоже взять. Единственное, непонятно, какая сумма обслуживания за год использования? Кто знает подскажите плиз.',
    text: '',
    mfiPrevValue: 21,
    mfiValue: 34,
    erPrevValue: 59,
    erValue: 57,
    tone: 'positive',
    sourceId: '',
    sourceName: 'Дмитрий Волков',
    sourceLink: 'https://qwertyqwertyqwerty.com/news/1',
    cityId: '',
    cityName: 'Калининград',
    sourceAvatar: '',
    tags: []
  },
];

const testMessages: any[] = [];

Array.apply('', Array(42)).forEach((el, index) => {
  testMessages.push({
    ...testMessagesExample[0],
    id: (+testMessagesExample[1].id * index + 1).toString()
  });
  testMessages.push({
    ...testMessagesExample[1],
    id: (+testMessagesExample[1].id * index + 2).toString()
  });
  testMessages.push({
    ...testMessagesExample[2],
    id: (+testMessagesExample[2].id * index + 3).toString()
  });
});

const getTestMessages = (type: any) => testMessages.filter((el: any) => el.typeSlug === type);

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
  const [ messages, setMessages ] = useState((getTestMessages(activeType).slice(0, 10)));
  const [ selectedMessages, setSelectedMessages ] = useState([] as string[]);
  const [ messagesScrollIndex, setMessagesScrollIndex ] = useState(0);
  const [ visibleRange, setVisibleRange ] = useState({
    startIndex: 0,
    endIndex: 0,
  });
  const [ rangeStep ] = useState(10);
  const queryParams = useQueryParams();

  useEffect(() => {
    setMessages(getTestMessages(activeType));
  }, [activeType]);

  useEffect(() => {
    const type = queryParams.get('type');
    setActiveType(type || activeType);
  }, [queryParams, activeType]);

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
      const selected: string[] = getTestMessages(activeType).map((el) => el.id);
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

  const handleScrollToIndex = (index: number) => {
    setMessagesScrollIndex(index);
  };

  // useEffect(() => {
  //   setMessagesScrollIndex(visibleRange.startIndex);
  // }, [visibleRange.startIndex]);

  const loadMoreMessages = (lastMessageIndex: number) => {
    if (lastMessageIndex >= (getTestMessages(activeType).length - 1)) return;
    const slice = getTestMessages(activeType).slice(lastMessageIndex + 1, lastMessageIndex + 11);
    setTimeout(() => {
      setMessages([ ...messages, ...slice ]);
    }, 1000);
  };

  return (
    <div { ...cls('') }>
      <section { ...cls('head', '', 'container') }>
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
          onChange={ (buttonId) => queryParams.set({ type: buttonId as string }) }
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
      <section { ...cls('body', '', 'container') }>
        <MessagesControlPanel
          { ...cls('messages-control-panel') }
          selected={ selectedMessages }
          onSelectAll={ handleSeletAllMessages }
          onOpenFilter={ () => setIsOpenFilter(true) }
          pagination={
            {
              currentIndex: visibleRange.startIndex,
              totalCount: getTestMessages(activeType).length,
              perPage: rangeStep
            }
          }
          onScrollToIndex={ handleScrollToIndex }
        />
        <MessageList
          messages={ messages }
          selected={ selectedMessages }
          totalMessages={ getTestMessages(activeType).length }
          scrollIndex={ messagesScrollIndex }
          onSelect={ handleSelectMessage }
          onChangeRange={ setVisibleRange }
          onShowMore={ loadMoreMessages }
        />
      </section>
    </div>
  );
};

export default Messages;
