import React, { useCallback, useState } from 'react';

import { TDatesPeriod } from '@t';
import { classes } from '@utils';
import { useHistory } from 'react-router-dom';
import { RouteComponentProps, useParams } from 'react-router';

import DemographyWidget from '@views/Widgets/DemographyWidget/DemographyWidget'
import TonalityDynamicData from '../Widgets/TonalityDynamicWidget/TonalityDynamicData/TonalityDynamicData';
import SummaryProjectWidget from '../Widgets/SummaryProjectWidget/SummaryProjectWidget';
import TonalityDynamicPie from '../Widgets/TonalityDynamicWidget/TonalityDynamicPie/TonalityDynamicPie';
import TonalityBarWidget from '../Widgets/TonalitybarWidget/TonalityBarWidget';
import GeographyWidget from '../Widgets/GeographyWidget/GeographyWidget';
import Header from './Header/Header';
import Card from '../../ui/Card/Card';
import {
  ScreenType,
  sectionOptions,
  screenTypes,
  initialPeriod,
  TonalityPieData,
  TonalityBarData,
  GeographyData,
  DemographyData,
} from './data';
import './Analytics.css';
import { projectData } from '../Dashboard/src/mockup';

const cls = classes('analytics');

type TParams = {
  type?: string
}

const Analytics: React.FC<RouteComponentProps<TParams>> = () => {
  const history = useHistory()
  const { type = 'general' } = useParams<TParams>()
  const [ activeScreen, setActiveScreen ] = useState<string>(ScreenType.SMI);
  const [ datePeriod, setDatePeriod ] = useState<TDatesPeriod>(initialPeriod);
  const [ metricViewType, setMetricViewType ] = useState('horizontal-4');
  const [ diagramType, setDiagramType ] = useState('line');

  const handleChange = useCallback((name, value) => {
    const method = name === 'metricViewType'
      ? setMetricViewType
      : setDiagramType;

    method(value);
  }, []);

  const handleChangeSection = useCallback((item) => {
    history.push(
      item.value && item.value !== 'general'
        ? `/analytics/${item.value}`
        : '/analytics'
    )
  }, [ history ])

  let section

  switch (type) {
    case 'tonality':
      section = (
        <Card
          title="Тональность"
          { ...cls('tonality-card') }
        >
          <TonalityDynamicPie data={ TonalityPieData } />
          <TonalityBarWidget data={ TonalityBarData } />
        </Card>
      )
      break

    case 'geography':
      section = (
        <GeographyWidget data={ GeographyData } />
      )
      break

    case 'demography':
      section = (
        <DemographyWidget data={ DemographyData } />
      )
      break

    case 'general':
    default:
      section = (
        <>
          <TonalityDynamicData
            { ...cls('tonality-widget', { [metricViewType]: true }) }
            data={ projectData }
          />
          <SummaryProjectWidget />
        </>
      )
  }

  return (
    <div { ...cls() }>
      <Header
        sectionOptions={ sectionOptions }
        screenTypes={ screenTypes }
        activeScreenTypeId={ activeScreen }
        activeSectionId={ type || 'general' }
        onChangeSection={ handleChangeSection }
        onChangeScreenType={ setActiveScreen }
        onChangeDatePeriod={ setDatePeriod }
        datePeriod={ datePeriod }
        metricViewType={ metricViewType }
        diagramType={ diagramType }
        onChange={ handleChange }
      />
      <div
        { ...cls('body', '', 'container') }
      >
        <Card withoutTopBorder>
          { section }
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
