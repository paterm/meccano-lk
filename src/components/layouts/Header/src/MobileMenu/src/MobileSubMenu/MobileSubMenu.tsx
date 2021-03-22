import React from 'react';
import { classes } from '@utils';
import Button from '../../../../../../ui/Button/Button';
import { ReactComponent as ArrowIcon } from '../../assets/header-right-chevron-24.svg';
import './MobileSubMenu.css';

const cls = classes('mobile-sub-menu');

interface IMobileSubMenu {
  title: string
  isOpen: boolean
  children: React.ReactNode
  onBack: () => void | undefined
  onClose: () => void | undefined
  backBtnLabel?: string | undefined
}

const MobileSubMenu: React.FC<IMobileSubMenu> = (
  {
    title,
    isOpen = false,
    children,
    onBack = () => {},
    onClose = () => {},
    backBtnLabel = 'Назад'
  }
) => (
  <div { ...cls('', { opened: isOpen }) }>
    <section { ...cls('head') }>
      <div { ...cls('head-left') }>
        <Button
          { ...cls('back-btn') }
          onClick={ onBack }
          inline
        >
          <ArrowIcon { ...cls('back-btn-icon') } />
          { backBtnLabel }
        </Button>
      </div>

      <div { ...cls('title') }>{ title }</div>

      <div { ...cls('head-right') }>
        <button { ...cls('close-btn') } onClick={ onClose } />
      </div>
    </section>

    <section { ...cls('body') }>
      { children }
    </section>
  </div>
);

export default MobileSubMenu;
