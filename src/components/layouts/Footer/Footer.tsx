import React from 'react';
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

const cls = classes('footer');

const Footer: React.FC = () => (
  <footer { ...cls('') }>
    <div { ...cls('container', '', 'container') }>
      <div { ...cls('row') }>
        <div { ...cls('column', 'social') }>
          <a { ...cls('button') } href={ contacts.social.telegram }><TelegramIcon /></a>
          <a { ...cls('button') } href={ contacts.social.facebook }><FacebookIcon /></a>
          <a { ...cls('button') } href={ contacts.social.linkedIn }><LinkedInIcon /></a>
          <a { ...cls('button') } href={ contacts.social.youtube }><YoutubeIcon /></a>
        </div>
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
        <div { ...cls('column', 'right') }>
          <LogoLink />
          <button { ...cls('button', 'margin-left') }><MenuIcon /></button>
        </div>
      </div>

      <div { ...cls('row') }>
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

export default Footer;
