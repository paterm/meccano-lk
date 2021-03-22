import React, { useState } from 'react';
import { classes } from '@utils';
import { IMobileStructure } from './MenuStructure';
import Button from '../../../../ui/Button/Button';
import MobileSubMenu from './src/MobileSubMenu/MobileSubMenu';
import MobileMenuItem from './src/MobileMenuItem/MobileMenuItem';
import './MobileMenu.css';

const cls = classes('mobile-menu');
const defaultSubMenu = {
  title: '',
  content: null,
  isOpen: false
};

type TSubMenu = {
  title: string
  content: React.ReactNode | null
  isOpen: boolean
};

interface IMobileMenu {
  onClose: () => void | undefined
  structure: IMobileStructure[]
}

const MobileMenu: React.FC<IMobileMenu> = ({
  onClose = () => {
  }, structure
}) => {
  const [ subMenu, setSubMenu ] = useState<TSubMenu>({ ...defaultSubMenu });
  const handleClose = () => {
    setSubMenu({ ...defaultSubMenu });
    onClose();
  };

  return (
    <>
      <div { ...cls() }>
        <menu { ...cls('menu') }>
          { structure.map((item, itemIndex) => (
            <MobileMenuItem
              key={ itemIndex }
              leftIcon={ item.leftIcon }
              leftIconAltText={ item.leftIconAltText }
              text={ item.text }
              subText={ item.subText }
              useRightIcon={ item.useRightIcon }
              count={ item.count }
              onClick={ () => {
                setSubMenu({
                  title: item.text,
                  content: item.content || item.children
                    ? item.children?.map((child, childIndex) => (
                      <MobileMenuItem
                        key={ childIndex }
                        leftIcon={ child.leftIcon }
                        leftIconAltText={ child.leftIconAltText }
                        text={ child.text }
                        subText={ child.subText }
                        useRightIcon={ child.useRightIcon }
                        count={ child.count }
                        rightContent={ child.rightContent }
                      />
                    ))
                    : null,
                  isOpen: true
                });
              } }
            />
          )) }
        </menu>

        <Button
          { ...cls('logout') }
          rounded
        >
          Выход
        </Button>

      </div>
      <MobileSubMenu
        title={ subMenu.title }
        isOpen={ subMenu.isOpen }
        onBack={ () => setSubMenu({ ...subMenu, isOpen: false }) }
        onClose={ handleClose }
      >
        { subMenu?.content }
      </MobileSubMenu>
    </>
  );
};

export default MobileMenu;
