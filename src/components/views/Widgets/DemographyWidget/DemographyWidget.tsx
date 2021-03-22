import React from 'react'
import Card from '@ui/Card/Card'
import { classes } from '@utils'
import {
  Cell,
  Pie,
  PieChart,
} from 'recharts'
import { I_UNKNOWN_OBJ } from '@t'

const cls = classes('demography-widget')

interface TGender extends I_UNKNOWN_OBJ {
  male: number
  female: number
  age?: string
}

type TProps = {
  data: {
    gender: TGender
    age: TGender[]
  }
}

const calcAngle = (percent: number, offset: number, coef: number) => {
  const startAngle = offset + (coef * (360 - (percent * 360) / 100)) / 2
  const endAngle = startAngle + 360

  return { startAngle, endAngle }
}

const DemographyWidget: React.FC<TProps> = ({
  data: {
    gender,
    age
  }
}) => {
  const data = Object.keys(gender).map((key) => {
    const isMale = key === 'male'
    const value = gender[key] || 0
    return {
      name: key,
      value,
      cx: isMale ? 250 : 85,
      color: isMale ? '#4579F5' : '#F545AD',
      ...calcAngle(value, isMale ? 180 : 0, isMale ? 1 : -1)
    }
  })

  return (
    <Card>
      <div { ...cls('row') }>
        <div { ...cls('section') }>
          <p { ...cls('section-title') }>Гендер</p>

          <PieChart width={ 340 } height={ 171 }>
            { data.map((pie, pieIndex) => (
              <Pie
                key={ pieIndex }
                data={ data }
                dataKey="value"
                cx={ pie.cx }
                outerRadius={ 85 }
                innerRadius={ 40 }
                startAngle={ pie.startAngle }
                endAngle={ pie.endAngle }
              >
                { data.map((item, index) => (
                  <Cell key={ `cell-${index}` } fill={ pieIndex === index ? item.color : 'transparent' } />
                )) }

                <g xmlns="http://www.w3.org/2000/svg" transform="translate(-432 -462) translate(400 198) translate(16 78) translate(16 144) translate(0 37) translate(0 5) translate(71 62) translate(0 .734)">
                  <circle cx="5.923" cy="4.923" r="4.923" />
                  <path d="M10.386 22.846H11c.288 0 .56-.124.75-.34.19-.214.278-.502.242-.786l-.898-7.09c-.12-1.016-.976-1.784-1.994-1.784H2.9c-1.02 0-1.876.768-1.992 1.774l-.9 7.1c-.036.284.052.572.242.786.19.216.462.34.75.34h.612L.052 27.53c-.102.304-.05.64.136.9.188.262.49.416.812.416h1.152l.722 4.328c.162.968.992 1.672 1.974 1.672h2.304c.982 0 1.812-.704 1.972-1.672l.724-4.328H11c.322 0 .624-.154.81-.416.19-.26.24-.596.138-.9l-1.562-4.684z" />
                </g>
              </Pie>
            )) }
          </PieChart>
        </div>
      </div>
    </Card>
  )
}

export default DemographyWidget
