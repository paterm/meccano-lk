import React, { useEffect, useState, useContext } from 'react';
import { MobileContext } from 'src/contexts/MobileContext';
import { classes, usePopup } from '@utils';
import { ReactComponent as DropDownIcon } from '@assets/icons/button/drop-down.svg';
import { ReactComponent as CloseIcon } from '@assets/icons/button/close.svg';
import Overlay from '../Overlay/Overlay';
import DropDown from '../DropDown/DropDown';
import Button from '../Button/Button';
import './PseudoPopup.css';

const cls = classes('pseudo-popup');

interface IPseudoPopup {
  className?: string
  overlay?: boolean
  overlayPosition?: 'absolute' | 'fixed'
  title?: string
  childrenView?: string
  childrenViewName?: string
  children?: React.ReactNode | string
  bar?: React.ReactNode | string
  menu?: {
    view: string
    name: string
    onClick?: () => void
  }[]
}

const PseudoPopup: React.FC<IPseudoPopup> = ({
  className,
  overlay = true,
  overlayPosition = 'absolute',
  title,
  childrenView,
  childrenViewName = '',
  children,
  bar,
  menu,
}) => {
  const { isMobile } = useContext(MobileContext);
  const [isOpenDropDown, setIsOpenDropDown] = useState(false);
  const popup = usePopup();

  useEffect(() => {
    const body = document.querySelector('body');
    if (!isMobile) {
      if (body) body.style.overflow = 'hidden';
    }

    return () => {
      if (body) body.removeAttribute('style');
    };
  }, [isMobile]);

  const handleCloseDropDown = () => {
    setIsOpenDropDown(false);
  };

  const menuElement = (
    <ul { ...cls('menu-list') }>
      {menu?.map(({ view, name, onClick }, index) => (
        <li key={ index } { ...cls('menu-item') }>
          <Button
            { ...cls('menu-button') }
            filled={ view === childrenView }
            onClick={ onClick }
            onClickCallback={ handleCloseDropDown }
          >
            {name}
          </Button>
        </li>
      ))}
    </ul>
  );

  const drowDownWithMenuElement = (
    <div { ...cls('menu-with-drop-down') }>
      <Button
        { ...cls('menu-button') }
        rightIcon={ DropDownIcon }
        rounded
        onClick={ () => setIsOpenDropDown(!isOpenDropDown) }
      >
        { childrenViewName }
      </Button>
      <DropDown
        { ...cls('drop-down') }
        isOpen={ isOpenDropDown }
        onClose={ handleCloseDropDown }
      >
        {menuElement}
      </DropDown>
    </div>
  );

  return (
    <div { ...cls('', '', className) }>
      <div { ...cls('wrapper') }>
        <Button
          { ...cls('close-button') }
          icon={ CloseIcon }
          size={ 24 }
          color="gray"
          transparent
          onClick={ () => popup.close() }
        />
        <div { ...cls('container', '', 'container') }>
          <div { ...cls('title') }>
            {title}
          </div>
          <div { ...cls('bar') }>
            { !!menu && !isMobile ? menuElement : drowDownWithMenuElement }
            {bar}
          </div>
          <div { ...cls('body') }>
            {children}
          </div>
        </div>
      </div>
      {overlay && <Overlay position={ overlayPosition } />}
    </div>
  );
};

export default PseudoPopup;
