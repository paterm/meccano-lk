import React, { useState, useEffect, useContext } from 'react';
import { MobileContext } from 'src/contexts/MobileContext';
import { classes } from '@utils';
import Checkbox from 'src/components/ui/Checkbox/Checkbox';
import Input from 'src/components/ui/Input/Input';
import Button from 'src/components/ui/Button/Button';
import DropDown from 'src/components/ui/DropDown/DropDown';
import { ReactComponent as HelpIcon } from '@assets/icons/button/help.svg';
import { ReactComponent as SortIcon } from '@assets/icons/button/sort.svg';
import { ReactComponent as ArrowLeftIcon } from '@assets/icons/button/arrow-left.svg';
import { ReactComponent as ArrowRightIcon } from '@assets/icons/button/arrow-right.svg';
import { ReactComponent as MoreIcon } from '@assets/icons/button/more.svg';
import { ReactComponent as SearchIcon } from '@assets/icons/button/search.svg';
import { ReactComponent as FilterIcon } from '@assets/icons/button/filter.svg';
import { ReactComponent as CheckIcon } from '@assets/icons/button/check.svg';
import { ReactComponent as StarIcon } from '@assets/icons/button/star.svg';
import { ReactComponent as AddPersonIcon } from '@assets/icons/button/add-person.svg';
import { ReactComponent as TagIcon } from '@assets/icons/button/tag.svg';
import { ReactComponent as TrashIcon } from '@assets/icons/button/trash.svg';
import './MessagesControlPanel.css';

const cls = classes('messages-control-panel');

const testOnClick = (message: any) => {
  // eslint-disable-next-line no-console
  console.log(`onClick => ${message}`);
};

interface IMessagesControlPanel {
  className?: string
  selected?: string[]
  pagination?: {
    currentIndex: number,
    totalCount: number,
    perPage: number,
  }
  onOpenFilter?: () => void
  onSelectAll: (value: boolean) => void
  onScrollToIndex?: (index: number) => void
}

const MessagesControlPanel: React.FC<IMessagesControlPanel> = ({
  className,
  selected = [],
  pagination = {
    currentIndex: 0,
    totalCount: 0,
    perPage: 0,
  },
  onSelectAll,
  onOpenFilter,
  onScrollToIndex
}) => {
  const { isMobile } = useContext(MobileContext);
  const [ isOpenSoftMenu, setIsOpenSoftMenu ] = useState(false);
  const [ isOpenMoreMenu, setIsOpenMoreMenu ] = useState(false);
  const [ isOpenToneMenu, setIsOpenToneMenu ] = useState(false);
  const [ isOpenSeachSubPanel, setIsOpenSeachSubPanel ] = useState(false);
  const [ isOpenSelectedSubPanel, setIsOpenSelectedSubPanel ] = useState(false);
  const [ isAllChecked, setIsAllChecked ] = useState(false);
  const [ startRangePage, setStartRangePage ] = useState(0);
  const [ endRangePage, setEndRangePage ] = useState(pagination.perPage);

  useEffect(() => {
    if (selected.length) setIsOpenSelectedSubPanel(true);
    else setIsOpenSelectedSubPanel(false);
    if (selected.length < pagination.totalCount) setIsAllChecked(false);
    else setIsAllChecked(true);
  }, [selected, pagination.totalCount]);

  useEffect(() => {
    setIsOpenSelectedSubPanel(false);
  }, [isOpenSeachSubPanel]);

  useEffect(() => {
    setIsOpenSeachSubPanel(false);
  }, [isOpenSelectedSubPanel]);

  useEffect(() => {
    const { currentIndex, perPage, totalCount } = pagination;
    const start = currentIndex - (currentIndex % perPage);
    setStartRangePage(start);
    const end = currentIndex - (currentIndex % perPage) + perPage;
    if (totalCount > end) setEndRangePage(end);
    else setEndRangePage(totalCount);
  }, [pagination]);

  const handleSelectAll = (value: boolean) => {
    onSelectAll(value);
  };

  const handleScrollIndex = (direction: number) => {
    if (!onScrollToIndex) return;
    if (direction === 1) {
      onScrollToIndex(endRangePage);
      setEndRangePage(endRangePage);
    } else {
      onScrollToIndex(startRangePage - pagination.perPage);
      setEndRangePage(startRangePage - pagination.perPage);
    }
  };

  const sortMenu = [
    { label: 'Сначала новые', onClick: () => testOnClick('Нажал Сначала новые') },
    { label: 'Сначала старые', onClick: () => testOnClick('Нажал Сначала старые') },
    { label: 'По вовлечению', onClick: () => testOnClick('Нажал По вовлечению') },
    { label: 'По комментариям', onClick: () => testOnClick('Нажал По комментариям') },
    { label: 'По аудитории', onClick: () => testOnClick('Нажал По аудитории') },
    { label: 'По просмотрам', onClick: () => testOnClick('Нажал По просмотрам') },
  ];

  const moreMenu = [
    { label: '100 сообщений на странице', onClick: () => testOnClick('Нажал 100 сообщений на странице') },
    { label: 'Показать всё', onClick: () => testOnClick('Показать всё') }
  ];

  const toneMenu = [
    { label: '😁', onClick: () => testOnClick('Позитив') },
    { label: '😐', onClick: () => testOnClick('Нейтрал') },
    { label: '😡', onClick: () => testOnClick('Негатив') }
  ];

  const handleCloseDropDown = () => {
    setIsOpenSoftMenu(false);
    setIsOpenMoreMenu(false);
    setIsOpenToneMenu(false);
  };

  const menuElement = (menu: {
    label: string | React.ComponentType
    onClick: () => void
  }[]) => (
    <ul { ...cls('menu-list') }>
      {menu?.map(({ label, onClick }, index) => (
        <li key={ index } { ...cls('menu-item') }>
          <Button
            { ...cls('menu-button') }
            onClick={ onClick }
            onClickCallback={ handleCloseDropDown }
            color="gray"
            transparent
          >
            {label}
          </Button>
        </li>
      ))}
    </ul>
  );

  const selectAllCheckboxElement = (
    <Checkbox
      { ...cls('select-all') }
      size="m"
      checked={ isAllChecked }
      onChange={ handleSelectAll }
    />
  );

  const searchElement = (
    <div { ...cls('search') }>
      <Input
        { ...cls('search-input') }
        type="search"
        placeholder="Поиск ..."
        size={ 32 }
        rounded
      />
      <Button
        icon={ HelpIcon }
        size={ 24 }
        color="gray"
        transparent
      />
    </div>
  );

  const softElement = (
    <div { ...cls('menu-with-drop-down', 'sort-menu') }>
      <Button
        { ...cls('sort-button') }
        size={ 24 }
        color="gray"
        transparent
        icon={ !isMobile ? undefined : SortIcon }
        onClick={ () => setIsOpenSoftMenu(true) }
      >
        <SortIcon { ...cls('sort-icon') } />
        { !isMobile && <span>Сначала экспортированные</span> }
      </Button>
      <DropDown
        { ...cls('drop-down') }
        isOpen={ isOpenSoftMenu }
        onClose={ handleCloseDropDown }
      >
        {menuElement(sortMenu)}
      </DropDown>
    </div>
  );

  const moreElement = (
    <div { ...cls('menu-with-drop-down', 'more-menu') }>
      <Button
        { ...cls('more-menu') }
        icon={ MoreIcon }
        size={ 24 }
        color="gray"
        transparent
        onClick={ () => setIsOpenMoreMenu(true) }
      />
      <DropDown
        { ...cls('drop-down', 'more-menu') }
        isOpen={ isOpenMoreMenu }
        onClose={ handleCloseDropDown }
      >
        {menuElement(moreMenu)}
      </DropDown>
    </div>
  );

  const paginationElement = (
    <div { ...cls('pagination') }>
      <Button
        icon={ ArrowLeftIcon }
        size={ 24 }
        color="gray"
        transparent
        onClick={ () => handleScrollIndex(-1) }
      />
      <span { ...cls('pagination-range') }>
        { startRangePage + 1}
        &nbsp;-&nbsp;
        { endRangePage }
      </span>
      <Button
        icon={ ArrowRightIcon }
        size={ 24 }
        color="gray"
        transparent
        onClick={ () => handleScrollIndex(1) }
      />
      <span { ...cls('pagination-total-count') }>
        из&nbsp;{ pagination?.totalCount }
      </span>
    </div>
  );

  return (
    <div { ...cls('', '', className) }>
      <div { ...cls('main-panel', { sub: isOpenSeachSubPanel }) }>
        { selectAllCheckboxElement }
        { !isMobile
          ? searchElement
          : (
            <Button
              { ...cls('search-button') }
              icon={ SearchIcon }
              size={ 24 }
              color="gray"
              transparent
              onClick={ () => setIsOpenSeachSubPanel(!isOpenSeachSubPanel) }
            />
          )}
        { softElement }
        { !isMobile && pagination && paginationElement }
        { isMobile && (
          <Button
            { ...cls('filter-button') }
            icon={ FilterIcon }
            size={ 24 }
            color="coral"
            transparent
            onClick={ onOpenFilter }
          />
        ) }
        { moreElement }
      </div>
      { isOpenSeachSubPanel && (
        <div { ...cls('search-panel') }>
          { isMobile && searchElement }
          <span
            { ...cls('search-counter') }
          >
            Найдено 2 сообщения
          </span>
          <div
            { ...cls('search-target') }
          >
            <span { ...cls('search-label') }>
              Искать только
            </span>
            <Checkbox
              { ...cls('search-title') }
              size="m"
              label="В заголовках"
              onChange={ (value) => testOnClick(value) }
            />
            <Checkbox
              { ...cls('search-text') }
              size="m"
              label="В тексте"
              onChange={ (value) => testOnClick(value) }
            />
          </div>
        </div>
      )}
      { isOpenSelectedSubPanel && (
        <div { ...cls('selected-panel') }>
          <span
            { ...cls('selected-counter') }
          >
            {selected.length} сообщения выделено
          </span>
          <div { ...cls('selected-buttons') }>
            <div { ...cls('menu-with-drop-down', 'tone-menu') }>
              <Button
                { ...cls('tone-menu') }
                size={ 24 }
                color="gray"
                transparent
                onClick={ () => setIsOpenToneMenu(true) }
              >
                <span role="img" aria-label="позитив">😁</span>
              </Button>
              <DropDown
                { ...cls('drop-down', 'tone-menu') }
                isOpen={ isOpenToneMenu }
                onClose={ handleCloseDropDown }
              >
                {menuElement(toneMenu)}
              </DropDown>
            </div>
            <Button
              { ...cls('check-button') }
              icon={ CheckIcon }
              size={ 24 }
              color="gray"
              transparent
            />
            <Button
              { ...cls('star-button') }
              icon={ StarIcon }
              size={ 24 }
              color="gray"
              transparent
            />
            <Button
              { ...cls('add-person-button') }
              icon={ AddPersonIcon }
              size={ 24 }
              color="gray"
              transparent
            />
            <Button
              { ...cls('add-person-button') }
              icon={ TagIcon }
              size={ 24 }
              color="gray"
              transparent
            />
            <Button
              { ...cls('delete-button') }
              icon={ TrashIcon }
              size={ 24 }
              color="gray"
              transparent
            />
          </div>
          <div { ...cls('select-export') }>
            <Button
              { ...cls('export-button') }
              size={ 24 }
              color="gray"
              link
            >
              Экспортировать
            </Button>
            <span { ...cls('export-count') }>max 500</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessagesControlPanel;
