import React, { useState } from 'react';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DayPickerRangeController } from 'react-dates';
import moment from 'moment';
import { classes } from '@utils';
import { ReactComponent as CalendarIcon } from '@assets/icons/date-picker/calendar.svg';
import { ReactComponent as ChevronLeft } from '@assets/icons/date-picker/chevron-left.svg';
import { ReactComponent as ChevronRight } from '@assets/icons/date-picker/chevron-right.svg';
import './DatePicker.css';
import 'moment/locale/ru';
import Button from '../Button/Button';

moment.locale('ru');

const cls = classes('date-picker');
const LeftIcon = React.createElement(ChevronLeft, { ...cls('icon', 'left') });
const RightIcon = React.createElement(ChevronRight, { ...cls('icon', 'right') });

type IDatesChange = {
  startDate: moment.Moment | null;
  endDate: moment.Moment | null;
};

type TFocusChange = 'startDate' | 'endDate' | null;

const DatePicker: React.FC = () => {
  const [ isOpen, setIsOpen ] = useState(false);
  const [ dates, setDates ] = useState<IDatesChange>({ startDate: moment().subtract(1, 'w'), endDate: moment() });
  const [ focusedInput, setFocusedInput ] = useState<TFocusChange>('startDate');
  const onDatesChange = (newDates: IDatesChange):void => {
    setDates(newDates);
  };
  const onFocusChange = (focused: TFocusChange): void => {
    setFocusedInput(focused || 'startDate');
  };
  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);
  };

  return (
    <div { ...cls() }>
      <div
        { ...cls('field') }
        onClick={ handleOpen }
        onFocus={ handleOpen }
        tabIndex={ 0 }
        role="textbox"
      >
        <CalendarIcon { ...cls('field-icon') } />
        <input
          { ...cls('field-input') }
          type="text"
          value={ `${dates.startDate?.format('DD.MM.YY')} - ${dates.endDate?.format('DD.MM.YY') || ''}` }
          readOnly
        />
      </div>

      {isOpen && (
        <div { ...cls('picker-wrapper') }>
          <DayPickerRangeController
            onDatesChange={ onDatesChange }
            onFocusChange={ onFocusChange }
            focusedInput={ focusedInput }
            startDate={ dates.startDate }
            endDate={ dates.endDate }
            numberOfMonths={ 2 }
            initialVisibleMonth={ () => moment() }
            hideKeyboardShortcutsPanel
            daySize={ 63 }
            onOutsideClick={ () => isOpen && setIsOpen(false) }
            navPrev={ LeftIcon }
            navNext={ RightIcon }
          />

          <div { ...cls('times') }>
            Time
          </div>

          <div { ...cls('buttons') }>
            <Button { ...cls('button') }>Отмена</Button>
            <Button
              { ...cls('button') }
              disabled={ !dates.startDate || !dates.endDate }
              filled
            >
              Применить
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;
