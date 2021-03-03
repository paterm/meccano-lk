import { ReactComponent as SearchIcon } from '@assets/icons/common/search-icon-24.svg';
import { ReactComponent as BookmarkIcon } from '@assets/icons/common/bookmark-border-24-px.svg';
import { ReactComponent as DoubleCheckIcon } from '@assets/icons/common/double-check-24.svg';
import { ReactComponent as BarChartIcon } from '@assets/icons/common/bar-chart-24.svg';
import { TPossibilityWidget } from './PossibilityWidgetItem/PossibilityWidgetItem';

export const Possibilities: TPossibilityWidget[] = [
  {
    title: 'Мониторинг СМИ',
    description: 'Используйте  возможности Meccano чтобы отслеживать упоминания в СМИ',
    link: '/',
    icon: SearchIcon,
    color: 'green'
  },
  {
    title: 'Шаблоны фильтрации',
    description: 'Создавайте шаблоны с настройками фильтров, чтобы  применять их к любому проекту',
    link: '/',
    icon: BookmarkIcon,
    color: 'blue'
  },
  {
    title: 'Создание проекта',
    description: 'Создавайте и настраивайте  ваши проекты',
    link: '/',
    icon: DoubleCheckIcon,
    color: 'violet'
  },
  {
    title: 'Основные сущности:',
    description: 'Сообщения, Аналитика, Отчеты и дайджест',
    link: '/',
    icon: BarChartIcon,
    color: 'coral'
  }
];
