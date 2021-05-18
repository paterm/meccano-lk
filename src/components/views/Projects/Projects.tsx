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

export enum EProjectTypes {
  ACTIVE = 'active',
  ARCHIVED = 'archived',
}

const projectTypes = Object.values(EProjectTypes)

const testProjects: IProject[] = [
  {
    id: '3',
    name: 'Проект #3',
    type: 'active',
    isActive: true,
    startDate: '2020-06-06T00:00:00',
    cteator: 'Михаил Ершов',
    lastUpdateUser: 'Анна Климова',
    lastUpdateDate: '2021-10-03T00:00:00',
    messageStat: [
      {
        value: 8000,
        date: '2020-06-03T00:00:00'
      },
      {
        value: 0,
        date: '2020-06-04T00:00:00'
      },
      {
        value: 1500,
        date: '2020-06-05T00:00:00'
      },
      {
        value: 2680,
        date: '2020-06-06T00:00:00'
      },
      {
        value: 7600,
        date: '2020-06-07T00:00:00'
      },
      {
        value: 7600,
        date: '2020-06-08T00:00:00'
      },
      {
        value: 5600,
        date: '2020-06-09T00:00:00'
      },
      {
        value: 6200,
        date: '2020-08-10T00:00:00'
      }
    ]
  },
  {
    id: '2',
    name: 'Проект #2',
    type: 'active',
    isActive: false,
    startDate: '2020-06-06T00:00:00',
    cteator: 'Михаил Ершов',
    lastUpdateUser: 'Анна Климова',
    lastUpdateDate: '2021-10-03T00:00:00',
    messageStat: [
      {
        value: 8000,
        date: '2020-06-03T00:00:00'
      },
      {
        value: 0,
        date: '2020-06-04T00:00:00'
      },
      {
        value: 1500,
        date: '2020-06-05T00:00:00'
      },
      {
        value: 2680,
        date: '2020-06-06T00:00:00'
      },
      {
        value: 7600,
        date: '2020-06-07T00:00:00'
      },
      {
        value: 7600,
        date: '2020-06-08T00:00:00'
      },
      {
        value: 5600,
        date: '2020-06-09T00:00:00'
      },
      {
        value: 4700,
        date: '2020-08-10T00:00:00'
      }
    ]
  },
  {
    id: '1',
    name: 'Проект #1',
    type: 'archived',
    isActive: false,
    startDate: '2020-06-06T00:00:00',
    cteator: 'Михаил Ершов',
    lastUpdateUser: 'Анна Климова',
    lastUpdateDate: '2021-10-03T00:00:00',
    messageStat: [
      {
        value: 8000,
        date: '2020-06-03T00:00:00'
      },
      {
        value: 0,
        date: '2020-06-04T00:00:00'
      },
      {
        value: 1500,
        date: '2020-06-05T00:00:00'
      },
      {
        value: 2680,
        date: '2020-06-06T00:00:00'
      },
      {
        value: 7600,
        date: '2020-06-07T00:00:00'
      },
      {
        value: 7600,
        date: '2020-06-08T00:00:00'
      },
      {
        value: 5600,
        date: '2020-06-09T00:00:00'
      },
      {
        value: 13200,
        date: '2020-08-10T00:00:00'
      }
    ]
  },
];

const getTestProjects = (type: string) => (
  testProjects.filter((el: IProject) => el.type === type)
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

  const handleProjectOpen = () => {}
  const handleProjectEdit = () => {}
  const handleProjectStop = () => {}
  const handleProjectResume = () => {}

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

  let headerElement = null

  switch (activeType) {
    default:
      headerElement = activeProjectsHeaderElement
      break;
    case EProjectTypes.ARCHIVED:
      headerElement = arhivedProjectsHeaderElement;
      break;
  }

  return (
    <section { ...cls() }>
      <div { ...cls('head', '', 'container') }>
        { headerElement }
      </div>
      <div { ...cls('body', '', 'container') }>
        <ProjectList
          projects={ projects }
          totalProjects={ projects.length }
          onProjectOpen={ handleProjectOpen }
          onProjectEdit={ handleProjectEdit }
          onProjectStop={ handleProjectStop }
          onProjectResume={ handleProjectResume }
        />
      </div>
    </section>
  );
};

export default Projects;
