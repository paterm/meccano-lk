import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as FAQIcon } from '@assets/icons/header/faq-icon.svg';
import { classes } from '@utils';
import IconButton from '../../../../ui/IconButton/IconButton';
import DropDown from '../../../../ui/DropDown/DropDown';
import './FAQButton.css';

type TLink = {
  label: string
  link: string
};

const cls = classes('faq-button');
const links = [{
  label: 'FAQ',
  link: '/'
}, {
  label: 'База знаний',
  link: '/'
}, {
  label: 'Туториал по Meccano',
  link: '/'
}];

const FAQButton: React.FC = () => {
  const [ isOpen, setIsOpen ] = useState(false);

  return (
    <div { ...cls('wrapper') }>
      <IconButton icon={ FAQIcon } onClick={ () => setIsOpen(!isOpen) } />
      <DropDown
        { ...cls('drop-down') }
        isOpen={ isOpen }
        onClose={ () => setIsOpen(false) }
      >
        <div { ...cls('content') }>
          <ul { ...cls('list') }>
            { links.map((item: TLink, itemIndex) => (
              <li { ...cls('item') } key={ itemIndex }>
                <Link { ...cls('item-link') } to={ item.link }>{ item.label }</Link>
              </li>
            )) }
          </ul>
        </div>
      </DropDown>
    </div>
  );
};

export default FAQButton;
