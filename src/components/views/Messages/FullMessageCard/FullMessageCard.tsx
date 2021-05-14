import React from 'react';
import { classes } from '@utils';
import { IMessage } from '@interfaces';
import './FullMessageCard.css'
import { ReactComponent as LikeIcon } from '@assets/icons/button/like.svg';
import { ReactComponent as SendIcon } from '@assets/icons/button/send.svg';
import { ReactComponent as CopyIcon } from '@assets/icons/button/copy.svg';
import { ReactComponent as OpenInNewIcon } from '@assets/icons/button/open-in-new.svg';
import Button from '@components/ui/Button/Button';

const cls = classes('full-message-card');

interface IFullMessageCard {
  className?: string
  data: IMessage
}

const FullMessageCard: React.FC<IFullMessageCard> = (props) => {
  const {
    className: mix,
    data
  } = props;

  return (
    <div { ...cls('', '', mix) }>
      <div { ...cls('header') }>
        <span { ...cls('date') }>{ data.date }</span>
        <span { ...cls('name') }>{ data.sourceName }</span>
        <span { ...cls('city') }>{ data.cityName }</span>
      </div>
      <p { ...cls('title') }>
        { data.title }
      </p>
      <p { ...cls('full-text') }>
        { data.text }
      </p>
      <div { ...cls('footer') }>
        { data.typeSlug === 'social' && (
          <>
            <Button
              { ...cls('button') }
              icon={ LikeIcon }
              size={ 24 }
              transparent
              color="gray"
              onClick={ () => {} }
            />
            <Button
              { ...cls('button') }
              icon={ SendIcon }
              size={ 24 }
              transparent
              color="gray"
              onClick={ () => {} }
            />
          </>
        ) }
        <Button
          { ...cls('button', 'on-right') }
          icon={ CopyIcon }
          size={ 24 }
          transparent
          color="gray"
          onClick={ () => {} }
        />
        <Button
          { ...cls('button') }
          icon={ OpenInNewIcon }
          size={ 24 }
          transparent
          color="gray"
          onClick={ () => {} }
        />
      </div>
    </div>
  );
};

export default FullMessageCard;
