import React from 'react';
import defaultAvatar from '@assets/images/defaultAvatar.jpg';
import { TProfile } from '@types';
import { IMobileMenuItem } from './src/MobileMenuItem/MobileMenuItem';

export interface IMobileStructure extends IMobileMenuItem{
  children?: IMobileMenuItem[]
  content?: React.ReactNode | null
}

export const getMenuStructure = (profile: TProfile): IMobileStructure[] => ([
  {
    leftIcon: profile.avatar || defaultAvatar,
    leftIconAltText: 'Аватар',
    text: `${profile.firstName} ${profile.lastName}`,
    useRightIcon: true,
    content: null
  },
  {
    text: 'Сбербанк',
    useRightIcon: true,
    children: [
      {
        text: 'Главная',
        href: '',
      },
      {
        text: 'Обзор',
        href: ''
      },
      {
        text: 'Шаблоны',
        href: ''
      },
      {
        text: 'Сотрудники',
        href: ''
      },
      {
        text: 'Профиль',
        href: ''
      }
    ]
  },
  {
    text: 'Уведомления',
    count: 12,
    useRightIcon: true,
    children: [
      {
        text: 'Вам назначены новые сообщения от Марина Елистратова',
        subText: 'Проект #1',
        rightContent: <span>14:44</span>
      },
      {
        text: 'Ваш файл Сообщения за июль СМИ экпортирован',
        subText: 'Проект #2',
        rightContent: <span>14:44</span>
      },
      {
        text: 'Вам назначены новые сообщения от Марина Елистратова',
        subText: 'Проект #1',
        rightContent: <span>14:44</span>
      },
      {
        text: 'Ваш файл Сообщения за июль СМИ экпортирован',
        subText: 'Проект #2',
        rightContent: <span>14:44</span>
      },
      {
        text: 'Вам назначены новые сообщения от Марина Елистратова',
        subText: 'Проект #1',
        rightContent: <span>14:44</span>
      },
      {
        text: 'Ваш файл Сообщения за июль СМИ экпортирован',
        subText: 'Проект #2',
        rightContent: <span>14:44</span>
      }
    ]
  },
  {
    text: 'Справка',
    useRightIcon: true,
    children: [
      {
        text: 'FAQ',
        href: '/faq'
      },
      {
        text: 'База знаний',
        href: '/'
      },
      {
        text: 'Туториал по Meccano',
        href: '/'
      }
    ]
  }
]);
