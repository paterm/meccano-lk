import React, { useRef, useEffect, useState } from 'react';
import { classes } from '@utils';
import { Virtuoso } from 'react-virtuoso';
import Button from 'src/components/ui/Button/Button';
import Project from '../Project/Project';
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
  selected?: string[]
  onSelect?: any
  scrollIndex?: number
  onChangeRange?: ({ startIndex, endIndex }: TRangeChanged) => void
  onEndReached?: (lastProjectIndex: number) => void
  onShowMore?: (lastProjectIndex: number) => void
}

const ProjectList: React.FC<IProjectList> = ({
  className: mix,
  projects = [],
  totalProjects = 0,
  selected = [],
  scrollIndex = 0,
  onChangeRange,
  onEndReached,
  onShowMore,
  onSelect
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

  const checkSelected = (id: string) => selected.includes(id);

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
          Footer: () => (
            <span { ...cls('footer-list') }>
              {totalProjects > projects.length
                ? (
                  <Button
                    { ...cls('more-button') }
                    color="coral"
                    transparent
                    square
                    onClick={ () => handleShowMore(endIndex) }
                  >
                    Следующие проекты
                  </Button>
                )
                : 'Больше сообщений нет'}
            </span>
          )
        } }
        itemContent={ (index, project) => (
          <div { ...cls('project') }>
            <Project
              id={ project.id }
              data={ project }
              selectable
              isSelect={ checkSelected(project.id) }
              onSelect={ onSelect }
            />
          </div>
        ) }
      />
    </div>
  );
};

export default ProjectList;
