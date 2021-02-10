import React from 'react';
import { classes } from '@utils';
import { ReactComponent as EditIcon } from '@assets/icons/button/edit.svg';
import { ReactComponent as MinusIcon } from '@assets/icons/button/chekbox-minus.svg';
import { ReactComponent as CloseIcon } from '@assets/icons/button/close.svg';
import Button from '../../../../ui/Button/Button';
import './FilterGeneral.css';

const cls = classes('filter-general');

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

const AccountGeneral:React.FC = () => {
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
            size={ 16 }
            color="gray"
            square
            link
            leftIcon={ EditIcon }
          >
            Создать шаблон
          </Button>
          <Button
            { ...cls('button', 'disabled') }
            size={ 16 }
            color="gray"
            square
            link
            leftIcon={ MinusIcon }
          >
            Отключить все
          </Button>
          <Button
            { ...cls('button', 'reset') }
            size={ 16 }
            color="gray"
            square
            link
            leftIcon={ CloseIcon }
          >
            Сбросить все
          </Button>
        </div>
        <div { ...cls('filter-template') }>
          { getFilterTemplateElement(templateTempData) }
        </div>
        <div { ...cls('filter-keys') }>Группы</div>
        Создать шаблон
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

export default AccountGeneral;
