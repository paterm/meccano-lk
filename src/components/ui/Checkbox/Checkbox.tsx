import React, { useState, useEffect } from 'react';
import { classes } from '@utils';
import './Checkbox.css';

const cls = classes('checkbox');

interface ICheckbox {
  className?: string
  type?: 'tick' | 'minus'
  color?: 'coral' | 'green'
  size?: 's' | 'm' | 'l'
  label?: string
  checked?: boolean
  disabled?: boolean
  onChange: (checked: boolean) => void
  children?: React.ReactNode
}

const Checkbox: React.FC<ICheckbox> = ({
  className,
  type = 'tick',
  color = 'coral',
  size = 'm',
  label,
  checked,
  disabled,
  children,
  onChange,
}) => {
  const [ isChecked, setIsChecked ] = useState(checked || false);

  useEffect(() => {
    if (checked === undefined) return;
    setIsChecked(checked);
  }, [checked]);

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
        [type]: true,
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
      { children }
    </label>
  );
};

export default Checkbox;
