import React, { useEffect, useState } from 'react';
import { classes } from '@utils';
import { createPopper } from '@popperjs/core';
import { ReactComponent as InfoIcon } from './assets/info-icon.svg';
import './InfoTooltip.css';

const cls = classes('info-tooltip');

type PROPS = {
  text: string
};

const InfoTooltip: React.FC<PROPS> = ({ text }) => {
  const [referenceElement, setReferenceElement] = useState<HTMLButtonElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
  const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (referenceElement && popperElement) {
      createPopper(referenceElement, popperElement, {
        modifiers: [{ name: 'arrow', options: { element: arrowElement } }]
      });
    }
  }, [ referenceElement, popperElement, arrowElement ]);

  if (!text || !text.length) {
    return null;
  }

  return (
    <>
      <button
        { ...cls('target') }
        ref={ setReferenceElement }
        type="button"
      >
        <InfoIcon { ...cls('icon') } />
      </button>

      <div
        { ...cls('tooltip') }
        ref={ setPopperElement }
      >
        { text }
        <div
          { ...cls('tooltip-arrow') }
          ref={ setArrowElement }
        />
      </div>
    </>
  );
};

export default InfoTooltip;
