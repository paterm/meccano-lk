import React from 'react'
import Card from '@ui/Card/Card'
import { I_UNKNOWN_OBJ } from '@t'
import { classes } from '@utils'
import DemographyBarChart from '@views/Widgets/DemographyWidget/DemographyBarChart/DemographyBarChart'
import DemographyPieChart from './DemographyPieChart'
import './DemographyWidget.css'

const cls = classes('demography-widget')

export interface TGender extends I_UNKNOWN_OBJ {
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

const DemographyWidget: React.FC<TProps> = ({
  data: {
    gender,
    age
  }
}) => (
  <Card title="Динамика демографии">
    <div { ...cls('row') }>
      <DemographyPieChart
        genderData={ gender }
      />
      <DemographyBarChart
        data={ age }
      />
    </div>
  </Card>
)

export default DemographyWidget
