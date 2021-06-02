import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { classes, usePopup } from '@utils';
import { ReactComponent as InfoIcon } from '@assets/icons/button/info.svg';
import PseudoPopup from '@components/ui/PseudoPopup/PseudoPopup';
import Button from '@components/ui/Button/Button';
import FilterGeneral from './src/FilterGeneral/FilterGeneral';
import './Filter.css';

const cls = classes('filter');

const views = [
  { view: 'filter-main', name: 'Общие', component: FilterGeneral, },
  { view: 'filter-objects', name: 'Объекты', component: FilterGeneral, },
  { view: 'filter-sources', name: 'Источники', component: FilterGeneral, },
  { view: 'filter-geo', name: 'География', component: FilterGeneral, },
  { view: 'filter-authors', name: 'Авторы', component: FilterGeneral, },
  { view: 'filter-tags', name: 'Теги', component: FilterGeneral, }
];

interface IFilter {
  view: string
}

const Filter:React.FC<IFilter> = ({ view }) => {
  const popup = usePopup();

  const menu = views.map((el) => (
    { view: el.view, name: el.name, onClick: () => popup.open(el.view) }
  ));

  const getActiveView = (slug: string): any => views
    .find((el) => el.view === slug)?.component || null;

  const getViewName = (slug: string): any => views
    .find((el) => el.view === slug)?.name || '';

  const ActiveView = getActiveView(view);
  const activeViewName = getViewName(view);

  return (
    <PseudoPopup
      { ...cls() }
      title="Фильтр"
      childrenView={ view }
      childrenViewName={ activeViewName }
      menu={ menu }
      bar={ (
        <div { ...cls('bar') }>
          <Button
            { ...cls('template-button') }
            type="button"
          >
            Выбрать шаблон
          </Button>
          <div { ...cls('guide') }>
            <InfoIcon { ...cls('guide-icon') } />
            <Link
              { ...cls('guide-link') }
              to="/guide/filters"
            >
              Гайд по&nbsp;фильтрам и&nbsp;шаблонам
            </Link>
          </div>
        </div>
      ) }
    >
      <Helmet>
        <title>{activeViewName} | Настройки фильтра | Meccano</title>
      </Helmet>
      <ActiveView />
    </PseudoPopup>
  );
};

export default Filter;
