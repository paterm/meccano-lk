import React, {
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react';
import { classes } from '@utils';

const cls = classes('drop-down');

interface IDropDown {
  className?: string
  children: React.ReactNode
}

const DropDown: React.FC<IDropDown> = ({ className, children }) => {
  const [ isOpen, setIsOpen ] = useState(false);
  const dropDownRef = useRef<HTMLInputElement>(null);

  const handleClickOutside = useCallback((e) => {
    const dropDown = dropDownRef && dropDownRef.current;

    if (dropDown && !dropDown.contains(e.target) && isOpen) {
      setIsOpen(false);
    }
  }, [ isOpen ]);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => document.removeEventListener('click', handleClickOutside, true);
  }, [ handleClickOutside ]);

  return isOpen ? (
    <div
      ref={ dropDownRef }
      { ...cls('', '', className) }
    >
      { children }
    </div>
  ) : null;
};

export default DropDown;
