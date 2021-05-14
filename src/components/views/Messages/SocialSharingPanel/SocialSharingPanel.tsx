import React from 'react';
import { classes } from '@utils';
import { IMessage } from '@interfaces';
import './SocialSharingPanel.css'
import { ReactComponent as VkontakteIcon } from '@assets/icons/social/vkontakte.svg';
import { ReactComponent as FacebookIcon } from '@assets/icons/social/facebook.svg';
import { ReactComponent as InstagramIcon } from '@assets/icons/social/instagram.svg';
import { ReactComponent as TwitterIcon } from '@assets/icons/social/twitter.svg';
import { ReactComponent as OdnoklassnikiIcon } from '@assets/icons/social/odnoklassniki.svg';
import { ReactComponent as YoutubeIcon } from '@assets/icons/social/youtube.svg';
import Button from '@components/ui/Button/Button';

const cls = classes('social-sharing-panel');

interface ISocialSharingPanel {
  className?: string
  data: IMessage
}

const SocialSharingPanel: React.FC<ISocialSharingPanel> = (props) => {
  const {
    className: mix,
    // data
  } = props;

  const networks = [
    {
      name: 'ВКонтакте',
      icon: VkontakteIcon,
      onClick: () => {}
    },
    {
      name: 'Фэйсбук',
      icon: FacebookIcon,
      onClick: () => {}
    },
    {
      name: 'Инстаграм',
      icon: InstagramIcon,
      onClick: () => {}
    },
    {
      name: 'Twitter',
      icon: TwitterIcon,
      onClick: () => {}
    },
    {
      name: 'Одноклассники',
      icon: OdnoklassnikiIcon,
      onClick: () => {}
    },
    {
      name: 'YouTube',
      icon: YoutubeIcon,
      onClick: () => {}
    },
  ]

  return (
    <div { ...cls('', '', mix) }>
      { networks.map((net, index) => (
        <Button
          { ...cls('button') }
          key={ index }
          title={ net.name }
          icon={ net.icon }
          transparent
          color="gray"
          onClick={ net.onClick }
        />
      ))}
    </div>
  );
};

export default SocialSharingPanel;
