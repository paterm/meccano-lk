import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { classes } from '@utils';
import { ReactComponent as InfoIcon } from '@assets/icons/button/info.svg';
import PseudoPopup from '../../ui/PseudoPopup/PseudoPopup';
import FilterGeneral from './src/FilterGeneral/FilterGeneral';
import { usePopup } from '../../../utils/hooks';
import Button from '../../ui/Button/Button';
import './Filter.css';

const cls = classes('filter');

const views = [
  { view: 'filter-main', name: 'Общие', component: FilterGeneral, },
];

interface IFilter {
  view: string
}

const Filter:React.FC<IFilter> = ({ view: startView }) => {
  const popup = usePopup();

  const menu = views.map(({ view, name }) => (
    { view, name, onClick: () => popup.open(view) }
  ));

  const getActiveView = (view: string): any => views
    .find((el) => el.view === view)?.component || null;

  const ActiveView = getActiveView(startView);

  return (
    <PseudoPopup
      { ...cls() }
      title="Фильтр"
      childrenViewName={ startView }
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
        <title>{startView} | Настройки фильтра | Maeccano</title>
      </Helmet>
      <ActiveView />
    </PseudoPopup>
  );
};

export default Filter;
