import React, { useEffect, useState } from 'react';
import { classes } from '@utils';
import './StringInputNumber.css';

const cls = classes('string-input-number');

interface IStringInputNumber {
  className?: string
  value: number
  onChange: (value: number) => void
  step?: number
  max?: number
  min?: number
  buttonPosition?: 'left' | 'right'
}

const StringInputNumber: React.FC<IStringInputNumber> = (
  {
    className,
    value,
    onChange,
    step = 1,
    max = 100,
    min = 0,
    buttonPosition = 'right'
  }
) => {
  const [ inputValue, setInputValue ] = useState<number>(value);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(+event.target.value);
  };

  useEffect(() => {
    if (value <= max && value >= min) {
      setInputValue(value);
    }
  }, [ value, min, max ]);

  return (
    <div { ...cls('', { [buttonPosition]: true }, className) }>
      <input
        { ...cls('field') }
        type="string"
        value={ inputValue < 10 ? `0${inputValue}` : inputValue }
        onChange={ handleChange }
      />

      <div { ...cls('buttons') }>
        <button
          { ...cls('button', 'plus') }
          onClick={ () => onChange(inputValue + step) }
        >
          +
        </button>
        <button
          { ...cls('button', 'minus') }
          onClick={ () => onChange(inputValue - step) }
        >
          -
        </button>
      </div>
    </div>
  );
};

export default StringInputNumber;
