import React from 'react';
import { classes } from '@utils';
import { ReactComponent as FilterIcon } from '@assets/icons/button/filter.svg';
import Button from '../../../ui/Button/Button';
import Select, { ISelectOption } from '../../../ui/Select/Select';
import FilterPanelGroup from './FilterPanelGroup/FilterPanelGroup';
import './FilterPanel.css';

const cls = classes('filter-panel');

interface IFilterPanel {
  className?: string
  filters: {
    group: string,
    label: string,
    icon: string
  }[]
  templates: ISelectOption[]
  activeTemplate: string
  onApply?: () => void
  onReset?: () => void
}

const FilterPanel: React.FC<IFilterPanel> = ({
  className,
  filters,
  templates,
  activeTemplate
}) => {
  const groups = Array.from(new Set(filters.map((el) => el.group)));
  const groupedFilters = groups.map((g) => (
    { group: g, values: filters.filter((f) => f.group === g) }
  ));

  return (
    <div
      { ...cls('', '', className) }
    >
      <div
        { ...cls('header') }
      >
        <Button
          { ...cls('setting-button') }
          size={ 48 }
          color="coral"
          // transparent
        >
          <FilterIcon />
          Настроить фильтр
        </Button>
      </div>
      <div
        { ...cls('scroll-container') }
      >
        <div
          { ...cls('body') }
        >
          <Select
            { ...cls('select') }
            options={ templates }
            selected={ activeTemplate }
            onChange={ console.log }
          />
          {groupedFilters.map(({ group, values }, index) => (
            <FilterPanelGroup
              { ...cls('group') }
              key={ index }
              name={ group }
              values={ values }
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
