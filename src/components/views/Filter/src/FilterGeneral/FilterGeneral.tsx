import React, { useContext } from 'react';
import { MobileContext } from 'src/contexts/MobileContext';
import { classes } from '@utils';
import { ReactComponent as EditIcon } from '@assets/icons/button/edit.svg';
import { ReactComponent as SaveIcon } from '@assets/icons/button/save.svg';
import { ReactComponent as MinusIcon } from '@assets/icons/button/chekbox-minus.svg';
import { ReactComponent as CloseIcon } from '@assets/icons/button/close.svg';
import Button from '../../../../ui/Button/Button';
import FilterList, { IFilterData } from '../FilterList/FilterList';
import './FilterGeneral.css';

const cls = classes('filter-general');

const filterKeysTempData: IFilterData[] = [
  {
    groupId: 'g1',
    groupName: 'Тональность',
    filterId: 'g1f1',
    filterName: '😁 Позитив',
    isDisabled: false,
    isActivated: false,
    counter: 33
  },
  {
    groupId: 'g1',
    groupName: 'Тональность',
    filterId: 'g1f2',
    filterName: '😐 Нейтрал',
    isDisabled: true,
    isActivated: true,
    counter: 43
  },
  {
    groupId: 'g1',
    groupName: 'Тональность',
    filterId: 'g1f3',
    filterName: '😡 Негатив',
    isDisabled: false,
    isActivated: true,
    counter: 266
  },
  {
    groupId: 'g2',
    groupName: 'Язык',
    filterId: 'g2f1',
    filterName: 'Русский',
    isDisabled: false,
    isActivated: true,
    counter: 342
  },
  {
    groupId: 'g3',
    groupName: 'Рубрика',
    filterId: 'g3f1',
    filterName: 'Компании',
    isDisabled: false,
    isActivated: false,
    counter: 3
  },
  {
    groupId: 'g3',
    groupName: 'Рубрика',
    filterId: 'g3f2',
    filterName: 'Конкуренты',
    isDisabled: false,
    isActivated: false,
    counter: 13
  },
  {
    groupId: 'g3',
    groupName: 'Рубрика',
    filterId: 'g3f3',
    filterName: 'Отрасль',
    isDisabled: false,
    isActivated: false,
    counter: null
  },
  {
    groupId: 'g3',
    groupName: 'Рубрика',
    filterId: 'g3f4',
    filterName: 'Компании',
    isDisabled: false,
    isActivated: false,
    counter: null
  },
  {
    groupId: 'g3',
    groupName: 'Рубрика',
    filterId: 'g3f5',
    filterName: 'Отрасль',
    isDisabled: false,
    isActivated: false,
    counter: null
  },
  {
    groupId: 'g3',
    groupName: 'Рубрика',
    filterId: 'g3f6',
    filterName: 'Компании',
    isDisabled: false,
    isActivated: false,
    counter: null
  },
];

const templateTempData = [
  {
    id: '1',
    isDisabled: false,
    type: 'Тональность',
    value: 'негатив',
    color: 'var(--watermelon)'
  },
  {
    id: '2',
    isDisabled: false,
    type: 'Язык',
    value: 'Русский',
  },
  {
    id: '3',
    isDisabled: false,
    type: 'Рубрика',
    value: 'Конкуренты',
  },
  {
    id: '4',
    isDisabled: true,
    type: 'Тональность',
    value: 'нейтрал',
    color: 'var(--orange-yellow)'
  },
  {
    id: '5',
    isDisabled: false,
    type: 'Метод сбора',
    value: 'Автоматический',
  },
];

const FilterGeneral:React.FC = () => {
  const { isMobile } = useContext(MobileContext);

  const getFilterTemplateElement = (data: any) => data.map((el: any) => {
    const colorStyle = el?.color
      ? { color: el.color }
      : {};

    return (
      <div { ...cls('template-item') } key={ el.id }>
        {el.isDisabled && (
          <div { ...cls('template-item-disable-icon') }><MinusIcon /></div>
        )}
        <div { ...cls('template-item-type') }>{ el.type }</div>
        <div { ...cls('template-item-value') } style={ colorStyle }>{ el.value }</div>
        <Button
          { ...cls('template-item-button-delete') }
          icon={ CloseIcon }
          color="gray"
          transparent
          size={ 16 }
        />
      </div>
    );
  });

  return (
    <div { ...cls() }>
      <div { ...cls('body') }>
        <div { ...cls('control-panel') }>
          <Button
            { ...cls('button', 'create') }
            size={ isMobile ? 48 : 16 }
            color="gray"
            square={ !isMobile }
            link={ !isMobile }
            leftIcon={ isMobile ? undefined : EditIcon }
            icon={ isMobile ? EditIcon : undefined }
            rounded={ isMobile }
          >
            { !isMobile && 'Создать шаблон' }
          </Button>
          { isMobile && (
            <Button
              { ...cls('button', 'save') }
              size={ 48 }
              color="gray"
              icon={ SaveIcon }
              rounded
            />
          ) }
          <Button
            { ...cls('button', 'disabled') }
            size={ isMobile ? 48 : 16 }
            color={ isMobile ? 'coral' : 'gray' }
            filled={ isMobile }
            square={ !isMobile }
            link={ !isMobile }
            leftIcon={ isMobile ? undefined : MinusIcon }
            icon={ isMobile ? MinusIcon : undefined }
            rounded={ isMobile }
          >
            { !isMobile && 'Отключить все' }
          </Button>
          <Button
            { ...cls('button', 'reset') }
            size={ isMobile ? 48 : 16 }
            color="gray"
            square={ !isMobile }
            link={ !isMobile }
            leftIcon={ isMobile ? undefined : CloseIcon }
            icon={ isMobile ? CloseIcon : undefined }
            rounded={ isMobile }
          >
            { !isMobile && 'Сбросить все' }
          </Button>
        </div>
        { !isMobile && (
          <div { ...cls('filter-template') }>
            { getFilterTemplateElement(templateTempData) }
          </div>
        ) }
        <FilterList
          { ...cls('filter-list') }
          screen={ isMobile ? 'mobile' : 'desktop' }
          filters={ filterKeysTempData }
        />
        { isMobile && (
          <div { ...cls('filter-template', 'mobile') }>
            { getFilterTemplateElement(templateTempData) }
          </div>
        ) }
      </div>
      <div { ...cls('footer') }>
        <Button
          { ...cls('cancel-button') }
          type="button"
          color="coral"
        >
          Отмена
        </Button>
        <Button
          { ...cls('apply-button') }
          type="button"
          filled
        >
          Применить фильтр
        </Button>
      </div>
    </div>
  );
};

export default FilterGeneral;
