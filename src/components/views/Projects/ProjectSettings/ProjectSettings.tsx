import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { classes, usePopup } from '@utils';
import { ReactComponent as InfoIcon } from '@assets/icons/button/info.svg';
import PseudoPopup from '@components/ui/PseudoPopup/PseudoPopup';
import FilterGeneral from '@views/Filter/src/FilterGeneral/FilterGeneral';
import Button from '@components/ui/Button/Button';
import ProjectSettingsGeneral from './ProjectSettingsGeneral/ProjectSettingsGeneral';
import ProjectSettingsLayout from './ProjectSettingsLayout/ProjectSettingsLayout';
import './ProjectSettings.css';

const cls = classes('project-settings');

const views = [
  { view: 'project-main', name: 'Общие', component: ProjectSettingsGeneral },
  { view: 'project-filter', name: 'Фильтры, шаблоны', component: FilterGeneral },
  { view: 'project-layout', name: 'Вид', component: ProjectSettingsLayout },
];

interface IProjectSettings {
  view: string
}

const ProjectSettings:React.FC<IProjectSettings> = ({ view }) => {
  const popup = usePopup();

  const menu = views.map((el) => (
    { view: el.view, name: el.name, onClick: () => popup.open(el.view) }
  ));

  const getActiveView = (slug: string): any => views
    .find((el) => el.view === slug)?.component || null;

  const getViewName = (slug: string): any => views
    .find((el) => el.view === slug)?.name || '';

  const ActiveView = getActiveView(view);
  const activeViewName = getViewName(view);

  return (
    <PseudoPopup
      { ...cls() }
      title="Новый проект"
      childrenView={ view }
      childrenViewName={ activeViewName }
      menu={ menu }
      bar={ (
        <div { ...cls('bar') }>
          <Button
            { ...cls('template-button') }
            type="button"
          >
            Выбрать шаблон
          </Button>
          <div { ...cls('guide') }>
            <InfoIcon { ...cls('guide-icon') } />
            <Link
              { ...cls('guide-link') }
              to="/guide/filters"
            >
              Гайд по&nbsp;созданию и&nbsp;настройке проектов
            </Link>
          </div>
        </div>
      ) }
    >
      <Helmet>
        <title>{activeViewName} | Настройка проекта | Meccano</title>
      </Helmet>
      <ActiveView />
    </PseudoPopup>
  );
};

export default ProjectSettings;
