import React, { useState } from 'react';
import { classes } from '@utils';
import './Accordion.css';

const cls = classes('accordion');

interface IAccordion {
  className?: string
  Header: React.ComponentType
  Body: React.ComponentType
  data: any
  keyField: string
}

const Accordion: React.FC<IAccordion> = (props) => {
  const {
    className: mix,
    Header,
    Body,
    data = [],
    keyField
  } = props;

  const [ openedGroups, setOpenedGroups ] = useState(data.map((item: any) => (
    {
      groupdId: item[keyField],
      isOpen: false
    }
  )));

  const findGroupByKey = (key: string | number) => openedGroups
    .find((elem: any) => elem.groupdId === key);

  const hasOpen = (key: string | number) => findGroupByKey(key).isOpen;

  const toggleOpenState = (key: string | number) => {
    const updatedGroups = [...openedGroups];
    const updatedGroup = findGroupByKey(key);
    const groupIndex = openedGroups.findIndex((elem: any) => elem === updatedGroup);
    updatedGroups[groupIndex].isOpen = true;
    setOpenedGroups(updatedGroups);
  };

  const handleHeaderClick = (key: string | number) => {
    console.log(key);
    toggleOpenState(key);
  };

  return (
    <div { ...cls('', '', mix) }>
      { data.map((group: any, index: number) => {
        const key = group[keyField] || index;

        return (
          <div { ...cls('group') } key={ key }>
            <div { ...cls('header') }>
              <Header
                { ...group }
                onClick={ () => handleHeaderClick(key) }
                isOpen={ hasOpen(key) }
              />
            </div>
            <div { ...cls('body') }>
              <Body
                { ...group }
                isOpen={ hasOpen(key) }
              />
            </div>
          </div>
        );
      }) }
    </div>
  );
};

export default Accordion;
