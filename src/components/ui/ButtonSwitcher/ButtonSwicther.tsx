import React, { useEffect, useRef } from 'react';
import { classes } from '@utils';
import './ButtonSwitcher.css';

const cls = classes('button-switcher');

interface IButtonSwitcherItem {
  id: string | number
  label: string
}

interface IButtonSwitcher {
  activeButtonId: string | number
  buttons: IButtonSwitcherItem[]
  onChange: (buttonId: string | number) => void
}

const ButtonSwitcher: React.FC<IButtonSwitcher> = ({ buttons, activeButtonId, onChange }) => {
  const backEffectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log(activeButtonId);
    if (backEffectRef && backEffectRef.current && activeButtonId) {
      const btn: HTMLButtonElement | null = document.querySelector(`.button-switcher__item[data-id=${activeButtonId}]`);

      backEffectRef.current.style.width = `${btn?.clientWidth}px`;
      backEffectRef.current.style.left = `${btn?.offsetLeft}px`;
    }
  }, [ activeButtonId, backEffectRef ]);

  console.log(buttons);

  return (
    <div { ...cls() }>
      { buttons.map((item) => {
        const isActive: boolean = activeButtonId === item.id;

        return (
          <button
            { ...cls('item', { active: isActive }) }
            key={ item.id }
            data-id={ item.id }
            onClick={ () => !isActive && onChange(item.id) }
          >
            { item.label }
          </button>
        );
      }) }

      <div ref={ backEffectRef } { ...cls('back-effect') } />
    </div>
  );
};

export default ButtonSwitcher;
