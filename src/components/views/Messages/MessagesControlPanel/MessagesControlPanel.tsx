import React, { useState, useEffect } from 'react';
import { classes } from '@utils';
import Checkbox from 'src/components/ui/Checkbox/Checkbox';
import Input from 'src/components/ui/Input/Input';
import { IStore } from '@interfaces';
import { useSelector } from 'react-redux';
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
import Button from 'src/components/ui/Button/Button';
import DropDown from 'src/components/ui/DropDown/DropDown';

const cls = classes('messages-control-panel');

const testOnClick = (message: any) => {
  // eslint-disable-next-line no-console
  console.log(`onClick => ${message}`);
};

interface IMessagesControlPanel {
  className?: string
  pagination?: {
    currentPage: number,
    pageCount: number,
    totalCount: number,
    perPage: number,
  }
  onOpenFilter?: () => void
  onSelectAll: (value: boolean) => void
}

const MessagesControlPanel: React.FC<IMessagesControlPanel> = ({
  className,
  pagination,
  onSelectAll,
  onOpenFilter
}) => {
  const { isMobile } = useSelector((state: IStore) => state.mobile);
  const [ isOpenSoftMenu, setIsOpenSoftMenu ] = useState(false);
  const [ isOpenMoreMenu, setIsOpenMoreMenu ] = useState(false);
  const [ isOpenToneMenu, setIsOpenToneMenu ] = useState(false);
  const [ isOpenSeachSubPanel, setIsOpenSeachSubPanel ] = useState(false);
  const [ isOpenSelectedSubPanel, setIsOpenSelectedSubPanel ] = useState(false);

  useEffect(() => {
    setIsOpenSelectedSubPanel(false);
  }, [isOpenSeachSubPanel]);

  const handleSelectAll = (value: boolean) => {
    setIsOpenSelectedSubPanel(value);
    setIsOpenSeachSubPanel(false);
    onSelectAll(value);
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
      />
      <span { ...cls('pagination-range') }>
        { pagination?.currentPage }
        &nbsp;-&nbsp;
        { pagination?.pageCount }
      </span>
      <Button
        icon={ ArrowRightIcon }
        size={ 24 }
        color="gray"
        transparent
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
            23 сообщения выделено
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
