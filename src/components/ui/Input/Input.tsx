import React, {
  ChangeEvent,
  useEffect,
  useRef, useState
} from 'react';
import { classes } from '@utils';
import { ReactComponent as VisibilityIcon } from '@assets/icons/input/visibility.svg';
import { ReactComponent as SearchIcon } from '@assets/icons/input/search.svg';
import './Input.css';

const cls = classes('input');

interface IInput {
  className?: string
  type?: 'text' | 'search' | 'number' | 'password'
  size?: 48 | 32 | 36
  label?: string
  rounded?: boolean
  placeholder?: string
  isValid?: boolean
  disabled?: boolean
  message?: string
  value?: string
  onChange?: (event: React.ChangeEvent) => void
  ref?: HTMLInputElement
}

const Input: React.FC<IInput> = ({
  className,
  type = 'text',
  size = 48,
  label,
  placeholder,
  value: initializedValue = '',
  isValid = true,
  rounded,
  disabled,
  message,
  onChange,
}) => {
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setValue(initializedValue);
  }, [initializedValue])

  const handleChange = (evt: ChangeEvent) => {
    setValue((evt.target as HTMLInputElement).value)
    if (onChange) {
      onChange(evt);
    }
  }

  const showPassword = () => {
    if (inputRef.current !== null) inputRef.current.type = 'text';
  };

  const hidePassword = () => {
    if (inputRef.current !== null) inputRef.current.type = 'password';
  };

  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label
      { ...cls('', '', className) }
    >
      {!!label && (
        <span
          { ...cls('label', { invalid: !isValid }) }
        >
          { label }
        </span>
      )}
      <div { ...cls('field-wrapper') }>
        <input
          { ...cls('field', {
            [size]: true,
            [type]: true,
            rounded,
            invalid: !isValid,
            disabled,
          }) }
          type={ type }
          value={ value }
          placeholder={ placeholder }
          disabled={ disabled }
          onChange={ handleChange }
          ref={ inputRef }
        />
        {type === 'password' && (
          <VisibilityIcon
            { ...cls('visibility-icon') }
            onMouseDown={ showPassword }
            onMouseUp={ hidePassword }
            onMouseLeave={ hidePassword }
          />
        )}
        {type === 'search' && (
          <SearchIcon
            { ...cls('search-icon') }
          />
        )}
        {!!message && (
          <span
            { ...cls('message', { invalid: !isValid }) }
          >
            { message }
          </span>
        )}
      </div>
    </label>
  );
};

export default Input;
