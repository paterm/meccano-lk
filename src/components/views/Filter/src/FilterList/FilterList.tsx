import React from 'react';
import { classes } from '@utils';
import Checkbox from 'src/components/ui/Checkbox/Checkbox';
import Accordion from 'src/components/ui/Accordion/Accordion';
import { ReactComponent as ArrowRightIcon } from '@assets/icons/button/arrow-right.svg';
import './FilterList.css';
import Button from 'src/components/ui/Button/Button';

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
    <Accordion
      { ...cls('accordion') }
      Header={ (headerProps: any) => (
        <div { ...cls('accordion-header') }>
          <Button
            { ...cls('accordion-header-button', { first: headerProps.index === 0 }) }
            onClick={ headerProps.onToggle }
          >
            { headerProps.groupName }
            <span { ...cls('accordion-header-badge') }>{ headerProps.filters.length }</span>
            <ArrowRightIcon { ...cls('accordion-header-arrow', { 'is-open': headerProps.isOpen }) } />
          </Button>
        </div>
      ) }
      Body={ (bodyProps: any) => (
        <div { ...cls('accordion-body') }>
          { bodyProps.filters.map(getFilterItemElement) }
        </div>
      ) }
      data={ groupedFilters }
      keyField="groupId"
    />
  );

  return (
    <div { ...cls('', screen, mix) }>
      {screen === 'desktop' ? filterListDesktopElement : filterListMobileElement}
    </div>
  );
};

export default FilterList;
