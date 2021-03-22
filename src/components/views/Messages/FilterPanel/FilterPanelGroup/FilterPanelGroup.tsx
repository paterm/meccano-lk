import React, { useState } from 'react';
import { classes } from '@utils';
import { ReactComponent as DownArrowIcon } from '@assets/icons/button/arrow-down.svg';
import { ReactComponent as DeleteIcon } from '@assets/icons/filter-panel/delete.svg';
import Button from '../../../../ui/Button/Button';
import Checkbox from '../../../../ui/Checkbox/Checkbox';
import './FilterPanelGroup.css';

const cls = classes('filter-panel-group');

interface IFilterPanelGroup {
  className?: string
  name?: string
  values: {
    group: string,
    label: string,
    isActived: boolean
  }[]
  onCheck: (values: any[]) => void
  onDelete: (values: any[]) => void
}

const FilterPanelGroup: React.FC<IFilterPanelGroup> = ({
  name,
  values,
  className,
  onCheck,
  onDelete
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const style = {
    height: !isOpen ? 36 : 36 * (values.length + 1)
  };

  const hangleCheckGroup = (value: boolean) => {
    const updatedValues = values
      .map((prevValue) => ({ ...prevValue, isActived: value }));
    onCheck(updatedValues);
  };

  const hangleCheckOne = (checkedLabel: string, value: boolean) => {
    const updatedValues = values
      .find(({ label }) => label === checkedLabel);
    if (updatedValues) updatedValues.isActived = value;
    onCheck([updatedValues]);
  };

  const hangleDeleteGroup = () => {
    onDelete(values);
  };

  const hangleDeleteOne = (checkedLabel: string) => {
    const updatedValues = values
      .find(({ label }) => label === checkedLabel);
    onDelete([updatedValues]);
  };

  const checkStateGroup = () => (values
    .every((el) => el.isActived)
  );

  const checkStateLabel = (checkedLabel: string) => (values
    .find((value) => value.label === checkedLabel)?.isActived || false
  );

  return (
    <div
      { ...cls('', '', className) }
      style={ style }
    >
      <div { ...cls('header') }>
        <Button
          { ...cls('open-button') }
          icon={ DownArrowIcon }
          color="coral"
          onClick={ () => setIsOpen(!isOpen) }
          // transparent
        />
        <span { ...cls('group-name') }>{name}</span>
        <Checkbox
          { ...cls('checkbox') }
          size="s"
          type="minus"
          checked={ checkStateGroup() }
          onChange={ (value) => hangleCheckGroup(value) }
        />
        <Button
          { ...cls('delete-button') }
          icon={ DeleteIcon }
          color="coral"
          onClick={ hangleDeleteGroup }
          // transparent
        />
      </div>
      {values.map(({ label }, index) => (
        <div
          { ...cls('value') }
          key={ index }
        >
          <span { ...cls('value-label') }>{ label }</span>
          <Checkbox
            { ...cls('checkbox') }
            size="s"
            type="minus"
            checked={ checkStateLabel(label) }
            onChange={ (value) => hangleCheckOne(label, value) }
          />
          <Button
            { ...cls('delete-button') }
            icon={ DeleteIcon }
            color="gray"
            onClick={ () => hangleDeleteOne(label) }
            // transparent
          />
        </div>
      ))}
    </div>
  );
};

export default FilterPanelGroup;
