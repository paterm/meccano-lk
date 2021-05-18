import React from 'react';
import { classes } from '@utils';
import { IProject as IProjectData } from '@interfaces';
import './Project.css';

const cls = classes('project');

interface IProject {
  className?: string
  id: string
  data: IProjectData
  selectable?: boolean
  isSelect?: boolean
  onSelect?: (id: string, value: boolean) => void
}

const Project: React.FC<IProject> = ({
  className: mix,
  id,
  data,
  selectable = false,
  isSelect = false,
  onSelect
}) => (
  <div { ...cls('', '', mix) }>
    { data.id }
  </div>
);

export default Project;
