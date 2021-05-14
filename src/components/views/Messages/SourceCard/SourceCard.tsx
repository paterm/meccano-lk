import React from 'react';
import { classes } from '@utils';
import { IMessage } from '@interfaces';
import './SourceCard.css'
import { ReactComponent as PersonIcon } from '@assets/icons/profile/person.svg';
import { ReactComponent as LocationIcon } from '@assets/icons/profile/location.svg';
import { ReactComponent as BookmarkIcon } from '@assets/icons/profile/bookmark.svg';
import { ReactComponent as GenderIcon } from '@assets/icons/profile/gender.svg';
import defaultAvatar from '@assets/images/defaultAvatar.jpg';

const cls = classes('source-card');

interface ISourceCard {
  className?: string
  data: IMessage
}

const SourceCard: React.FC<ISourceCard> = (props) => {
  const {
    className: mix,
    data
  } = props;

  return (
    <div { ...cls('', '', mix) }>
      <img
        { ...cls('avatar') }
        src={ data.sourceAvatar || defaultAvatar }
        alt={ data.sourceName }
      />

      <div { ...cls('main-info') }>
        <p { ...cls('name') }>{ data.sourceName }</p>
        { !!data.sourceWebsite && (
          <a
            { ...cls('website') }
            href={ data.sourceWebsite || '#' }
            target="_blank"
            rel="noreferrer"
          >
            { data.sourceWebsite }
          </a>
        ) }
      </div>

      <ul { ...cls('add-info-list') }>
        { !!data.audienceSizeValue && (
        <li { ...cls('add-info-item') }>
          <PersonIcon { ...cls('add-info-icon') } />
          { data.audienceSizeValue }
        </li>
        ) }
        { !!data.gender && (
          <li { ...cls('add-info-item') }>
            <GenderIcon { ...cls('add-info-icon') } />
            { data.gender }
          </li>
        ) }
        { !!data.cityName && (
        <li { ...cls('add-info-item') }>
          <LocationIcon { ...cls('add-info-icon') } />
          { data.cityName }
        </li>
        ) }
        { !!data.subject && (
          <li { ...cls('add-info-item') }>
            <BookmarkIcon { ...cls('add-info-icon') } />
            { data.subject }
          </li>
        ) }
      </ul>
    </div>
  );
};

export default SourceCard;
