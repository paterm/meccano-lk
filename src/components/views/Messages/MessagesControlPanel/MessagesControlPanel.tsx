import React, { useState } from 'react';
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
import './MessagesControlPanel.css';
import Button from 'src/components/ui/Button/Button';
import DropDown from 'src/components/ui/DropDown/DropDown';

const cls = classes('messages-control-panel');

interface IMessagesControlPanel {
  className?: string
  pagination?: {
    currentPage: number,
    pageCount: number,
    totalCount: number,
    perPage: number,
  }
  filterPortal?: React.ComponentType
  onSelectAll: (value: boolean) => void
}

const MessagesControlPanel: React.FC<IMessagesControlPanel> = ({
  className,
  pagination,
  onSelectAll,
  filterPortal: FilterPortal = () => null,
}) => {
  const { isMobile } = useSelector((state: IStore) => state.mobile);
  const [ isOpenSoftMenu, setIsOpenSoftMenu ] = useState(false);
  const [ isOpenMoreMenu, setIsOpenMoreMenu ] = useState(false);
  const [ isOpenReactionMenu, setIsReactionMenu ] = useState(false);

  const sortMenu = [
    { label: 'Сначала новые', onClick: () => console.log('Нажал Сначала новые') },
    { label: 'Сначала старые', onClick: () => console.log('Нажал Сначала старые') },
    { label: 'По вовлечению', onClick: () => console.log('Нажал По вовлечению') },
    { label: 'По комментариям', onClick: () => console.log('Нажал По комментариям') },
    { label: 'По аудитории', onClick: () => console.log('Нажал По аудитории') },
    { label: 'По просмотрам', onClick: () => console.log('Нажал По просмотрам') },
  ];

  const moreMenu = [
    { label: '100 сообщений на странице', onClick: () => console.log('Нажал 100 сообщений на странице') },
    { label: 'Показать всё', onClick: () => console.log('Показать всё') }
  ];

  const handleCloseDropDown = () => {
    setIsOpenSoftMenu(false);
    setIsOpenMoreMenu(false);
    setIsReactionMenu(false);
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
      size="s"
      checked
      onChange={ onSelectAll }
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
        <SortIcon />
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
      <div { ...cls('main-panel') }>
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
            />
          )}
        { softElement }
        { !isMobile && pagination && paginationElement }
        { isMobile && (
          <div { ...cls('filter-drop-down') }>
            <Button
              // TODO Заменить на иконку фильтра, после вливания MECCANO-190
              { ...cls('filter-button') }
              icon={ SearchIcon }
              size={ 24 }
              color="coral"
              transparent
            />
            <FilterPortal />
          </div>
        ) }
        { moreElement }
      </div>
      {/* <div { ...cls('search-panel') }>
        { isMobile && searchElement }
      </div> */}
    </div>
  );
};

export default MessagesControlPanel;
