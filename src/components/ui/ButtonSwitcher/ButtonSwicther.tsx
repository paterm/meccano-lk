import React, { useCallback, useEffect, useRef } from 'react';
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
  onChange: (buttonId: string) => void
}

const ButtonSwitcher: React.FC<IButtonSwitcher> = ({
  buttons,
  activeButtonId,
  onChange
}) => {
  const backEffectRef = useRef<HTMLDivElement>(null);
  const calculateWidth = useCallback(() => {
    if (backEffectRef && backEffectRef.current && activeButtonId) {
      const btn: HTMLButtonElement | null = document
        .querySelector(`.button-switcher__item[data-id=${activeButtonId}]`);

      backEffectRef.current.style.width = `${btn?.clientWidth}px`;
      backEffectRef.current.style.left = `${btn?.offsetLeft}px`;
    }
  }, [ backEffectRef, activeButtonId ]);

  useEffect(() => {
    calculateWidth();
    window.addEventListener('resize', calculateWidth);

    return () => window.removeEventListener('resize', calculateWidth);
  }, [ calculateWidth ]);

  return (
    <div { ...cls() }>
      { buttons.map((item) => {
        const isActive: boolean = activeButtonId === item.id;

        return (
          <button
            { ...cls('item', { active: isActive }) }
            key={ item.id }
            data-id={ item.id }
            onClick={ () => !isActive && onChange(item.id.toString()) }
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
