import React, { useState } from 'react';
import { classes } from '@utils';
import IconButton from '../../../ui/IconButton/IconButton';
import { ReactComponent as RefreshIcon } from './assets/refresh.svg';
import { ReactComponent as SettingsIcon } from './assets/settings.svg';
import DropDown from '../../../ui/DropDown/DropDown';
import Checkbox from '../../../ui/Checkbox/Checkbox';
import { filters } from '../data';
import './FilterPanel.css';

const cls = classes('analytics-filters');

type TProps = {
  metricViewType: string
  diagramType: string
  onChange: (name: string, value: any) => void
};

const FilterPanel: React.FC<TProps> = (props) => {
  const [ isOpenFilters, setIsOpenFilters ] = useState(false);

  return (
    <div { ...cls() }>
      <IconButton { ...cls('button') } icon={ RefreshIcon } />
      <IconButton
        { ...cls('button', { active: isOpenFilters }) }
        icon={ SettingsIcon }
        onClick={ () => setIsOpenFilters(true) }
      >
        <DropDown
          { ...cls('drop-down') }
          isOpen={ isOpenFilters }
          onClose={ () => setIsOpenFilters(false) }
        >
          { filters.map((section, sectionIndex) => (
            <div { ...cls('filter') } key={ sectionIndex }>
              <div { ...cls('filter-label') }>{ section.label }</div>
              { section.fields.map((field, fieldIndex: number) => (
                <Checkbox
                  key={ fieldIndex }
                  onChange={ () => props.onChange(section.name, field.name) }
                  checked={ props[section.name] === field.name }
                  label={ field.label }
                />
              )) }
            </div>
          )) }
        </DropDown>
      </IconButton>
    </div>
  );
};

export default FilterPanel;
