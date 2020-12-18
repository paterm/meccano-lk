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
    isActived: boolean
  }[]
  templates: ISelectOption[]
  activeTemplate: string
  onApply?: () => void
  onReset?: () => void
  onCheck: any
  onDelete: any
}

const FilterPanel: React.FC<IFilterPanel> = ({
  className,
  filters,
  templates,
  activeTemplate,
  onCheck,
  onDelete
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
          transparent
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
          TODO: Тут не селект, в макете есть отображение
          <Select
            { ...cls('select') }
            options={ templates }
            selected={ activeTemplate }
            onChange={ console.log }
          />
          <div { ...cls('groups') }>
            {groupedFilters.map(({ group, values }, index) => (
              <FilterPanelGroup
                { ...cls('group') }
                key={ index }
                name={ group }
                values={ values }
                onCheck={ onCheck }
                onDelete={ onDelete }
              />
            ))}
          </div>
          <div { ...cls('buttons') }>
            <Button
              { ...cls('apply-button') }
              size={ 36 }
              color="coral"
              filled
              square
            >
              Применить
            </Button>
            <Button
              { ...cls('reset-button') }
              size={ 36 }
              color="gray"
              square
            >
              Сбросить все
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
