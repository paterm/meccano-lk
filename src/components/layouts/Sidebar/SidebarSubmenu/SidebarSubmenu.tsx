import React from 'react';
import { classes } from '@utils';
import FireIcon from '@assets/icons/sidebar/fire.svg';
import { ISidebarChildren } from '../SidebarMenu';
import LinkOrFragment from '../../../ui/LinkOrFragment/LinkOrFragment';
import Input from '../../../ui/Input/Input';
import './SidebarSublist.css';

const cls = classes('sidebar-submenu');

interface ISubmenuItem {
  item: ISidebarChildren
}

const SubmenuItem: React.FC<ISubmenuItem> = ({ item }) => (
  <li { ...cls('item', { ref: item.red, 'non-hover': item.type === 'search' }) }>
    { item.type === 'search' ? (
      <>
        <Input type="search" placeholder="Быстрый поиск проекта" />
      </>
    ) : (
      <LinkOrFragment href={ item.link } { ...cls('link') }>
        <>
          { item.leftIcon }
          <div { ...cls('message-box') }>
            <span { ...cls('label') }>{ item.label }</span>
            { item.hot && <img { ...cls('hot-icon') } src={ FireIcon } alt={ item.label } /> }
          </div>
          { item.new && <span { ...cls('new-count') }>+{ item.new }</span> }
          { item.count && <span { ...cls('count') }>{ item.count }</span> }
        </>
      </LinkOrFragment>
    )}
  </li>
);

interface ISidebarSubmenu {
  data: ISidebarChildren[]
}

const SidebarSubmenu: React.FC<ISidebarSubmenu> = ({ data }) => data && (
  <div { ...cls() }>
    <ul { ...cls('list') }>
      { data
        .filter(({ fixedTop }) => fixedTop)
        .map((item, itemIndex) => <SubmenuItem item={ item } key={ itemIndex } />) }
    </ul>
    <ul { ...cls('list', 'scrollable') }>
      { data
        .filter(({ fixedTop, fixedBottom }) => !fixedTop && !fixedBottom)
        .map((item, itemIndex) => <SubmenuItem item={ item } key={ itemIndex } />) }
    </ul>
    <ul { ...cls('list') }>
      { data
        .filter(({ fixedBottom }) => fixedBottom)
        .map((item, itemIndex) => <SubmenuItem item={ item } key={ itemIndex } />) }
    </ul>
  </div>
);

export default SidebarSubmenu;
