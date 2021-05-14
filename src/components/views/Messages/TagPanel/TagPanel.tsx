import React, { useState } from 'react';
import { classes } from '@utils';
import { IMessage } from '@interfaces';
import { ReactComponent as EditIcon } from '@assets/icons/button/edit.svg';
import { ReactComponent as CloseIcon } from '@assets/icons/button/close.svg';
import Button from '@components/ui/Button/Button';
import Input from '@components/ui/Input/Input';
import Checkbox from '@components/ui/Checkbox/Checkbox';
import './TagPanel.css'

const cls = classes('tag-panel');

interface ITagPanel {
  className?: string
  data: IMessage
  onClose: () => void
}

const fetchTags = [
  { isChecked: false, tag: 'интересы' },
  { isChecked: false, tag: 'банкоматы' },
]

const TagPanel: React.FC<ITagPanel> = (props) => {
  const {
    className: mix,
    onClose,
    // data
  } = props;

  const [tags, setTags] = useState(fetchTags)
  const [isCreationModeActive, setIsCreationModeActive] = useState(false)
  const [newTags, setNewTags] = useState('')

  const handleSelectTag = (tag: string, status: boolean) => {
    const updatedTags = [...tags];
    const currentTag = updatedTags.find((t) => t.tag === tag);
    if (currentTag) {
      currentTag.isChecked = status
      setTags(updatedTags);
    }
  }

  const handleDeleteTag = (tag: string) => {
    const updatedTags = [...tags];
    const currentTagIndex = updatedTags.findIndex((t) => t.tag === tag);
    updatedTags.splice(currentTagIndex, 1)
    setTags(updatedTags);
  }

  const handleInputNewTag = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewTags(event.target.value)
  }

  const handleCreateTags = () => {
    const newTagsArray = newTags.split(',')
    const newTagsObjects = newTagsArray.map((tag) => (
      {
        isChecked: false,
        tag: tag.trim()
      }
    ))
    const updatedTags = [...tags];
    updatedTags.push(...newTagsObjects.filter((t) => !!t.tag.length));
    setTags(updatedTags)
    setIsCreationModeActive(false);
    setNewTags('')
  }

  const selectTagViewElement = (
    <>
      <Input
        { ...cls('input-search') }
        type="search"
        placeholder="Быстрый поиск тегов"
        size={ 32 }
      />
      <ul { ...cls('tag-list') }>
        { tags.map(({ tag, isChecked }, index) => (
          <li
            { ...cls('tag-item') }
            key={ tag + index }
          >
            <Checkbox
              { ...cls('checkbox') }
              checked={ isChecked }
              label={ `#${tag.toLocaleLowerCase()}` }
              onChange={ (status) => handleSelectTag(tag, status) }
            />
            <Button
              { ...cls('button-delete') }
              icon={ CloseIcon }
              size={ 16 }
              color="gray"
              title="Удалить тег"
              onClick={ () => handleDeleteTag(tag) }
            />
          </li>
        )) }
      </ul>
      <Button
        { ...cls('button-create') }
        size={ 36 }
        color="coral"
        square
        transparent
        leftIcon={ EditIcon }
        onClick={ () => setIsCreationModeActive(true) }
      >
        Создать новый тег
      </Button>
      <Button
        { ...cls('button-add') }
        size={ 36 }
        color="coral"
        filled
        square
      >
        Добавить
      </Button>
      <Button
        { ...cls('button-cancel') }
        size={ 36 }
        color="gray"
        square
        onClick={ onClose }
      >
        Отмена
      </Button>
    </>
  );

  const crateTagViewElement = (
    <>
      <Button
        { ...cls('button-exit-create-mode') }
        icon={ CloseIcon }
        size={ 24 }
        color="gray"
        title="Удалить тег"
        onClick={ () => setIsCreationModeActive(false) }
      />
      <textarea
        { ...cls('input-new-tags') }
        placeholder="Вы можете создавать несколько тегов через запятую"
        onChange={ handleInputNewTag }
        value={ newTags }
      />
      <Button
        { ...cls('button-add') }
        size={ 36 }
        color="coral"
        filled
        square
        onClick={ handleCreateTags }
        disabled={ !newTags.length }
      >
        Создать
      </Button>
    </>
  );

  return (
    <div { ...cls('', '', mix) }>
      { isCreationModeActive ? crateTagViewElement : selectTagViewElement }
    </div>
  );
};

export default TagPanel;
