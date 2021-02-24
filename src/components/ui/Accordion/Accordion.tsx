import React, { useState, useEffect, useRef } from 'react';
import { classes } from '@utils';
import './Accordion.css';

const cls = classes('accordion');

interface IAccordion {
  className?: string
  Header: React.ComponentType
  Body: React.ComponentType
  data: any
  keyField: string
  single?: boolean
}

const Accordion: React.FC<IAccordion> = (props) => {
  const {
    className: mix,
    Header,
    Body,
    data = [],
    keyField,
    single = false
  } = props;

  const [ openedGroups, setOpenedGroups ] = useState([] as string[]);
  const refs = useRef([] as any[]);

  useEffect(() => {
    refs.current = refs.current.slice(0, data.length);
  }, [data]);

  const findGroupIndex = (key: any) => openedGroups
    .findIndex((elem: any) => elem === key);

  const hasOpen = (key: any) => findGroupIndex(key) > -1;

  const toggleOpenState = (key: any) => {
    if (single) {
      setOpenedGroups([key]);
      return;
    }

    const groupIndex = findGroupIndex(key);

    if (groupIndex === -1) {
      const updatedOpenedGroups: any = [...openedGroups];
      updatedOpenedGroups.push(key);
      setOpenedGroups(updatedOpenedGroups);
    } else {
      const updatedOpenedGroups: any = [...openedGroups];
      updatedOpenedGroups.splice(groupIndex, 1);
      setOpenedGroups(updatedOpenedGroups);
    }
  };

  const handleHeaderClick = (key: any) => {
    toggleOpenState(key);
  };

  return (
    <div { ...cls('', '', mix) }>
      { data.map((group: any, index: number) => {
        const key = group[keyField];

        return (
          <div { ...cls('group') } key={ key }>
            <div { ...cls('header') }>
              <Header
                { ...group }
                onToggle={ () => handleHeaderClick(key) }
                isOpen={ hasOpen(key) }
              />
            </div>
            <div
              { ...cls('body-wrapper') }
              style={
                hasOpen(key)
                  ? { height: refs.current[index]?.clientHeight }
                  : { height: 0 }
                }
            >
              <div
                { ...cls('body') }
                ref={ (el: any) => { refs.current[index] = el; } }
              >
                <Body
                  { ...group }
                  isOpen={ hasOpen(key) }
                />
              </div>
            </div>
          </div>
        );
      }) }
    </div>
  );
};

export default Accordion;
