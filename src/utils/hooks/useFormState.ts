import { useState, ChangeEvent } from 'react';

export const useFormState = (initialValue: any) => {
  const [ value, setValue ] = useState(initialValue);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return { value, onChange: handleChange };
};
