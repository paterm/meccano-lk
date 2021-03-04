import moment from 'moment';
import { TDatesPeriod } from '@t';

export interface IRangeItem {
  id: string,
  label: string
  disabled?: boolean
  period?: TDatesPeriod
}

export enum ERangeIds {
  PERIOD = 'period',
  TODAY = 'today',
  YESTERDAY = 'yesterday',
  WEEK = 'week',
  MONTH = 'month',
  PREV_MONTH = 'prevMonth',
  PREV_WEEK = 'prevWeek',
  YEAR = 'year'
}

export const Ranges: IRangeItem[] = [
  {
    id: ERangeIds.PERIOD,
    label: 'Период',
    period: {
      startDate: moment().subtract(1, 'w').startOf('day'),
      endDate: moment().endOf('day')
    }
  },
  {
    id: ERangeIds.TODAY,
    label: 'Сегодня',
    period: { startDate: moment().startOf('day'), endDate: moment().endOf('day') }
  },
  {
    id: ERangeIds.YESTERDAY,
    label: 'Вчера',
    period: {
      startDate: moment().subtract(1, 'day').startOf('day'),
      endDate: moment().subtract(1, 'day').endOf('day')
    }
  },
  {
    id: ERangeIds.WEEK,
    label: 'Неделя',
    period: {
      startDate: moment().startOf('isoWeek').startOf('day'),
      endDate: moment().endOf('isoWeek').startOf('day')
    }
  },
  {
    id: ERangeIds.MONTH,
    label: 'Месяц',
    period: {
      startDate: moment().startOf('month'),
      endDate: moment().endOf('month')
    }
  },
  {
    id: ERangeIds.PREV_MONTH,
    label: 'Прошлый месяц',
    period: {
      startDate: moment().subtract(1, 'month').startOf('month'),
      endDate: moment().subtract(1, 'month').endOf('month')
    }
  },
  {
    id: ERangeIds.PREV_WEEK,
    label: 'Прошлый неделя',
    period: {
      startDate: moment().subtract(1, 'w').startOf('isoWeek'),
      endDate: moment().subtract(1, 'w').endOf('isoWeek')
    }
  },
  {
    id: ERangeIds.YEAR,
    label: 'Год',
    period: {
      startDate: moment().startOf('year'),
      endDate: moment().endOf('year')
    }
  }
];
