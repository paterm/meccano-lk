import React from 'react';
import { classes } from '@utils';
import Button from '../../../../ui/Button/Button';
import './FilterGeneral.css';

const cls = classes('filter-general');

const AccountGeneral:React.FC = () => (
  <div { ...cls() }>
    <div { ...cls('body') }>
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

export default AccountGeneral;
