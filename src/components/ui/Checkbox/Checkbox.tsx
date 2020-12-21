import React, { useState } from 'react';
import { classes } from '@utils';
import './Checkbox.css';

const cls = classes('checkbox');

interface ICheckbox {
  className?: string
  color?: 'coral' | 'green'
  size?: 's' | 'm' | 'l'
  label?: string
  checked?: boolean
  disabled?: boolean
  onChange: (checked: boolean) => void
}

const Checkbox: React.FC<ICheckbox> = ({
  className,
  color = 'coral',
  size = 'm',
  label,
  checked,
  disabled,
  onChange,
}) => {
  const [ isChecked, setIsChecked ] = useState(checked || false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(!!event.target.checked);
    onChange(!!event.target.checked);
  };

  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label
      { ...cls('', {
        [color]: true,
        [size]: true,
        checked: isChecked,
        disabled,
      }, className) }
    >
      <input
        { ...cls('box') }
        type="checkbox"
        checked={ isChecked }
        disabled={ disabled }
        onChange={ handleChange }
      />
      {!!label && (
        <span
          { ...cls('label') }
        >
          { label }
        </span>
      )}
    </label>
  );
};

export default Checkbox;
