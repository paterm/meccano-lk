import React from 'react';
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
  onChangeRange,
  onEndReached
}) => (
  <div { ...cls('', '', mix) }>
    <Virtuoso
      // totalCount={ 50 }
      data={ messages }
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
      itemContent={ (index) => (
        <Message
          { ...cls('message') }
          id={ (index + 1).toString() }
          selectable
        />
      ) }
    />
  </div>
);

export default MessageList;
