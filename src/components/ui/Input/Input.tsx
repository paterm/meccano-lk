import React, { useRef } from 'react';
import { ReactComponent as VisibilityIcon } from '../../../assets/icons/input/visibility.svg';
import { ReactComponent as SearchIcon } from '../../../assets/icons/input/search.svg';
import { classes } from '../../../utils/helpers';
import './Input.css';

const cls = classes('input');

interface InputProps {
  className?: string
  type?: 'text' | 'search' | 'number' | 'password'
  size?: 48 | 36
  label?: string
  placeholder?: string
  isValid?: boolean
  disabled?: boolean
  message?: string
  onChange?: (event: React.ChangeEvent) => void
  ref?: HTMLInputElement
}

const Input: React.FC<InputProps> = ({
  className,
  type = 'text',
  size = 48,
  label,
  placeholder,
  isValid = true,
  disabled,
  message,
  onChange,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

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
      <input
        { ...cls('field', {
          [size]: true,
          [type]: true,
          invalid: !isValid,
          disabled,
        }) }
        type={ type }
        placeholder={ placeholder }
        disabled={ disabled }
        onChange={ onChange }
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
    </label>
  );
};

export default Input;
