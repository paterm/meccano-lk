import React from 'react';
import { classes } from '../../../utils/helpers';
import './Checkbox.css';

const cls = classes('checkbox');

interface InputProps {
  className?: string
  color?: 'coral' | 'green'
  size?: 's' | 'm'
  label?: string
  checked: boolean
  disabled?: boolean
  onChange: (checked: boolean) => void
}

const Checkbox: React.FC<InputProps> = ({
  className,
  color = 'coral',
  size = 'm',
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
        [size]: true,
        checked,
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

export default Checkbox;
