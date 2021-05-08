import React from 'react';
import { classes } from '@utils';
import { IMessage } from '@interfaces';
import './SourceCard.css'

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

  console.log(data)

  return (
    <div { ...cls('', '', mix) }>
      { data.sourceName }
    </div>
  );
};

export default SourceCard;
