import React from 'react';
import { classes } from '@utils';
import './TagTonalityWidget.css';
import WidgetCard from '../WidgetCard/WidgetCard';

const cls = classes('tag-tonality-widget');
const LEGEND = [
  { label: 'Позитив', color: '#16b862' },
  { label: 'Нейтрал', color: '#a19fa9' },
  { label: 'Негатив', color: '#ff2525' }
];

interface IAnalyticTagTonalityData {
  tag: string
  positiveValue: number
  neutralValue: number
  negativeValue: number
}

interface ITagTonalityWidget {
  data: IAnalyticTagTonalityData[]
}

const convertToPercentOfSum = (values: number []) => {
  const sumValues = values.reduce((acc, value) => acc + value, 0)
  return values.map((value) => Math.round((value * 100) / sumValues))
};

const TagTonalityWidget: React.FC<ITagTonalityWidget> = (props) => {
  const { data } = props

  const dataConventPercentOfSum = data.map((el) => {
    const [
      positiveValue, neutralValue, negativeValue
    ] = convertToPercentOfSum([el.positiveValue, el.neutralValue, el.negativeValue])
    return {
      tag: el.tag,
      positiveValue,
      neutralValue,
      negativeValue
    }
  });

  const getSlicedBarElement = (values: number []) => (
    <div { ...cls('bar') }>
      { values.map((value, index) => (
        <div
          { ...cls('slice') }
          key={ index }
          style={ {
            backgroundColor: LEGEND[index].color,
            width: `${value}%`
          } }
        >
          <span { ...cls('slice-label') }>{ !!value && `${value}%` }</span>
        </div>
      )) }
    </div>
  )

  return (
    <WidgetCard
      { ...cls() }
      title="Тональность тегов"
      info="Тональность тегов это ..."
      hasDownloadButton
      hasFullScreenButton
    >
      <>
        { dataConventPercentOfSum.map((el) => (
          <div { ...cls('row') }>
            <span { ...cls('row-label') }>{ el.tag }</span>
            { getSlicedBarElement([el.positiveValue, el.neutralValue, el.negativeValue]) }
          </div>
        )) }
        <div { ...cls('legend') }>
          { LEGEND.map(({ label, color }) => (
            <div { ...cls('legend-item') }>
              <div { ...cls('legend-color') } style={ { backgroundColor: color } } />
              <span { ...cls('legend-label') }>{ label }</span>
            </div>
          )) }
        </div>
      </>
    </WidgetCard>
  )
};

export default TagTonalityWidget;
