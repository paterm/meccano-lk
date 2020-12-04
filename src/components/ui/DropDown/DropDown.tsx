import React, { useCallback, useEffect, useRef } from 'react';
import { classes } from '@utils';
import './DropDown.css';

const cls = classes('drop-down');

interface IDropDown {
  className?: string
  children: React.ReactNode
  isOpen: boolean
  canCloseByClick?: boolean
  onClose: () => void
}

const DropDown: React.FC<IDropDown> = ({
  className,
  children,
  isOpen,
  onClose,
  canCloseByClick = false
}) => {
  const dropDownRef = useRef<HTMLInputElement>(null);

  const handleClickOutside = useCallback((e) => {
    const dropDown = dropDownRef && dropDownRef.current;
    const innerClick = dropDown && dropDown.contains(e.target);

    if (isOpen && ((canCloseByClick && innerClick) || !innerClick)) {
      onClose();
    }
  }, [ isOpen, onClose, canCloseByClick ]);

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
