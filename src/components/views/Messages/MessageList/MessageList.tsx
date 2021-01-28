import React, { useRef, useEffect, useState } from 'react';
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
  onShowMore?: (lastMessageIndex: number) => void
}

const MessageList: React.FC<IMessageList> = ({
  className: mix,
  messages = [],
  totalMessages = 0,
  selected = [],
  scrollIndex = 0,
  onChangeRange,
  onEndReached,
  onShowMore,
  onSelect
}) => {
  const messageListRef = useRef(null as any);
  const [endIndex, setEndIndex] = useState(0);

  useEffect(() => {
    messageListRef.current.scrollToIndex({
      index: scrollIndex,
      align: 'start',
      behavior: 'auto'
    });
  }, [scrollIndex]);

  const checkSelected = (id: string) => selected.includes(id);

  const handleChangeRange = (range: TRangeChanged) => {
    setEndIndex(range.endIndex);
    if (onChangeRange) onChangeRange(range);
  };

  const handleShowMore = (index: number) => {
    if (onShowMore) onShowMore(index);
  };

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
        rangeChanged={ handleChangeRange }
        components={ {
          Header: () => newMessagesButtonElement,
          Footer: () => (
            <span { ...cls('footer-list') }>
              {totalMessages > messages.length
                ? (
                  <Button
                    { ...cls('more-button') }
                    color="coral"
                    transparent
                    square
                    onClick={ () => handleShowMore(endIndex) }
                  >
                    Следующие сообщения
                  </Button>
                )
                : 'Больше сообщений нет'}
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
