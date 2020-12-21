import React from 'react';
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
    // TODO заменить на leftIcon после вливания ветки MECCANO-190
    <Button
      { ...cls('sort-menu') }
      size={ 24 }
      color="gray"
      transparent
      icon={ !isMobile ? undefined : SortIcon }
    >
      <SortIcon />
      { !isMobile && <span>Сначала экспортированные</span> }
    </Button>
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
        из&nbsp;{ pagination?.currentPage }
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
        <Button
          { ...cls('more-menu') }
          icon={ MoreIcon }
          size={ 24 }
          color="gray"
          transparent
        />
      </div>
      {/* <div { ...cls('search-panel') }>
        { isMobile && searchElement }
      </div> */}
    </div>
  );
};

export default MessagesControlPanel;
