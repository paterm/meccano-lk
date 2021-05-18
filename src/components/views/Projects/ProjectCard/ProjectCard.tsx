import React, { useState } from 'react';
import { classes } from '@utils';
import { IProject as IProjectCardData } from '@interfaces';
import { ReactComponent as MoreIcon } from '@assets/icons/button/more.svg';
import { ReactComponent as StopIcon } from '@assets/icons/button/stop.svg';
import { ReactComponent as PlayIcon } from '@assets/icons/button/play.svg';
import { ReactComponent as GrowthIcon } from '@assets/icons/message/growth.svg';
import { ReactComponent as DropIcon } from '@assets/icons/message/drop.svg';
import './ProjectCard.css';
import Button from '@components/ui/Button/Button';
import DropDown from '@components/ui/DropDown/DropDown';

const cls = classes('project-card');

interface IProjectCard {
  className?: string
  data: IProjectCardData
  // Колбек при открытии проекта, возвращается id проекта
  onProjectOpen: (id: string) => void
  // Колбек при редактировании проекта, возвращается id проекта
  onProjectEdit: (id: string) => void
  // Колбек при остановке проекта, возвращается id проекта
  onProjectStop: (id: string) => void
  // Колбек при возобновлении проекта, возвращается id проекта
  onProjectResume: (id: string) => void
}

const ProjectCard: React.FC<IProjectCard> = ({
  className: mix,
  data,
  onProjectOpen,
  onProjectEdit,
  onProjectStop,
  onProjectResume
}) => {
  const [isOpenSoftMenu, setIsOpenSoftMenu] = useState(false)

  const statusButtonStopElement = (
    <Button
      { ...cls('button-stop') }
      size={ 48 }
      color="coral"
      rounded
      leftIcon={ StopIcon }
      onClick={ () => onProjectStop(data.id) }
    >
      Остановить
    </Button>
  )

  const statusButtonResumeElement = (
    <Button
      { ...cls('button-resume') }
      size={ 48 }
      color="coral"
      rounded
      leftIcon={ PlayIcon }
      onClick={ () => onProjectResume(data.id) }
    >
      Остановить
    </Button>
  )

  const statusButtonElement = data.isActive
    ? statusButtonStopElement
    : statusButtonResumeElement

  const lastMessageStatValue = data.messageStat[data.messageStat.length - 1].value
  const addedMessageStatValue = data.messageStat[data.messageStat.length - 1].value
    - data.messageStat[data.messageStat.length - 2].value
  const addedMessageStatDirection = addedMessageStatValue > 0
    ? 1
    : -1

  const messageStat = (
    <div { ...cls('stat') }>
      <span { ...cls('stat-label') }>Всего сообщений</span>
      <span { ...cls('stat-value') }>{ lastMessageStatValue }</span>
      <div { ...cls('stat-value-add') }>
        { addedMessageStatDirection === 1 && (
          <GrowthIcon { ...cls('stat-direction') } />
        ) }
        { addedMessageStatDirection === -1 && (
          <DropIcon { ...cls('stat-direction') } />
        ) }
        { addedMessageStatDirection === 1 && '+' }
        { addedMessageStatValue }
      </div>
    </div>
  )

  const projectActiveMenu = [
    { label: 'Создать новый проект на основе этого', onClick: () => {} },
    { label: 'В архив', onClick: () => {} },
  ];

  const projectAchiverMenu = [
    { label: 'Возобновить', onClick: () => {} },
    { label: 'Удалить на всегда', onClick: () => {} },
  ];

  let projectMenu = []

  switch (data.type) {
    default:
      projectMenu = projectActiveMenu;
      break;
    case 'archived':
      projectMenu = projectAchiverMenu;
      break;
  }

  const getMenuElement = (menu: {
    label: string | React.ComponentType
    onClick: () => void
  }[]) => (
    <ul { ...cls('menu-list') }>
      {menu?.map(({ label, onClick }, index) => (
        <li key={ index } { ...cls('menu-item') }>
          <Button
            { ...cls('menu-button') }
            onClick={ onClick }
            color="gray"
            transparent
          >
            {label}
          </Button>
        </li>
      ))}
    </ul>
  );

  return (
    <div { ...cls('', '', mix) }>
      <div { ...cls('wrapper') }>
        <div { ...cls('header') }>
          <h2 { ...cls('name') }>{ data.name }</h2>
          <Button
            size={ 24 }
            icon={ MoreIcon }
            color="gray"
            transparent
            title="Дополнительные действия"
            onClick={ () => setIsOpenSoftMenu(!isOpenSoftMenu) }
          />
          <DropDown
            { ...cls('drop-down') }
            isOpen={ isOpenSoftMenu }
            onClose={ () => setIsOpenSoftMenu(false) }
            canCloseByClick
          >
            { getMenuElement(projectMenu) }
          </DropDown>
        </div>
        <div { ...cls('body') }>
          <ul { ...cls('info-list') }>
            <li { ...cls('info-item') }>Сбор данных начат: <span { ...cls('info-value') }>15.06.2020</span></li>
            <li { ...cls('info-item') }>Создал: <span { ...cls('info-value') }>Михаил Ершов</span></li>
            <li { ...cls('info-item') }>Последнее обновление: <span { ...cls('info-value') }>Анна Климова, 23 дня назад</span></li>
          </ul>
          <div { ...cls('buttons') }>
            <Button
              { ...cls('button-open') }
              size={ 48 }
              color="coral"
              rounded
              onClick={ () => onProjectOpen(data.id) }
            >
              Открыть
            </Button>
            <Button
              { ...cls('button-edit') }
              size={ 48 }
              color="coral"
              rounded
              onClick={ () => onProjectEdit(data.id) }
            >
              Редактировать
            </Button>
            { data.type === 'active' && statusButtonElement }
          </div>
          { messageStat }
          <div { ...cls('chart') }>График</div>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard;
