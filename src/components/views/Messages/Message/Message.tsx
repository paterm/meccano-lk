import React, { useState } from 'react';
import { classes } from '@utils';
import { ReactComponent as FlashIcon } from '@assets/icons/button/flash.svg';
import { ReactComponent as CheckIcon } from '@assets/icons/button/check.svg';
import { ReactComponent as StarIcon } from '@assets/icons/button/star.svg';
import { ReactComponent as AddPersonIcon } from '@assets/icons/button/add-person.svg';
import { ReactComponent as TagIcon } from '@assets/icons/button/tag.svg';
import { ReactComponent as ReplyIcon } from '@assets/icons/button/reply.svg';
import { ReactComponent as OpenInNewIcon } from '@assets/icons/button/open-in-new.svg';
import { ReactComponent as TrashIcon } from '@assets/icons/button/trash.svg';
import { ReactComponent as ArrowDownIcon } from '@assets/icons/button/arrow-down.svg';
import { ReactComponent as ArrowUpIcon } from '@assets/icons/button/arrow-up.svg';
import { ReactComponent as LikeIcon } from '@assets/icons/button/like.svg';
import { ReactComponent as SendIcon } from '@assets/icons/button/send.svg';
import defaultAvatar from '@assets/images/defaultAvatar.jpg';
import Checkbox from '@components/ui/Checkbox/Checkbox';
import { ReactComponent as CloseIcon } from '@assets/icons/button/close.svg';
import DropDown from '@components/ui/DropDown/DropDown';
import Button from '../../../ui/Button/Button';
import ToneMeter from '../ToneMeter/ToneMeter';
import IndexMeter from '../IndexMeter/IndexMeter';
import './Message.css';
import SourceCard from '../SourceCard/SourceCard';
import FullMessageCard from '../FullMessageCard/FullMessageCard';
import SocialSharingPanel from '../SocialSharingPanel/SocialSharingPanel';
import TagPanel from '../TagPanel/TagPanel';
import AssignmentPanel from '../AssignmentPanel/AssignmentPanel';
import AnswerPanel from '../AnswerPanel/AnswerPanel';

const discussionExample = [
  {
    author: 'Дмитрий Волков',
    date: '14:51 15.06.2020',
    isAgent: false,
    message: 'Мне очень нравится, сам пользую, хочу родителям тоже взять.'
  },
  {
    author: 'Дмитрий Волков',
    date: '14:52 15.06.2020',
    isAgent: false,
    message: 'Единственное, непонятно, какая сумма обслуживания за год использования? Кто знает подскажите плиз'
  },
  {
    author: 'Сбербанк Россия',
    date: '14:55 15.06.2020',
    isAgent: true,
    message: 'Здравствуйте, Дмитрий! Сумма обслуживания карты Сбербанк Суперкэшбэк 600 рублей в год'
  },
];

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
  const [ isDiscussionOpen, setIsDiscussionOpen ] = useState(false);
  const [ isSourceCardOpen, setIsSourceCardOpen ] = useState(false);
  const [ isFullMessageCardOpen, setIsFullMessageCardOpen ] = useState(false);
  const [ isSocialSharingPanelOpen, setIsSocialSharingPanelOpen ] = useState(false);
  const [ isAccountSelectionPanelOpen, setIsAccountSelectionPanelOpen ] = useState(false);
  const [ isTagPanelOpen, setIsTagPanelOpen ] = useState(false);
  const [ isAssignmentPanelOpen, setIsAssignmentPanelOpen ] = useState(false);
  const [ isAnswerPanelOpen, setIsAnswerPanelOpen ] = useState(false);

  const handleSelect = (value: boolean) => {
    if (onSelect === undefined) return;
    onSelect(id, value);
  };

  const closeAllPopups = () => {
    setIsSourceCardOpen(false)
    setIsFullMessageCardOpen(false)
    setIsSocialSharingPanelOpen(false)
    setIsAccountSelectionPanelOpen(false)
    setIsTagPanelOpen(false)
    setIsAssignmentPanelOpen(false)
    setIsAnswerPanelOpen(false)
  }

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
        <Button
          { ...cls('button-avatar') }
          inline
          link
          onClick={ () => setIsSourceCardOpen(true) }
        >
          <img
            { ...cls('source-avatar') }
            src={ data.sourceAvatar || defaultAvatar }
            alt={ data.sourceName }
          />
        </Button>
        <div { ...cls('source-title') }>
          <p { ...cls('source-name') }>{ data.sourceName }</p>
          <p { ...cls('source-city') }>{ data.cityName }</p>
        </div>
        <div { ...cls('source-metrics') }>
          <IndexMeter
            { ...cls('meter-mfi') }
            label="MFI"
            prevValue={ data.mfiPrevValue }
            value={ data.mfiValue }
          />
          <IndexMeter
            { ...cls('meter-er') }
            label="ER"
            postfix="%"
            prevValue={ data.erPrevValue }
            value={ data.erValue }
          />
        </div>
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
          onClick={ () => setIsAssignmentPanelOpen(true) }
        />
        <Button
          { ...cls('tag-button') }
          icon={ TagIcon }
          size={ 24 }
          color="gray"
          transparent
          onClick={ () => setIsTagPanelOpen(true) }
        />
      </div>
      <div { ...cls('more-details') }>
        <Button
          { ...cls('more-details-link') }
          onClick={ () => setIsFullMessageCardOpen(true) }
          link
          inline
        >
          Подробнее
        </Button>
      </div>
      <div { ...cls('footer-buttons-right') }>
        <Button
          { ...cls('replay-button') }
          icon={ ReplyIcon }
          size={ 24 }
          color="gray"
          transparent
          onClick={ () => setIsSocialSharingPanelOpen(true) }
        />
        <Button
          { ...cls('open-in-new-button') }
          icon={ OpenInNewIcon }
          size={ 24 }
          color="gray"
          transparent
        />
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

  const discussionPanelElement = (
    <div { ...cls('discussion-panel') }>
      <div { ...cls('discussion-toolbar') }>
        <Button
          { ...cls('discussion-toggle') }
          leftIcon={ isAccountSelectionPanelOpen ? ArrowUpIcon : ArrowDownIcon }
          size={ 24 }
          transparent
          color="gray"
          onClick={ () => setIsAccountSelectionPanelOpen(!isAccountSelectionPanelOpen) }
        >
          Сбербанк Россия
        </Button>
        <DropDown
          { ...cls('account-selection-panel') }
          isOpen={ isAccountSelectionPanelOpen }
          onClose={ closeAllPopups }
        >
          <Button
            { ...cls('account-selection-button') }
            transparent
            color="gray"
            onClick={ () => {} }
          >
            <img
              { ...cls('account-selection-avatar') }
              src={ defaultAvatar }
              alt=""
            />
            Подслушано Сбербанк
          </Button>
          <Button
            { ...cls('account-selection-button') }
            transparent
            color="gray"
            onClick={ () => {} }
          >
            <img
              { ...cls('account-selection-avatar') }
              src={ defaultAvatar }
              alt=""
            />
            Сбербанк Россия
          </Button>
        </DropDown>
        <div { ...cls('discussion-actions') }>
          <Button
            { ...cls('discussion-like') }
            icon={ LikeIcon }
            size={ 24 }
            transparent
            color="gray"
            onClick={ () => {} }
          />
          <Button
            { ...cls('discussion-answer') }
            icon={ SendIcon }
            size={ 24 }
            transparent
            color="gray"
            onClick={ () => { setIsAnswerPanelOpen(true) } }
          />
        </div>
        <Button
          { ...cls('discussion-reply') }
          leftIcon={ isDiscussionOpen ? ArrowUpIcon : ArrowDownIcon }
          size={ 24 }
          transparent
          color="gray"
          onClick={ () => setIsDiscussionOpen(!isDiscussionOpen) }
        >
          { isDiscussionOpen ? 'Скрыть' : 'Переписка' }
        </Button>
      </div>
      { isDiscussionOpen && (
        <div { ...cls('discussion-drawer') }>
          {
            discussionExample.map((message, index) => (
              <div
                { ...cls('discussion-message', { 'is-agent': message.isAgent }) }
                key={ index }
              >
                <div { ...cls('discussion-header') }>
                  <div { ...cls('discussion-message-author') }>{ message.author }</div>
                  <div { ...cls('discussion-message-date') }>{ message.date }</div>
                </div>
                <div { ...cls('discussion-message-body') }>{ message.message }</div>
              </div>
            ))
          }
        </div>
      ) }
    </div>
  );

  return (
    <div { ...cls('', '', mix) }>
      <div { ...cls('wrapper', { social: data.typeSlug === 'social' }, mix) }>
        { messageHeaderElement }
        <div { ...cls('body') }>
          { messageSidebarElement }
          { messageContentElement }
        </div>
        { messageFooterElement }
      </div>
      { data?.typeSlug === 'social' && discussionPanelElement }

      <DropDown
        { ...cls('popup') }
        isOpen={ isSourceCardOpen }
        onClose={ closeAllPopups }
        usePortal
      >
        <Button
          { ...cls('popup-close-button') }
          icon={ CloseIcon }
          size={ 24 }
          color="gray"
          transparent
          onClick={ closeAllPopups }
        />
        <SourceCard data={ data } />
      </DropDown>

      <DropDown
        { ...cls('popup') }
        isOpen={ isFullMessageCardOpen }
        onClose={ closeAllPopups }
        usePortal
      >
        <Button
          { ...cls('popup-close-button') }
          icon={ CloseIcon }
          size={ 24 }
          color="gray"
          transparent
          onClick={ closeAllPopups }
        />
        <FullMessageCard data={ data } />
      </DropDown>

      <DropDown
        { ...cls('popup') }
        isOpen={ isSocialSharingPanelOpen }
        onClose={ closeAllPopups }
        usePortal
      >
        <SocialSharingPanel data={ data } />
      </DropDown>

      <DropDown
        { ...cls('tag-panel') }
        isOpen={ isTagPanelOpen }
        onClose={ closeAllPopups }
        usePortal
      >
        <TagPanel data={ data } onClose={ () => setIsTagPanelOpen(false) } />
      </DropDown>

      <DropDown
        { ...cls('tag-panel') }
        isOpen={ isAssignmentPanelOpen }
        onClose={ closeAllPopups }
        usePortal
      >
        <AssignmentPanel data={ data } onClose={ () => setIsAssignmentPanelOpen(false) } />
      </DropDown>

      <DropDown
        { ...cls('popup') }
        isOpen={ isAnswerPanelOpen }
        onClose={ closeAllPopups }
        usePortal
      >
        <Button
          { ...cls('popup-close-button') }
          icon={ CloseIcon }
          size={ 24 }
          color="gray"
          transparent
          onClick={ closeAllPopups }
        />
        <AnswerPanel data={ data } />
      </DropDown>
    </div>
  );
};

export default Message;
