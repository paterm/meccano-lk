import React, { useRef, useEffect, useState } from 'react';
import { classes } from '@utils';
import { Virtuoso } from 'react-virtuoso';
import Button from 'src/components/ui/Button/Button';
import Project from '../ProjectCard/ProjectCard';
import './ProjectList.css';

const cls = classes('project-list');

type TRangeChanged = {
  startIndex: number,
  endIndex: number
};

interface IProjectList {
  className?: string
  projects: any[]
  totalProjects: number
  scrollIndex?: number
  onChangeRange?: ({ startIndex, endIndex }: TRangeChanged) => void
  onEndReached?: (lastProjectIndex: number) => void
  onShowMore?: (lastProjectIndex: number) => void
  // Колбек при открытии проекта, возвращается id проекта
  onProjectOpen: (id: string) => void
  // Колбек при редактировании проекта, возвращается id проекта
  onProjectEdit: (id: string) => void
  // Колбек при остановке проекта, возвращается id проекта
  onProjectStop: (id: string) => void
  // Колбек при возобновлении проекта, возвращается id проекта
  onProjectResume: (id: string) => void
  // Колбек при согдании копии проекта, возвращается id проекта
  onProjectCopy: (id: string) => void
  // Колбек при архивировании проекта, возвращается id проекта
  onProjectArchive: (id: string) => void
  // Колбек при восстановлении проекта из архива, возвращается id проекта
  onProjectRestore: (id: string) => void
  // Колбек при удалении проекта на всегда, возвращается id проекта
  onProjectDelete: (id: string) => void
}

const ProjectList: React.FC<IProjectList> = ({
  className: mix,
  projects = [],
  totalProjects = 0,
  scrollIndex = 0,
  onChangeRange,
  onEndReached,
  onShowMore,
  onProjectOpen,
  onProjectEdit,
  onProjectStop,
  onProjectResume,
  onProjectCopy,
  onProjectArchive,
  onProjectRestore,
  onProjectDelete
}) => {
  const projectListRef = useRef(null as any);
  const [endIndex, setEndIndex] = useState(0);

  useEffect(() => {
    projectListRef.current.scrollToIndex({
      index: scrollIndex,
      align: 'start',
      behavior: 'auto'
    });
  }, [scrollIndex]);

  const handleChangeRange = (range: TRangeChanged) => {
    setEndIndex(range.endIndex);
    if (onChangeRange) onChangeRange(range);
  };

  const handleShowMore = (index: number) => {
    if (onShowMore) onShowMore(index);
  };

  return (
    <div { ...cls('', '', mix) }>
      <Virtuoso
        data={ projects }
        ref={ projectListRef }
        endReached={ onEndReached }
        rangeChanged={ handleChangeRange }
        components={ {
          Header: () => (
            <div { ...cls('header') } />
          ),
          Footer: () => (
            <span { ...cls('footer') }>
              {totalProjects > projects.length
                ? (
                  <Button
                    { ...cls('button-more') }
                    color="coral"
                    transparent
                    square
                    onClick={ () => handleShowMore(endIndex) }
                  >
                    Следующие проекты
                  </Button>
                )
                : 'Больше проектов нет'}
            </span>
          )
        } }
        itemContent={ (index, project) => (
          <div { ...cls('project') }>
            <Project
              data={ project }
              onProjectOpen={ onProjectOpen }
              onProjectEdit={ onProjectEdit }
              onProjectStop={ onProjectStop }
              onProjectResume={ onProjectResume }
              onProjectCopy={ onProjectCopy }
              onProjectArchive={ onProjectArchive }
              onProjectRestore={ onProjectRestore }
              onProjectDelete={ onProjectDelete }
            />
          </div>
        ) }
      />
    </div>
  );
};

export default ProjectList;
