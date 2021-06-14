import React, { useEffect, useState } from 'react';
import { classes } from '@utils';
import Checkbox from '@ui/Checkbox/Checkbox';
import './Radio.css';

const cls = classes('radio');

interface IRadio {
  className?: string
  // Массив объектов с label для пунктов, например { label: "Тысяча", value: 1000 }
  data: { [key: string]: any },
  // Имя ключа для значения (по-умолчанию "value")
  labelKey?: string,
  // Возвращает index активного пункта при изменении
  onChange: (index: number) => void
  // Устанавливает по index активный пункт
  active?: number
  // Кастомный компонент с пропсами checked и onChange, например Checkbox
  component?: any
}

const Radio:React.FC<IRadio> = (props) => {
  const {
    className: mix,
    active: initialActive,
    data,
    labelKey = 'label',
    onChange,
    component
  } = props

  const [active, setActive] = useState(initialActive || 0)

  useEffect(() => {
    if (initialActive !== undefined) {
      setActive(initialActive)
    }
  }, [initialActive])

  const handleChange = (index: number) => {
    onChange(index)
    setActive(index)
  }

  const Component = component || Checkbox;

  const labels = data.map((item: any) => item[labelKey])

  return (
    <ul { ...cls('', '', mix) }>
      {
        labels.map((label: string, index: number) => (
          <li { ...cls('item') } key={ index }>
            <Component
              checked={ index === active }
              label={ label }
              onChange={ () => handleChange(index) }
            />
          </li>
        ))
      }
    </ul>
  )
}

export default Radio;
