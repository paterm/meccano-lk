import React from 'react';
import { ReactComponent as ProjectIcon } from '@assets/icons/sidebar/project.svg';
import { ReactComponent as MsgIcon } from '@assets/icons/sidebar/message.svg';
import { ReactComponent as AnalyticIcon } from '@assets/icons/sidebar/analytic.svg';
import { ReactComponent as ReportsIcon } from '@assets/icons/sidebar/reports.svg';
import { ReactComponent as SettingsIcon } from '@assets/icons/sidebar/settings.svg';
import { ReactComponent as PencilIcon } from '@assets/icons/sidebar/pencil.svg';
import { ReactComponent as SettingsSmallIcon } from '@assets/icons/sidebar/settings--small.svg';

export interface ISidebarChildren {
  label: string
  type?: string
  link?: string
  count?: number
  new?: number
  leftIcon?: React.ReactNode
  hot?: boolean
  fixedTop?: boolean
  fixedBottom?: boolean,
  red?: boolean
}

export interface ISidebarItem {
  active?: boolean
  Icon: React.ReactNode
  label: string
  link?: string
  count?: number
  children?: ISidebarChildren[]
  rightArrow?: boolean
}

export const SIDEBAR_MENU: ISidebarItem[] = [
  {
    active: true,
    Icon: React.createElement(ProjectIcon, { className: 'sidebar__icon' }),
    label: 'Проект 2',
    rightArrow: true,
    children: [
      { label: '', type: 'search', fixedTop: true },
      { label: 'Проект #1', link: '' },
      { label: 'Проект #2', link: '' },
      { label: 'Проект #12', link: '' },
      { label: 'Репутация контрагентов', link: '' },
      { label: 'Учебный центр', link: '' },
      {
        label: 'Создать новый проект',
        link: '/',
        leftIcon: React.createElement(PencilIcon, { className: 'sidebar-submenu__icon' }),
        fixedBottom: true,
        red: true
      },
      {
        label: 'Управление проектами',
        link: '/projects',
        leftIcon: React.createElement(SettingsSmallIcon, { className: 'sidebar-submenu__icon' }),
        fixedBottom: true,
        red: true
      },
    ]
  },
  {
    Icon: React.createElement(MsgIcon, { className: 'sidebar__icon' }),
    label: 'Сообщения',
    children: [
      {
        label: 'Все',
        count: 3297,
        new: 195,
        link: '/messages'
      },
      {
        label: 'Требуют реакции',
        count: 27,
        hot: true,
        link: '/messages'
      },
      {
        label: 'Необработанные',
        count: 2502,
        link: '/messages'
      },
      {
        label: 'Обработанные',
        count: 795,
        link: '/messages'
      },
      {
        label: 'Назначенные мне',
        count: 4,
        link: '/messages'
      },
      {
        label: 'Назначил',
        count: 2,
        link: '/messages'
      },
      {
        label: 'Избранные',
        count: 34,
        link: '/messages'
      },
      {
        label: 'Удаленные',
        count: 250,
        link: '/messages'
      },
    ]
  },
  {
    Icon: React.createElement(AnalyticIcon, { className: 'sidebar__icon' }),
    label: 'Аналитика',
    children: [
      { label: 'Все', link: '/analytics' },
      { label: 'Общие показатели', link: '/analytics' },
      { label: 'Тональность', link: '/analytics/tonality' },
      { label: 'География', link: '/analytics/geography' },
      { label: 'Источники', link: '/analytics/sources' },
      { label: 'Демография', link: '/analytics/demography' },
      { label: 'Сообщения', link: '/analytics/messages' },
      { label: 'Пересечение сообщений', link: '/analytics/crossing-messages' },
      { label: 'Типы площадок', link: '/analytics/area-types' },
      { label: 'Авторы', link: '/analytics/authors' },
    ]
  },
  {
    Icon: React.createElement(ReportsIcon, { className: 'sidebar__icon' }),
    label: 'Отчеты и дайджест',
    count: 13,
    children: [
      { label: 'Все рубрики', link: '' },
      { label: 'Экспортированные', link: '' },
      { label: 'Рубрика отчет', link: '' },
      { label: 'Рубрика 2', link: '' },
      { label: 'Рубрика 3', link: '' },
      { label: 'Рубрика 4', link: '' },
      { label: 'Рубрика 5', link: '' },
      { label: 'Рубрика 7', link: '' },
      { label: 'Рубрика 8', link: '' },
      { label: 'Рубрика 9', link: '' },
      { label: 'Рубрика 10', link: '' },
      { label: 'Рубрика 11', link: '' },
    ]
  },
  {
    Icon: React.createElement(SettingsIcon, { className: 'sidebar__icon' }),
    label: 'Настройки проекта',
    link: '/settings'
  },
];
