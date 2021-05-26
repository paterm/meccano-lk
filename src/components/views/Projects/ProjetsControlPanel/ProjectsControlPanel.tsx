import React, { useState, useContext } from 'react';
import { MobileContext } from 'src/contexts/MobileContext';
import { classes } from '@utils';
import Input from 'src/components/ui/Input/Input';
import Button from 'src/components/ui/Button/Button';
import DropDown from 'src/components/ui/DropDown/DropDown';
import { ReactComponent as HelpIcon } from '@assets/icons/button/help.svg';
import { ReactComponent as SortIcon } from '@assets/icons/button/sort.svg';
import { ReactComponent as SearchIcon } from '@assets/icons/button/search.svg';
import './ProjectsControlPanel.css';

const cls = classes('projects-control-panel');

const testOnClick = (message: any) => {
  // eslint-disable-next-line no-console
  console.log(`onClick => ${message}`);
};

interface IProjectsControlPanel {
  className?: string
}

const ProjectsControlPanel: React.FC<IProjectsControlPanel> = ({
  className: mix,
}) => {
  const { isMobile } = useContext(MobileContext);
  const [ isOpenSortMenu, setIsOpenSortMenu ] = useState(false);

  const sortMenu = [
    { label: 'По активности', onClick: () => testOnClick('Нажал По активности') },
    { label: 'По кол-ву сообщений', onClick: () => testOnClick('Нажал По кол-ву сообщений') },
  ];

  const handleCloseDropDown = () => {
    setIsOpenSortMenu(false);
  };

  const menuElement = (menu: {
    label: string | React.ComponentType
    onClick: () => void
  }[]) => (
    <ul { ...cls('menu-list') }>
      {menu?.map(({ label, onClick }, index) => (
        <li key={ index } { ...cls('menu-item') }>
          <Button
            { ...cls('menu-button') }
            onClick={ onClick }
            onClickCallback={ handleCloseDropDown }
            color="gray"
            transparent
          >
            {label}
          </Button>
        </li>
      ))}
    </ul>
  );

  const searchElement = (
    <div { ...cls('search') }>
      <Input
        { ...cls('search-input') }
        type="search"
        placeholder="Поиск ..."
        size={ 32 }
        rounded
      />
      <Button
        icon={ HelpIcon }
        size={ 24 }
        color="gray"
        transparent
      />
    </div>
  );

  const sortElement = (
    <div { ...cls('menu-with-drop-down', 'sort-menu') }>
      <Button
        { ...cls('sort-button') }
        size={ 24 }
        color="gray"
        transparent
        icon={ !isMobile ? undefined : SortIcon }
        onClick={ () => setIsOpenSortMenu(true) }
      >
        <SortIcon { ...cls('sort-icon') } />
        { !isMobile && <span>По активности</span> }
      </Button>
      <DropDown
        { ...cls('drop-down') }
        isOpen={ isOpenSortMenu }
        onClose={ handleCloseDropDown }
      >
        {menuElement(sortMenu)}
      </DropDown>
    </div>
  );

  return (
    <div { ...cls('', '', mix) }>
      <div { ...cls('main-panel') }>
        { !isMobile
          ? searchElement
          : (
            <Button
              { ...cls('button-search') }
              icon={ SearchIcon }
              size={ 24 }
              color="gray"
              transparent
            />
          )}
        { sortElement }
      </div>
    </div>
  );
};

export default ProjectsControlPanel;
