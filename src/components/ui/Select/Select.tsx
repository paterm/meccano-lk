import React from 'react';
import ReactSelect from 'react-select';
import { classes } from '@utils';
import { ReactSelectStyle } from './ReactSelectStyle';
import './Select.css';

const cls = classes('select');

export interface ISelectOption {
  label: string | React.ReactNode
  value: string | number
}

interface ISelect {
  className?: string
  placeholder?: string
  options?: ISelectOption[]
  selected: string
  isMulti?: boolean
  isDisabled?: boolean
  isClearable?: boolean
  onChange: (item: any) => void
}

const Select: React.FC<ISelect> = (
  {
    className,
    placeholder = 'Выберите...',
    options = [],
    selected = '',
    isMulti = false,
    isDisabled = false,
    isClearable = false,
    onChange
  }
) => {
  const selectedValue = options.find(({ value }) => value === selected);

  return (
    <div { ...cls('', '', className) }>
      <ReactSelect
        options={ options }
        placeholder={ placeholder }
        value={ selectedValue || null }
        isMulti={ isMulti }
        isDisabled={ isDisabled }
        isClearable={ isClearable }
        onChange={ onChange }
        classNamePrefix="select"
        styles={ ReactSelectStyle({
          rounded: true
        }) }
      />
    </div>
  );
};

export default Select;
