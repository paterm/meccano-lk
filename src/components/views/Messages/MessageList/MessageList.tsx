import React, { useRef, useEffect } from 'react';
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
  scrollIndex?: number
  onChangeRange?: ({ startIndex, endIndex }: TRangeChanged) => void
  onEndReached?: (lastMessageIndex: number) => void
}

const MessageList: React.FC<IMessageList> = ({
  className: mix,
  messages = [],
  totalMessages = 0,
  selected = [],
  scrollIndex = 0,
  onChangeRange,
  onEndReached,
  onSelect
}) => {
  const messageListRef = useRef(null as any);

  useEffect(() => {
    messageListRef.current.scrollToIndex({
      index: scrollIndex,
      align: 'start',
      behavior: 'auto'
    });
  }, [scrollIndex]);

  const checkSelected = (id: string) => selected.includes(id);

  const newMessagesButtonElement = (
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

  return (
    <div { ...cls('', '', mix) }>
      <Virtuoso
        data={ messages }
        ref={ messageListRef }
        endReached={ onEndReached }
        rangeChanged={ onChangeRange }
        components={ {
          Header: () => newMessagesButtonElement,
          Footer: () => (
            <span { ...cls('footer-list') }>
              {totalMessages > messages.length ? 'Загрузка ...' : 'Больше сообщений нет'}
            </span>
          )
        } }
        itemContent={ (index, message) => (
          <div { ...cls('message') }>
            <Message
              id={ message.id }
              data={ message }
              selectable
              isSelect={ checkSelected(message.id) }
              onSelect={ onSelect }
            />
          </div>
        ) }
      />
    </div>
  );
};

export default MessageList;
