import React, { useState } from 'react';
import { classes } from '@utils';
import { ReactComponent as DownArrowIcon } from '@assets/icons/button/down-arrow.svg';
import Button from '../../../../ui/Button/Button';
import './FilterPanelGroup.css';

const cls = classes('filter-panel-group');

interface IFilterPanelGroup {
  className?: string
  name?: string
  values: {
    group: string,
    label: string,
    icon: string
  }[]
  onApply?: () => void
}

const FilterPanelGroup: React.FC<IFilterPanelGroup> = ({
  name,
  values,
  className
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const style = {
    height: !isOpen ? 36 : 36 * (values.length + 1)
  };

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
        {name}
      </div>
      {values.map(({ label, icon }, index) => (
        <div
          { ...cls('value') }
          key={ index }
        >
          {icon && (
            <img
              { ...cls('value-icon') }
              src={ icon }
              alt=""
            />
          )}
          <span { ...cls('value-label') }>{ label }</span>
        </div>
      ))}
    </div>
  );
};

export default FilterPanelGroup;
