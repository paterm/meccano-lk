import React from 'react';
import { classes } from '@utils';
import Checkbox from 'src/components/ui/Checkbox/Checkbox';
import Input from 'src/components/ui/Input/Input';
import { ReactComponent as HelpIcon } from '@assets/icons/button/help.svg';
import { ReactComponent as SortIcon } from '@assets/icons/button/sort.svg';
import { ReactComponent as ArrowLeftIcon } from '@assets/icons/button/arrow-left.svg';
import { ReactComponent as ArrowRightIcon } from '@assets/icons/button/arrow-right.svg';
import { ReactComponent as MoreIcon } from '@assets/icons/button/more.svg';
import './MessagesControlPanel.css';
import Button from 'src/components/ui/Button/Button';

const cls = classes('messages-control-panel');

interface IMessagesControlPanel {
  className?: string
  pagination?: {
    currentPage: number,
    pageCount: number,
    totalCount: number,
    perPage: number
  }
  onSelectAll: (value: boolean) => void
}

const MessagesControlPanel: React.FC<IMessagesControlPanel> = ({
  className,
  pagination,
  onSelectAll,
}) => {
  const selectAllCheckboxElement = (
    <Checkbox
      { ...cls('select-all') }
      size="s"
      checked
      onChange={ onSelectAll }
    />
  );

  const searchElement = (
    <Input
      { ...cls('search') }
      type="search"
      placeholder="Поиск ..."
      size={ 32 }
      rounded
    />
  );

  const softElement = (
    // TODO заменить на leftIcon после вливания ветки MECCANO-190
    <Button
      { ...cls('sort-button') }
      size={ 24 }
      color="gray"
      transparent
    >
      <SortIcon />
      Сначала экспортированные
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
    <div
      { ...cls('', '', className) }
    >
      { selectAllCheckboxElement }
      { searchElement }
      <Button
        icon={ HelpIcon }
        size={ 24 }
        color="gray"
        transparent
      />
      { softElement }
      { pagination && paginationElement }
      <Button
        { ...cls('more-button') }
        icon={ MoreIcon }
        size={ 24 }
        color="gray"
        transparent
      />
    </div>
  );
};

export default MessagesControlPanel;
