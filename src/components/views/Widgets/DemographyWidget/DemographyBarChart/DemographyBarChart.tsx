import React, { ReactElement, useMemo } from 'react'
import { Bar, BarChart, Tooltip } from 'recharts'
import { classes } from '@utils'
import { TGender } from '@views/Widgets/DemographyWidget/DemographyWidget'
import { ReactComponent as MaleIcon } from './assets/demography-male.svg'
import { ReactComponent as FemaleIcon } from './assets/demography-female.svg'

type TProps = {
  data: TGender[]
}

const cls = classes('demography-widget')

const DemographyBarChart: React.FC<TProps> = ({ data }) => {
  const chartData = useMemo(() => data.map((item) => {
    const newItem = { ...item }

    newItem.male *= -1
    newItem.blank = 20
    return newItem
  }), [ data ])

  return (
    <div { ...cls('section') }>
      <p { ...cls('section-title') }>Возраст</p>

      <div { ...cls('chart', 'bar') }>
        <BarChart
          width={ 500 }
          height={ 300 }
          data={ chartData }
          stackOffset="sign"
          barGap={ 60 }
        >
          <Tooltip
            content={ CustomTooltip }
            cursor={ { fill: '#eee' } }
          />
          <Bar
            dataKey="male"
            fill="#4579F5"
            stackId="stack"
            label={ CustomWhiteLabel }
          />
          <Bar
            dataKey="blank"
            fill="transparent"
            stackId="stack"
            label={ (props: any) => CustomBlackLabel(props, chartData) }
          />
          <Bar
            dataKey="female"
            fill="#F545AD"
            stackId="stack"
            label={ CustomWhiteLabel }
          />
        </BarChart>
      </div>
    </div>
  )
}

export default DemographyBarChart

interface IRenderCustomFn {
  (props: any, data?: TGender[]): ReactElement
}

const CustomWhiteLabel: IRenderCustomFn = ({
  x,
  y,
  width,
  height,
  value
}) => (
  <text
    x={ x + width / 2 }
    y={ y + height + (value > 0 ? -8 : 20) }
    textAnchor="middle"
    fill="#fff"
    fontWeight="bold"
    fontSize="18"
  >
    { Math.abs(height) > 20 ? Math.abs(value) : '' }
  </text>
)

const CustomBlackLabel: IRenderCustomFn = ({
  x,
  y,
  width,
  height,
  index
}, data) => {
  const item = data?.[index]

  return (
    <text
      x={ x + width / 2 }
      y={ y + height / 2 + 12 }
      textAnchor="middle"
      fill="#645971"
      fontWeight="bold"
      fontSize="18"
    >
      { item?.age }
    </text>
  )
}

type TCustomTooltip = {
  payload: TGender[]
  [key: string]: any
}

const CustomTooltip: React.FC<TCustomTooltip> = ({ payload }) => {
  const label = payload[0]?.payload?.age
  return (
    <div { ...cls('bar-tooltip') }>
      <p { ...cls('bar-tooltip-label') }>
        {label}
      </p>

      {payload
        .sort((a) => (a.name === 'female' ? -1 : 1))
        .map((item: TGender, itemIndex: number) => {
          if (item.name === 'blank') { return null }

          const isMale = item.name === 'male'

          return (
            <div
              { ...cls('bar-tooltip-item') }
              key={ itemIndex }
              style={ { color: item.fill } }
            >
              {isMale ? <MaleIcon /> : <FemaleIcon />}
              <div { ...cls('bar-tooltip-item-value') }>
                {Math.abs(item.value)}
              </div>
            </div>
          )
        })}
    </div>
  )
}
