import React from 'react';
import { classes } from '@utils';
import TonalityDynamicPie from './TonalityDynamicPie/TonalityDynamicPie';
import './TonalityDynamicWidget.css';
import TonalityDynamicData from './TonalityDynamicData/TonalityDynamicData';
import { projectData } from '../../Dashboard/src/mockup';
import Card from '../../../ui/Card/Card';

const cls = classes('tonality-dynamic-widget');

const TonalityDynamicWidget: React.FC = () => {
  const PieData = [
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

  return (
    <section { ...cls() }>
      <Card title="Динамика тональности">
        <TonalityDynamicPie data={ PieData } />
      </Card>

      <TonalityDynamicData data={ projectData } />
    </section>
  );
};

export default TonalityDynamicWidget;
