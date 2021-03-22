import { TDatesPeriod } from '@t';
import moment from 'moment';

export enum ScreenType {
  SMI = 'smi',
  SOCIAL = 'social',
}

export const sectionOptions = [
  { label: 'Общие показатели', value: 'general' },
  { label: 'Тональность', value: 'tonality' },
  { label: 'География', value: 'geography' },
  { label: 'Источники', value: 'sources' },
  { label: 'Демография', value: 'demography' },
  { label: 'Сообщения', value: 'messages' },
  { label: 'Типы площадок', value: 'platform_types' },
  { label: 'Авторы', value: 'authors' },
];
export const screenTypes = [
  { id: ScreenType.SMI, label: 'СМИ 1 022' },
  { id: ScreenType.SOCIAL, label: 'СОЦМЕДИА 1 480' },
];
export const initialPeriod: TDatesPeriod = {
  startDate: moment().subtract(1, 'w').startOf('day'),
  endDate: moment()
};

export type TField = {
  type: string
  label: string
  name: string
};

export type TFilter = {
  label: string
  name: 'metricViewType' | 'diagramType'
  fields: TField[]
};

export const filters: TFilter[] = [
  {
    label: 'Вид метрик:',
    name: 'metricViewType',
    fields: [
      {
        type: 'checkbox',
        label: '4 по горизонтали',
        name: 'horizontal-4'
      },
      {
        type: 'checkbox',
        label: '2 по горизонтали',
        name: 'horizontal-2'
      },
      // {
      //   type: 'checkbox',
      //   label: '2 по вертикали',
      //   name: 'vertical-2'
      // },
    ]
  },
  {
    label: 'Тип диаграммы динамики::',
    name: 'diagramType',
    fields: [
      // {
      //   type: 'checkbox',
      //   label: 'Стандартная',
      //   name: 'default'
      // },
      {
        type: 'checkbox',
        label: 'Линейная',
        name: 'line'
      },
      {
        type: 'checkbox',
        label: 'Столбчатая',
        name: 'Bae'
      },
    ]
  }
];

export const TonalityPieData = [
  {
    name: 'позитив',
    value: 4510,
    color: '#16b862'
  },
  {
    name: 'негатив',
    value: 6340,
    color: '#ff2525'
  },
  {
    name: 'нейтрал',
    value: 3240,
    color: '#a19fa9'
  }
];

export const TonalityBarData = [
  {
    pos: 8000,
    ng: 0,
    ne: 11500,
    date: '2020-06-03T00:00:00'
  },
  {
    pos: 0,
    ng: 2350,
    ne: 7500,
    date: '2020-06-04T00:00:00'
  },
  {
    pos: 1500,
    ng: 4350,
    ne: 5500,
    date: '2020-06-05T00:00:00'
  },
  {
    pos: 2680,
    ng: 1280,
    ne: 19000,
    date: '2020-06-06T00:00:00'
  },
  {
    pos: 7600,
    ng: 3860,
    ne: 23900,
    date: '2020-06-07T00:00:00'
  },
  {
    pos: 7600,
    ng: 0,
    ne: 8900,
    date: '2020-06-08T00:00:00'
  },
  {
    pos: 5600,
    ng: 0,
    ne: 22900,
    date: '2020-06-09T00:00:00'
  },
  {
    pos: 1600,
    ng: 9650,
    ne: 11200,
    date: '2020-08-10T00:00:00'
  }
]

export const GeographyData = [
  { cityName: 'Москва', value: 702, geo: [55.7504461, 37.6174943] },
  { cityName: 'Калининград', value: 209, geo: [54.710128, 20.5105838] },
  { cityName: 'Екатеринбург', value: 514, geo: [56.839104, 60.60825] },
  { cityName: 'Сочи', value: 132, geo: [43.5854823, 39.723109] },
]

export const DemographyData = {
  gender: {
    male: 81.8,
    female: 18.2
  },
  age: [
    {
      age: '0-12',
      male: 12,
      female: 8
    },
    {
      age: '12-20',
      male: 34,
      female: 21
    },
    {
      age: '20-25',
      male: 32,
      female: 19
    },
    {
      age: '25-35',
      male: 46,
      female: 31
    },
    {
      age: '35-45',
      male: 12,
      female: 8
    },
    {
      age: '45-65',
      male: 6,
      female: 3
    }
  ]
}
