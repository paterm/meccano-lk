import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { classes } from '@utils';
import { ReactComponent as FlashIcon } from '@assets/icons/button/flash.svg';
import { ReactComponent as CheckIcon } from '@assets/icons/button/check.svg';
import { ReactComponent as StarIcon } from '@assets/icons/button/star.svg';
import { ReactComponent as AddPersonIcon } from '@assets/icons/button/add-person.svg';
import { ReactComponent as TagIcon } from '@assets/icons/button/tag.svg';
import { ReactComponent as TrashIcon } from '@assets/icons/button/trash.svg';
import Checkbox from 'src/components/ui/Checkbox/Checkbox';
import Button from '../../../ui/Button/Button';
import ToneMeter from '../ToneMeter/ToneMeter';
import './Message.css';

const cls = classes('message');

interface IMessage {
  className?: string
  id: string
  data: any
  selectable?: boolean
  isSelect?: boolean
  onSelect?: (id: string, value: boolean) => void
}

const Message: React.FC<IMessage> = ({
  className: mix,
  id,
  data,
  selectable = false,
  isSelect = false,
  onSelect
}) => {
  const [ checked, setChecked ] = useState(false);
  const [ favorite, setFavorite ] = useState(false);

  const handleSelect = (value: boolean) => {
    if (onSelect === undefined) return;
    onSelect(id, value);
  };

  const messageHeaderElement = (
    <div { ...cls('header') }>
      {selectable && (
        <Checkbox
          checked={ isSelect }
          onChange={ handleSelect }
          label={ data.date }
        />
      )}
      <div { ...cls('reaction-place') }>
        { data.needReaction && (
          <Button
            { ...cls('reaction') }
            leftIcon={ FlashIcon }
            rounded
            filled
            size={ 24 }
          >
            Требует реакции
          </Button>
        ) }
      </div>
      <div { ...cls('header-buttons') }>
        <Button
          { ...cls('check-button') }
          icon={ CheckIcon }
          size={ 24 }
          transparent
          color={ checked ? 'green' : 'gray' }
          onClick={ () => setChecked(!checked) }
        />
        <Button
          { ...cls('star-button') }
          icon={ StarIcon }
          size={ 24 }
          transparent
          color={ favorite ? 'green' : 'gray' }
          onClick={ () => setFavorite(!favorite) }
        />
      </div>
    </div>
  );

  const messageSidebarElement = (
    <div { ...cls('sidebar') }>
      <div { ...cls('source') }>
        <img { ...cls('source-avatar') } src="" alt="" />
        <div { ...cls('source-title') }>
          <p { ...cls('source-name') }>{ data.sourceName }</p>
          <p { ...cls('source-city') }>{ data.sourceCity }</p>
        </div>
        <div { ...cls('source-metrics') }>Метрики</div>
        <ToneMeter
          { ...cls('tone') }
          value={ data.tone }
        />
      </div>
    </div>
  );

  const messageContentElement = (
    <div { ...cls('content') }>
      <h3 { ...cls('title') }>
        { data.title }
      </h3>
      <p { ...cls('annotation') }>
        { data.annotation }
      </p>
    </div>
  );

  const messageFooterElement = (
    <div { ...cls('footer') }>
      <div { ...cls('footer-buttons-left') }>
        <Button
          { ...cls('add-person-button') }
          icon={ AddPersonIcon }
          size={ 24 }
          color="gray"
          transparent
        />
        <Button
          { ...cls('add-person-button') }
          icon={ TagIcon }
          size={ 24 }
          color="gray"
          transparent
        />
      </div>
      <div { ...cls('more-details') }>
        <Link
          { ...cls('more-details-link') }
          to="/messages/92736505383"
        >
          Подробнее
        </Link>
      </div>
      <div { ...cls('footer-buttons-right') }>
        <Button
          { ...cls('delete-button') }
          icon={ TrashIcon }
          size={ 24 }
          color="gray"
          transparent
        />
      </div>
    </div>
  );

  return (
    <div { ...cls('', '', mix) }>
      { messageHeaderElement }
      <div { ...cls('body') }>
        { messageSidebarElement }
        { messageContentElement }
      </div>
      { messageFooterElement }
    </div>
  );
};

export default Message;
