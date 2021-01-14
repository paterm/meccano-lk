import React, { useState } from 'react';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { classes } from '@utils';
import { contacts, generalData } from '../../../utils/config';
import { ReactComponent as TelegramIcon } from '../../../assets/icons/footer/footer-telegram.svg';
import { ReactComponent as FacebookIcon } from '../../../assets/icons/footer/footer-facebook.svg';
import { ReactComponent as LinkedInIcon } from '../../../assets/icons/footer/footer-linkedin.svg';
import { ReactComponent as YoutubeIcon } from '../../../assets/icons/footer/footer-youtube.svg';
import { ReactComponent as PhoneIcon } from '../../../assets/icons/footer/footer-phone.svg';
import { ReactComponent as EmailIcon } from '../../../assets/icons/footer/footer-email.svg';
import { ReactComponent as MenuIcon } from '../../../assets/icons/footer/footer-menu.svg';
import LogoLink from '../../ui/LogoLink/LogoLink';
import './Footer.css';
import { FOOTER_MENU } from './FooterMenu';

const cls = classes('footer');

const Footer: React.FC = () => {
  const [ isOpen, setIsOpen ] = useState(false);
  const socialNode = (
    <div { ...cls('column', 'social') }>
      <a { ...cls('button') } href={ contacts.social.telegram }><TelegramIcon /></a>
      <a { ...cls('button') } href={ contacts.social.facebook }><FacebookIcon /></a>
      <a { ...cls('button') } href={ contacts.social.linkedIn }><LinkedInIcon /></a>
      <a { ...cls('button') } href={ contacts.social.youtube }><YoutubeIcon /></a>
    </div>
  );
  const contactsNode = (
    <div { ...cls('column', 'contacts') }>
      <a
        { ...cls('link') }
        href={ `tel:${contacts.phone}` }
      >
        <PhoneIcon { ...cls('link-icon') } />
        { contacts.phone }
      </a>
      <a
        { ...cls('link') }
        href={ `mailto:${contacts.email}` }
      >
        <EmailIcon { ...cls('link-icon') } />
        { contacts.email }
      </a>
    </div>
  );

  return (
    <footer { ...cls('', { opened: isOpen }) }>
      <div { ...cls('container', '', 'container') }>
        <div { ...cls('row', 'first') }>
          { !isOpen && socialNode }
          { !isOpen && contactsNode }
          <div { ...cls('column', 'right') }>
            <LogoLink />
            <button
              { ...cls('button', [ 'margin-left', 'close' ]) }
              onClick={ () => setIsOpen(!isOpen) }
            >
              <MenuIcon />
            </button>
          </div>
        </div>

        <div { ...cls('row', 'collapsable') }>
          <nav { ...cls('nav') }>
            { FOOTER_MENU.map((column, columnIndex) => (
              <div { ...cls('nav-column') } key={ columnIndex }>
                <div { ...cls('nav-column-title') }>{ column.label }</div>
                <ul { ...cls('nav-column') }>
                  { column.links.map((link, linkIndex) => (
                    <li { ...cls('nav-item') } key={ linkIndex }>
                      <a { ...cls('nav-link') } href={ link.link }>{ link.label }</a>
                    </li>
                  )) }
                </ul>
              </div>
            )) }
          </nav>
        </div>

        <div { ...cls('row', [ 'collapsable', 'mobile-visible' ]) }>
          { contactsNode }
          { socialNode }
        </div>

        <div { ...cls('row', 'last') }>
          <div { ...cls('column', 'left') }>
            <p { ...cls('copyright') }>
              © { generalData.companyName }, { dayjs().format('YYYY') }
            </p>
          </div>
          <div { ...cls('column', 'center') }>
            <Link { ...cls('link') } to="/privacy">Политика конфеденциальности</Link>
          </div>
          <div { ...cls('column', 'right') }>
            <span { ...cls('grey-text') }>made by </span>
            <a
              { ...cls('link') }
              href={ generalData.madeBy.link }
              target="_blank"
              rel="noreferrer"
            >
              { generalData.madeBy.label }
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
