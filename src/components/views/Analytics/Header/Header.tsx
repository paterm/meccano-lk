import React, { useState } from 'react';
import { classes } from '@utils';
import { TDatesPeriod } from '@t';
import { ReactComponent as FilterIcon } from '@assets/icons/button/filter.svg';
import { ReactComponent as CloseIcon } from '@assets/icons/button/close.svg';
import Select from '../../../ui/Select/Select';
import ButtonSwitcher from '../../../ui/ButtonSwitcher/ButtonSwicther';
import DatePicker from '../../../ui/DatePicker/DatePicker';
import Button from '../../../ui/Button/Button';
import FilterPanel from '../FilterPanel/FilterPanel';
import './AnalyticsHeader.css';

const cls = classes('analytics-header');

type TProps = {
  sectionOptions: any[]
  screenTypes: { id: string, label: string }[]
  activeScreenTypeId: string
  activeSectionId?: string
  onChangeScreenType: (type: string) => void
  onChangeDatePeriod: (datePeriod: TDatesPeriod) => void
  datePeriod: TDatesPeriod
  metricViewType: string
  diagramType: string
  onChange: (name: string, value: any) => void
  onChangeSection: (item: any) => void
};

const Header: React.FC<TProps> = ({
  sectionOptions,
  activeSectionId = 'not-processed',
  onChangeSection,
  screenTypes,
  activeScreenTypeId,
  onChangeScreenType,
  onChangeDatePeriod,
  datePeriod,
  metricViewType,
  diagramType,
  onChange
}) => {
  const [isOpenFilter, setIsOpenFilter] = useState(false);

  return (
    <section { ...cls('', '', 'container') }>
      <div { ...cls('container') }>
        <Select
          options={ sectionOptions }
          selected={ activeSectionId }
          onChange={ onChangeSection }
        />
        <ButtonSwitcher
          activeButtonId={ activeScreenTypeId }
          buttons={ screenTypes }
          onChange={ onChangeScreenType }
        />

        <DatePicker value={ datePeriod } onChange={ onChangeDatePeriod } />

        <div { ...cls('filter-with-drop-down') }>
          <Button
            { ...cls('filter-button') }
            icon={ FilterIcon }
            color="coral"
            rounded
            onClick={ () => setIsOpenFilter(!isOpenFilter) }
            badge={ 1249 }
          />
          {isOpenFilter && (
            <Button
              { ...cls('filter-close-button') }
              icon={ CloseIcon }
              size={ 24 }
              color="gray"
              transparent
              onClick={ () => setIsOpenFilter(true) }
            />
          )}
        </div>
      </div>

      <FilterPanel
        metricViewType={ metricViewType }
        diagramType={ diagramType }
        onChange={ onChange }
      />
    </section>
  );
};

export default Header;
