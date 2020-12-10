import React, { useState } from 'react';
import { classes } from '@utils';
import { IStore } from '@interfaces';
import { useSelector } from 'react-redux';
import { ReactComponent as DropDownIcon } from '@assets/icons/button/drop-down.svg';
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
  childrenViewName?: string
  children?: React.ReactNode | string
  bar?: React.ReactNode | string
  menu?: {
    name: string
    onClick?: () => void
  }[]
}

const PseudoPopup: React.FC<IPseudoPopup> = ({
  className,
  overlay = true,
  overlayPosition = 'absolute',
  title,
  childrenViewName,
  children,
  bar,
  menu,
}) => {
  const { isMobile } = useSelector((state:IStore) => state.mobile);
  const [isOpenDropDown, setIsOpenDropDown] = useState(false);

  const handleCloseDropDown = () => {
    setIsOpenDropDown(false);
  };

  const menuElement = (
    <ul { ...cls('menu-list') }>
      {menu?.map(({ name, onClick }, index) => (
        <li key={ index } { ...cls('menu-item') }>
          <Button
            { ...cls('menu-button') }
            filled={ name === childrenViewName }
            onClick={ onClick }
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
        {childrenViewName}
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
      {overlay && <Overlay position={ overlayPosition } />}
    </div>
  );
};

export default PseudoPopup;
