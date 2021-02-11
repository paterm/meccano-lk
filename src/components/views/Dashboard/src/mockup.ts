import { TDashboardEvent } from './Widgets/LastEventsWidget/LastEventsWidget';
import DefaultAdsImage from '../../../../assets/images/widget-ads.jpg';
import { ReactComponent as DownloadIcon } from './Widgets/LastEventsWidget/assets/download-icon.svg';

export const projectData = [
  {
    date: '2020-01-03T00:00:00',
    value: 4900,
    messagesCount: {
      total: 152,
      new: 12
    },
    coverage: {
      total: 2601,
      new: 12
    },
    mfi: {
      total: 13,
      new: 12
    },
    er: {
      total: 23,
      new: 12
    }
  },
  {
    date: '2020-01-04T00:00:00',
    value: 9500,
    messagesCount: {
      total: 135,
      new: 12
    },
    coverage: {
      total: 1074,
      new: 12
    },
    mfi: {
      total: 22,
      new: 12
    },
    er: {
      total: 68,
      new: 12
    }
  },
  {
    date: '2020-01-05T00:00:00',
    value: 6400,
    messagesCount: {
      total: 168,
      new: 12
    },
    coverage: {
      total: 965,
      new: 12
    },
    mfi: {
      total: 21,
      new: 12
    },
    er: {
      total: 12,
      new: 12
    }
  },
  {
    date: '2020-01-06T00:00:00',
    value: 7500,
    messagesCount: {
      total: 625,
      new: 12
    },
    coverage: {
      total: 234,
      new: 12
    },
    mfi: {
      total: 24,
      new: 12
    },
    er: {
      total: 98,
      new: -12
    }
  },
  {
    date: '2020-01-07T00:00:00',
    value: 23750,
    messagesCount: {
      total: 435,
      new: 12
    },
    coverage: {
      total: 2698,
      new: 12
    },
    mfi: {
      total: 135,
      new: 12
    },
    er: {
      total: 21,
      new: -12
    }
  },
  {
    date: '2020-01-08T00:00:00',
    value: 12400,
    messagesCount: {
      total: 385,
      new: 12
    },
    coverage: {
      total: 2365,
      new: 12
    },
    mfi: {
      total: 23,
      new: 12
    },
    er: {
      total: 89,
      new: -22
    }
  },
  {
    date: '2020-01-08T00:00:00',
    value: 15600,
    messagesCount: {
      total: 270,
      new: 12
    },
    coverage: {
      total: 1567,
      new: 12
    },
    mfi: {
      total: 43,
      new: 12
    },
    er: {
      total: 43,
      new: -12
    }
  }
];

export const lastEvents: TDashboardEvent[] = [
  {
    type: 'event',
    hasUpdates: true,
    description: 'Последний раз вы работали над проектом <b>Проект #2</b>',
    buttons: [
      {
        name: 'Открыть',
        href: '/',
      }
    ]
  },
  {
    type: 'event',
    hasUpdates: false,
    description: 'Тариф <b>Мониторинг СМИ</b> заканчивается через 5 дней',
    buttons: [
      {
        name: 'Продлить',
        href: '/',
      }
    ]
  },
  {
    type: 'event',
    hasUpdates: false,
    description: 'Новый отчет <b>Статистика за 3 квартал</b> в проекте <b>Проект #1</b> доступен в Отчеты и дайджест',
    buttons: [
      {
        icon: DownloadIcon,
        href: '/'
      },
      {
        name: 'Отчеты и дайджест',
        href: '/',
      }
    ]
  },
  {
    type: 'event',
    hasUpdates: false,
    description: 'В проекте <b>Репутация контрагентов</b> появились новые сообщения',
    buttons: [
      {
        name: 'Открыть',
        href: '/',
      }
    ]
  },
  {
    type: 'event',
    hasUpdates: false,
    description: 'Новый отчет в проекте <b>Лояльность клиентов</b> доступны в Отчеты и дайджест',
    buttons: [
      {
        name: 'Перейти',
        href: '/',
      }
    ]
  },
  {
    type: 'event',
    hasUpdates: false,
    description: 'В проекте <b>Репутация контрагентов</b> появились новые сообщения',
    buttons: [
      {
        name: 'Открыть',
        href: '/',
      }
    ]
  },
  {
    type: 'adv',
    hasUpdates: false,
    image: DefaultAdsImage,
    buttons: [
      {
        name: 'Подробнее',
        href: '/',
        color: 'violet'
      },
      {
        name: 'Открыть',
        href: '/',
      }
    ]
  }
];
