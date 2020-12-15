import React from 'react';
import { classes } from '@utils';

const cls = classes('string-input-number');

interface IStringInputNumber {
  value: number,
  onChange: (value: number) => void
  step?: number
}

const StringInputNumber: React.FC<IStringInputNumber> = ({ value, onChange, step = 1 }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(+event.target.value);
  };

  return (
    <div { ...cls() }>
      <input
        { ...cls('field') }
        type="string"
        value={ value < 10 ? `0${value}` : value }
        onChange={ handleChange }
      />
      <button
        { ...cls('button', 'plus') }
        onClick={ () => onChange(value + step) }
      >
        +
      </button>
      <button
        { ...cls('button', 'minus') }
        onClick={ () => onChange(value - step) }
      >
        -
      </button>
    </div>
  );
};

export default StringInputNumber;
