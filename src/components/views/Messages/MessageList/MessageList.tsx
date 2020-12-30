import React, { useRef } from 'react';
import { classes } from '@utils';
import { Virtuoso } from 'react-virtuoso';
import Button from 'src/components/ui/Button/Button';
import { ReactComponent as UpdateIcon } from '@assets/icons/button/update.svg';
import Message from '../Message/Message';
import './MessageList.css';

const cls = classes('message-list');

type TRangeChanged = {
  startIndex: number,
  endIndex: number
};

interface IMessageList {
  className?: string
  messages: any[]
  totalMessages: number
  selected?: string[]
  onSelect?: any
  onChangeRange?: ({ startIndex, endIndex }: TRangeChanged) => void
  onEndReached?: (lastMessageIndex: number) => void
}

const newMessagesButton = (
  <Button
    { ...cls('update-button') }
    rightIcon={ UpdateIcon }
    square
    filled
    size={ 36 }
  >
    234 новых сообщений
  </Button>
);

const MessageList: React.FC<IMessageList> = ({
  className: mix,
  messages = [],
  totalMessages = 0,
  selected = [],
  onChangeRange,
  onEndReached,
  onSelect
}) => {
  const messageListRef = useRef(null);

  const checkSelected = (id: string) => selected.includes(id);

  return (
    <div { ...cls('', '', mix) }>
      <Virtuoso
        data={ messages }
        ref={ messageListRef }
        endReached={ onEndReached }
        rangeChanged={ onChangeRange }
        components={ {
          Header: () => newMessagesButton,
          Footer: () => (
            <span { ...cls('footer-list') }>
              {totalMessages > messages.length ? 'Загрузка ...' : 'Больше сообщений нет'}
            </span>
          )
        } }
        itemContent={ (index, message) => (
          <Message
            { ...cls('message') }
            id={ message.id }
            data={ message }
            selectable
            isSelect={ checkSelected(message.id) }
            onSelect={ onSelect }
          />
        ) }
      />
    </div>
  );
};

export default MessageList;
