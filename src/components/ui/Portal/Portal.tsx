import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { classes } from '@utils';
import './Portal.css'

const cls = classes('portal');

interface IPortal {
  className?: string
  children?: React.ReactNode
  // Перекрывать весь экран
  overlay?: boolean
  // Элементы внутри портала выравниваются по центру
  center?: boolean
}

const Portal: React.FC<IPortal> = (props) => {
  const {
    className: mix,
    children,
    overlay = true,
    center = true
  } = props;
  const [container] = useState(document.createElement('div'))
  container.className = cls('', { overlay, center }, mix).className

  useEffect(() => {
    document.body.appendChild(container)
    return () => {
      document.body.removeChild(container)
    }
  }, [container])

  return ReactDOM.createPortal(children, container)
}

export default Portal;
