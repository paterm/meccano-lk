import React from 'react';
import { classes } from '@utils';
import Checkbox from 'src/components/ui/Checkbox/Checkbox';
import './FilterList.css';

const cls = classes('filter-list');

export interface IFilterData {
  groupId: string
  groupName: string
  filterId: string
  filterName: string
  isDisabled: boolean
  isActivated: boolean
  counter?: number | null
}

interface IFilterDataGroup {
  groupId: string
  groupName: string
  filters: IFilterData[]
}

interface IFilterList {
  className?: string
  screen?: 'desktop' | 'mobile'
  filters: IFilterData[]
}

const FilterList:React.FC<IFilterList> = (props) => {
  const {
    className: mix = '',
    screen = 'desktop',
    filters = []
  } = props;

  const groups = Array.from(new Set(filters.map((filter) => filter.groupId)));

  const groupedFilters: IFilterDataGroup[] = groups.map((groupId) => {
    const groupFilters = filters.filter((filter) => filter.groupId === groupId);
    return {
      groupId,
      groupName: groupFilters[0]?.groupName,
      filters: groupFilters
    };
  });

  const getFilterItemElement = (filter: IFilterData) => (
    <div
      { ...cls('filter-item') }
      key={ filter.filterId }
    >
      <Checkbox
        { ...cls('filter-checkbox') }
        onChange={ () => {} }
        checked={ filter.isActivated }
        size="s"
      />
      <div
        { ...cls('filter-name', { actived: filter.isActivated }) }
      >
        { filter.filterName }
      </div>
      {filter.counter && (
        <div
          { ...cls('filter-counter', { actived: filter.isActivated }) }
        >
          { filter.counter }
        </div>
      )}
    </div>
  );

  const filterListDesktopElement = groupedFilters.map((group) => (
    <div
      { ...cls('desktop-group') }
      key={ group.groupId }
    >
      <div { ...cls('desktop-group-name') }>
        { group.groupName }
      </div>
      <div { ...cls('desktop-filters') }>
        { group.filters.map((filter) => getFilterItemElement(filter)) }
      </div>
    </div>
  ));

  const filterListMobileElement = (
    <div>Мобильная версия</div>
  );

  return (
    <div { ...cls('', screen, mix) }>
      {screen ? filterListDesktopElement : filterListMobileElement}
    </div>
  );
};

export default FilterList;
