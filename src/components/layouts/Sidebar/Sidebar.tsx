import React from 'react';
import { classes } from '@utils';
import { ReactComponent as RightArrow } from '@assets/icons/sidebar/right-arrow.svg';
import { SIDEBAR_MENU } from './SidebarMenu';
import LinkOrFragment from '../../ui/LinkOrFragment/LinkOrFragment';
import SidebarSubmenu from './SidebarSubmenu/SidebarSubmenu';
import './Sidebar.css';

const cls = classes('sidebar');

const Sidebar: React.FC = () => (
  <aside { ...cls() }>
    <nav { ...cls('nav') }>
      { SIDEBAR_MENU.map((item, itemIndex) => (
        <li { ...cls('item', { active: item.active }) } key={ itemIndex }>
          <LinkOrFragment href={ item.link } { ...cls('link') }>
            { item.Icon }
            <span { ...cls('item-name') }>{ item.label }</span>
            { item.rightArrow && <RightArrow { ...cls('right-arrow') } />}

            { item.children && <SidebarSubmenu data={ item.children } /> }
          </LinkOrFragment>
        </li>
      ))}
    </nav>
  </aside>
);

export default Sidebar;
