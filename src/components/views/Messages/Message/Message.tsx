import React from 'react';
import { classes } from '@utils';
import Checkbox from 'src/components/ui/Checkbox/Checkbox';
import './Message.css';

const cls = classes('message');

interface IMessageList {
  className?: string
  id: string,
  selectable?: boolean
  isSelect?: boolean
  onSelect?: (id: string, value: boolean) => void
}

const Message: React.FC<IMessageList> = ({
  className: mix,
  id,
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
          label={ `Сообщение ${id}` }
        />
      )}
    </div>
  );
};

export default Message;
