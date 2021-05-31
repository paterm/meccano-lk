import React, { useState } from 'react';
import { classes } from '@utils';
import { IMessage } from '@interfaces';
import { ReactComponent as LikeIcon } from '@assets/icons/button/like.svg';
import { ReactComponent as SendIcon } from '@assets/icons/button/send.svg';
import { ReactComponent as SendMessageIcon } from '@assets/icons/button/send-message.svg';
import { ReactComponent as CopyIcon } from '@assets/icons/button/copy.svg';
import { ReactComponent as OpenInNewIcon } from '@assets/icons/button/open-in-new.svg';

import Button from '@components/ui/Button/Button';
import './AnswerPanel.css'

const cls = classes('answer-panel');

interface IAnswerPanel {
  className?: string
  data: IMessage
}

const AnswerPanel: React.FC<IAnswerPanel> = (props) => {
  const {
    className: mix,
    data
  } = props;

  const [message, setMessage] = useState('');

  const handleInputMessage = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  };

  const phrases = [
    {
      text: 'Здравствуйте! Извините за неудобства',
      color: 'coral'
    },
    {
      text: 'Здравствуйте! Назовите номер вашего договора',
      color: 'blue'
    },
    {
      text: 'Могу вам чем то помочь?',
      color: 'purple'
    },
  ];

  const phrasesElement = (
    <ul { ...cls('phrases') }>
      {phrases.map((phrase, index) => (
        <li
          { ...cls('phrase-item') }
          key={ index }
        >
          <span
            { ...cls('phrase-text', `color-${phrase.color}`) }
          >
            { phrase.text }
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <div { ...cls('', '', mix) }>
      <div { ...cls('header') }>
        <div { ...cls('header-data') }>
          <span { ...cls('date') }>{ data.date }</span>
          <span { ...cls('name') }>{ data.sourceName }</span>
          <span { ...cls('city') }>{ data.cityName }</span>
        </div>
        <div { ...cls('header-buttons') }>
          <Button
            { ...cls('button') }
            icon={ SendIcon }
            size={ 24 }
            transparent
            color="gray"
            onClick={ () => {} }
          />
          <Button
            { ...cls('button') }
            icon={ LikeIcon }
            size={ 24 }
            transparent
            color="gray"
            onClick={ () => {} }
          />
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
      <p { ...cls('title') }>
        { data.title }
      </p>
      <p { ...cls('target-message') }>
        Спасибо за ответ! А подскажите, могу ли я оформить эту карту в личном кабинете?
      </p>
      { phrasesElement }
      <textarea
        { ...cls('input-message') }
        placeholder="Введите ваш ответ ..."
        onChange={ handleInputMessage }
        value={ message }
      />
      <div { ...cls('footer') } />
      <Button
        { ...cls('button-send') }
        icon={ SendMessageIcon }
        size={ 48 }
        color="coral"
        filled
        square
        onClick={ () => {} }
        title="Отправить"
      />
    </div>
  );
};

export default AnswerPanel;
