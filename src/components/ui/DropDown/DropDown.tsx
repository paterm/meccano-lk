import React, { useCallback, useEffect, useRef } from 'react';
import { classes } from '@utils';
import './DropDown.css';
import Portal from '../Portal/Portal';

const cls = classes('drop-down');

interface IDropDown {
  className?: string
  children: React.ReactNode
  isOpen: boolean
  canCloseByClick?: boolean
  onClose: () => void
  // Создавать drop-down во внешнем контейнере (не в родителе)
  usePortal?: boolean
}

const DropDown: React.FC<IDropDown> = ({
  className,
  children,
  isOpen,
  onClose,
  canCloseByClick = false,
  usePortal = false,
}) => {
  const dropDownRef = useRef<HTMLInputElement>(null);

  const handleClickOutside = useCallback((e) => {
    const dropDown = dropDownRef && dropDownRef.current;
    const innerClick = dropDown && dropDown.contains(e.target);

    if (isOpen && ((canCloseByClick && innerClick) || !innerClick)) {
      onClose();
    }
  }, [ isOpen, onClose, canCloseByClick ]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape' && isOpen) {
      onClose();
    }
  }, [ isOpen, onClose ]);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => document.removeEventListener('click', handleClickOutside, true);
  }, [ handleClickOutside ]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [ handleKeyDown ]);

  if (!isOpen) return null;

  const DropDownElement = (
    <div
      ref={ dropDownRef }
      { ...cls('', { 'use-portal': usePortal }, className) }
    >
      { children }
    </div>
  )

  return usePortal
    ? (<Portal>{ DropDownElement }</Portal>)
    : DropDownElement
};

export default DropDown;
