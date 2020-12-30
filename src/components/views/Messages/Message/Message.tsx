import React from 'react';
import { classes } from '@utils';
import Checkbox from 'src/components/ui/Checkbox/Checkbox';
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
  const handleSelect = (value: boolean) => {
    if (onSelect === undefined) return;
    onSelect(id, value);
  };

  return (
    <div { ...cls('', '', mix) }>
      {selectable && (
        <Checkbox
          checked={ isSelect }
          onChange={ handleSelect }
          label={ `Сообщение id: ${id}` }
        />
      )}
      { data.text }
    </div>
  );
};

export default Message;
