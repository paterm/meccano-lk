import React from 'react';
import { classes } from '@utils';
import './Switch.css';

const cls = classes('switch');

interface ISwitch {
  className?: string
  color?: 'coral'
  label?: string
  checked: boolean
  disabled?: boolean
  onChange: (checked: boolean) => void
}

const Switch: React.FC<ISwitch> = ({
  className,
  color = 'coral',
  label,
  checked,
  disabled,
  onChange,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(!!event.target.checked);
  };

  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label
      { ...cls('', {
        [color]: true,
        checked,
        label,
        disabled,
      }, className) }
    >
      <input
        { ...cls('box') }
        type="checkbox"
        checked={ checked }
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

export default Switch;
