import React, { useEffect, useState } from 'react';
import { classes, useQueryParams } from '@utils';
import { ReactComponent as AddIcon } from '@assets/icons/button/add.svg';
import { ReactComponent as StackIcon } from '@assets/icons/button/stack.svg';
import { ReactComponent as ArrowLeftIcon } from '@assets/icons/button/arrow-left.svg';
import { IProject } from '@interfaces';
import Button from '../../ui/Button/Button';
import ProjectList from './ProjectList/ProjectList';
import './Projects.css';

const cls = classes('projects');

enum EProjectTypes {
  ACTIVE = 'active',
  ARCHIVED = 'archived',
}

const projectTypes = Object.values(EProjectTypes)

const testProjects: IProject[] = [
  { id: '1', typeSlug: 'archived' },
  { id: '2', typeSlug: 'archived' },
  { id: '3', typeSlug: 'active' },
  { id: '4', typeSlug: 'active' },
  { id: '5', typeSlug: 'active' },
];

const getTestProjects = (type: string) => (
  testProjects.filter((el: IProject) => el.typeSlug === type)
);

const Projects: React.FC = () => {
  const [activeType, setActiveType] = useState<string>(EProjectTypes.ACTIVE);
  const [projects, setProjects] = useState(getTestProjects(activeType));
  const queryParams = useQueryParams();

  useEffect(() => {
    setProjects(getTestProjects(activeType));
  }, [activeType]);

  useEffect(() => {
    const type = queryParams.get('type');
    if (type && projectTypes.find((t) => t === type)) {
      setActiveType(type);
    } else {
      queryParams.set({ type: EProjectTypes.ACTIVE })
    }
  }, [queryParams]);

  const activeProjectsHeaderElement = (
    <>
      <h1 { ...cls('title') }>Управление проектами</h1>
      <Button
        { ...cls('button-create') }
        size={ 48 }
        color="coral"
        filled
        rounded
        leftIcon={ AddIcon }
      >
        Создать проект
      </Button>
      <Button
        { ...cls('button-to-archived') }
        size={ 48 }
        color="coral"
        rounded
        leftIcon={ StackIcon }
        onClick={ () => { queryParams.set({ type: EProjectTypes.ARCHIVED }) } }
      >
        Архив
      </Button>
    </>
  )

  const arhivedProjectsHeaderElement = (
    <>
      <h1 { ...cls('title') }>Архив проектов</h1>
      <Button
        { ...cls('button-to-active') }
        size={ 48 }
        color="coral"
        rounded
        leftIcon={ ArrowLeftIcon }
        onClick={ () => { queryParams.set({ type: EProjectTypes.ACTIVE }) } }
      >
        Вернуться к списку проектов
      </Button>
    </>
  )

  let getHeaderElement = null

  switch (activeType) {
    default:
      getHeaderElement = activeProjectsHeaderElement
      break;
    case EProjectTypes.ARCHIVED:
      getHeaderElement = arhivedProjectsHeaderElement;
      break;
  }

  return (
    <section { ...cls() }>
      <div { ...cls('head', '', 'container') }>
        { getHeaderElement }
      </div>
      <div { ...cls('body', '', 'container') }>
        <ProjectList
          projects={ projects }
          totalProjects={ projects.length }
        />
      </div>
    </section>
  );
};

export default Projects;
