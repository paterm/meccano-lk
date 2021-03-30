import React, { useMemo } from 'react'
import { classes } from '@utils'
import { Cell, Pie, PieChart } from 'recharts'
import { ReactComponent as FemaleIcon } from './assets/demography-female.svg'
import { ReactComponent as MaleIcon } from './assets/demography-male.svg'

type TProps = {
  genderData: {
    female: number
    male: number
    [key: string]: number
  }
}

const cls = classes('demography-widget')

const CHART_DATA = {
  height: 171,
  width: 260,
  male: {
    cx: 170,
    fill: '#4579F5'
  },
  female: {
    cx: 80,
    fill: '#F545AD'
  }
}

const DemographyPieChart: React.FC<TProps> = ({ genderData }) => {
  const data = useMemo(() => Object
    .keys(genderData)
    .sort((a) => (a === 'female' ? -1 : 1))
    .map((key) => {
      const isMale = key === 'male'
      const value = genderData[key] || 0
      const { male, female } = CHART_DATA

      return {
        name: key,
        value,
        cx: isMale ? male.cx : female.cx,
        fill: isMale ? male.fill : female.fill,
        isMale,
      }
    }), [genderData])
  const { startAngle, endAngle } = calcAngle(data[0].value)

  return (
    <div { ...cls('section') }>
      <p { ...cls('section-title') }>Гендер</p>

      <div { ...cls('chart') }>
        <PieChart
          width={ CHART_DATA.width }
          height={ CHART_DATA.height + 65 }
        >
          { data.map((pie, pieIndex) => (
            <Pie
              key={ pieIndex }
              data={ data }
              dataKey="value"
              cx={ pie.cx }
              outerRadius={ 85 }
              innerRadius={ 40 }
              startAngle={ startAngle }
              endAngle={ endAngle }
            >
              { data.map((item, index) => (
                <Cell
                  key={ `cell-${index}` }
                  fill={ pieIndex === index ? item.fill : 'transparent' }
                />
              )) }
            </Pie>
          )) }
        </PieChart>

        <FemaleIcon
          { ...cls('female-icon') }
          style={ {
            left: CHART_DATA.female.cx,
            top: CHART_DATA.height / 2 + 32
          } }
        />
        <MaleIcon
          { ...cls('male-icon') }
          style={ {
            left: CHART_DATA.male.cx,
            top: CHART_DATA.height / 2 + 32
          } }
        />

        <div { ...cls('legend') } style={ { width: CHART_DATA.width } }>
          { data.map((item, itemIndex) => (
            <span
              { ...cls('legend-item') }
              key={ itemIndex }
            >
              { item.value }%
            </span>
          )) }
        </div>
      </div>
    </div>
  )
}

export default DemographyPieChart

const calcAngle = (percent: number) => {
  const startAngle = (360 - (percent * 360) / 100) / 2
  const endAngle = startAngle + 360

  return { startAngle, endAngle }
}
