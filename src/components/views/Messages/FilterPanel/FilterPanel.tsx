import React, { useState } from 'react';
import { classes, usePopup } from '@utils';
import { ReactComponent as FilterIcon } from '@assets/icons/button/filter.svg';
import { ReactComponent as DownArrowIcon } from '@assets/icons/button/arrow-down.svg';
import { ReactComponent as EditIcon } from '@assets/icons/button/edit.svg';
import { ReactComponent as ConfigIcon } from '@assets/icons/dashboard/config.svg';
import Input from '../../../ui/Input/Input';
import Button from '../../../ui/Button/Button';
import FilterPanelGroup from './FilterPanelGroup/FilterPanelGroup';
import './FilterPanel.css';

const cls = classes('filter-panel');

interface IFilterPanel {
  className?: string
  filters: {
    group: string,
    label: string,
    isActived: boolean
  }[]
  templates: any[]
  activeTemplateId: string
  onApply?: () => void
  onReset?: () => void
  onChangeTemplate: (id: string) => void
  onCheck: any
  onDelete: any
}

const FilterPanel: React.FC<IFilterPanel> = ({
  className,
  filters,
  templates,
  activeTemplateId,
  onReset,
  onApply,
  onChangeTemplate,
  onCheck,
  onDelete
}) => {
  const [ isOpenTemplates, setIsOpenTemplates ] = useState(false);
  const popup = usePopup();

  const groups = Array.from(new Set(filters.map((el) => el.group)));
  const groupedFilters = groups.map((g) => (
    { group: g, values: filters.filter((f) => f.group === g) }
  ));

  const getTemplateLabel = (id: string) => templates
    .find((el) => el.id === id)?.name;

  const handleChangeTemplate = (id: string) => {
    onChangeTemplate(id);
    setIsOpenTemplates(false);
  };

  const filtersElement = (
    <div { ...cls('body') }>
      <Button
        { ...cls('template-select-button') }
        size={ 36 }
        color="gray"
        square
        onClick={ () => setIsOpenTemplates(true) }
      >
        {getTemplateLabel(activeTemplateId)}
        <DownArrowIcon { ...cls('template-select-arrow') } />
      </Button>
      <div { ...cls('groups') }>
        {groupedFilters.map(({ group, values }, index) => (
          <FilterPanelGroup
            { ...cls('group') }
            key={ index }
            name={ group }
            values={ values }
            onCheck={ onCheck }
            onDelete={ onDelete }
          />
        ))}
      </div>
      <div { ...cls('buttons') }>
        <Button
          { ...cls('apply-button') }
          size={ 36 }
          color="coral"
          filled
          square
          onClick={ onApply }
        >
          Применить
        </Button>
        <Button
          { ...cls('reset-button') }
          size={ 36 }
          color="gray"
          square
          onClick={ onReset }
        >
          Сбросить все
        </Button>
      </div>
    </div>
  );

  const templatesElement = (
    <div { ...cls('body') }>
      <Button
        { ...cls('template-select-button') }
        size={ 36 }
        color="gray"
        square
        onClick={ () => setIsOpenTemplates(false) }
      >
        К параметрам фильтра
        <DownArrowIcon { ...cls('template-select-arrow', 'opened') } />
      </Button>
      <Input
        { ...cls('template-search') }
        placeholder="Быстрый поиск шаблона"
        size={ 36 }
        type="search"
      />
      <div { ...cls('templates') }>
        {templates.map(({ name, id }, index) => (
          <Button
            { ...cls('template-button') }
            size={ 36 }
            color="gray"
            transparent
            square
            key={ index }
            onClick={ () => handleChangeTemplate(id) }
          >
            {name}
          </Button>
        ))}
      </div>
      <div { ...cls('buttons') }>
        <Button
          { ...cls('create-template-button') }
          size={ 36 }
          color="coral"
          square
          transparent
          leftIcon={ EditIcon }
        >
          Создать новый шаблон
        </Button>
        <Button
          { ...cls('setting-templates-button') }
          size={ 36 }
          color="coral"
          square
          transparent
          leftIcon={ ConfigIcon }
        >
          Управление шаблонами
        </Button>
      </div>
    </div>
  );

  return (
    <div
      { ...cls('', '', className) }
    >
      <div
        { ...cls('header') }
      >
        <Button
          { ...cls('setting-button') }
          size={ 48 }
          color="coral"
          transparent
          onClick={ () => popup.open('filter-main') }
        >
          <FilterIcon />
          Настроить фильтр
        </Button>
        {!isOpenTemplates && (
          <div { ...cls('filter-counter') }>
            4
          </div>
        )}
      </div>
      <div { ...cls('scroll-container') }>
        {!isOpenTemplates ? filtersElement : templatesElement }
      </div>
    </div>
  );
};

export default FilterPanel;
