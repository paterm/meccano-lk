import React, { useState } from 'react';
import { classes } from '@utils';
import { ReactComponent as EditIcon } from '@assets/icons/button/edit.svg';
import { ReactComponent as InfoIcon } from '@assets/icons/button/info.svg';
import Button from '@components/ui/Button/Button';
import './ProjectSettingsGeneral.css';

const cls = classes('project-settings-general');

const ProjectSettingsGeneral:React.FC = () => {
  const [keywords, setKeywords] = useState('');
  const [negativeKeywords, setNegativeKeywords] = useState('');

  const handleInputKeywords = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setKeywords(event.target.value);
  };

  const handleInputNegativeKeywords = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNegativeKeywords(event.target.value);
  };

  return (
    <div { ...cls() }>
      <div { ...cls('body') }>
        <Button
          { ...cls('name-button') }
          size={ 16 }
          color="gray"
          square
          link
          rightIcon={ EditIcon }
        >
          Лояльность сотрудников
        </Button>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label { ...cls('input') }>
          <span { ...cls('input-label') }>Ключевые слова <InfoIcon /></span>
          <textarea
            { ...cls('input-words') }
            placeholder="Введите ключевые слова ..."
            onChange={ handleInputKeywords }
            value={ keywords }
          />
        </label>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label { ...cls('input') }>
          <span { ...cls('input-label') }>Минус слова <InfoIcon /></span>
          <textarea
            { ...cls('input-words') }
            placeholder="Введите минус слова ..."
            onChange={ handleInputNegativeKeywords }
            value={ negativeKeywords }
          />
        </label>
      </div>
      <div { ...cls('footer') }>
        <Button
          { ...cls('cancel-button') }
          type="button"
          color="coral"
        >
          Отмена
        </Button>
        <Button
          { ...cls('apply-button') }
          type="button"
          filled
        >
          Применить
        </Button>
      </div>
    </div>
  );
};

export default ProjectSettingsGeneral;
