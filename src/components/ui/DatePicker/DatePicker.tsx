import React, {
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DayPickerRangeController } from 'react-dates';
import moment from 'moment';
import { classes } from '@utils';
import { TDatesPeriod } from '@t';
import { ReactComponent as CalendarIcon } from './assets/calendar.svg';
import { ReactComponent as ChevronLeft } from './assets/chevron-left.svg';
import { ReactComponent as ChevronRight } from './assets/chevron-right.svg';
import Button from '../Button/Button';
import TimePicker from '../TimePicker/TimePicker';
import { ERangeIds, IRangeItem, Ranges } from './Ranges';

import './DatePicker.css';
import 'moment/locale/ru';

moment.locale('ru');

interface IDatePicker {
  value?: TDatesPeriod
  onChange?: (period: TDatesPeriod) => void
}

const cls = classes('date-picker');
const LeftIcon = React.createElement(ChevronLeft, { ...cls('icon', 'left') });
const RightIcon = React.createElement(ChevronRight, { ...cls('icon', 'right') });

type TFocusChange = 'startDate' | 'endDate' | null;

const DatePicker: React.FC<IDatePicker> = ({
  value = {
    startDate: moment().subtract(1, 'w'),
    endDate: moment()
  },
  onChange = () => {},
}) => {
  const [ isOpen, setIsOpen ] = useState(false);
  const [ isMobile, setIsMobile ] = useState(window.innerWidth < 1024);
  const [ dates, setDates ] = useState<TDatesPeriod>(value);
  const [ activeRange, setActiveRange ] = useState<string>(Ranges[0].id);
  const [ focusedInput, setFocusedInput ] = useState<TFocusChange>('startDate');
  const containerRef = useRef<HTMLDivElement | null>(null);
  const onDatesChange = (newDates: TDatesPeriod): void => {
    setDates(newDates);
    Ranges[0].period = newDates;
  };
  const onFocusChange = (focused: TFocusChange): void => {
    setFocusedInput(focused || 'startDate');
  };
  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);
  };
  const handleChangeRange = (item: IRangeItem) => {
    if (!item.disabled && item.period) {
      if (item.id === ERangeIds.PREV_MONTH) {
        const prevBtn: HTMLButtonElement | null = document
          .querySelector('[aria-label="Move backward to switch to the previous month."]');

        if (prevBtn) {
          prevBtn.click();
        }
      }

      setDates(item.period);
      setActiveRange(item.id);
    }
  };
  const handleApply = () => {
    onChange(dates);
    setIsOpen(false);
  };
  const handleOutsideClick = useCallback((event: MouseEvent) => {
    if (isOpen && containerRef && containerRef.current && event.target) {
      if (!containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
  }, [ isOpen ]);
  const handleResize = useCallback((event) => {
    const mobile = event.target.innerWidth < 1024;

    if (mobile !== isMobile) {
      setIsMobile(mobile);
    }
  }, [ isMobile, setIsMobile ]);
  const handleKeyDown = useCallback((event) => {
    if (event.key === 'Escape') {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    if (value !== dates) {
      setDates(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ value ]);

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    document.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, [ handleOutsideClick, handleResize, handleKeyDown ]);

  return (
    <div { ...cls() } ref={ containerRef }>
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
          value={ `${value.startDate?.format('DD.MM.YY')} - ${value.endDate?.format('DD.MM.YY') || ''}` }
          readOnly
        />
      </div>

      { isOpen && (
        <div { ...cls('picker-wrapper') }>
          <DayPickerRangeController
            onDatesChange={ onDatesChange }
            onFocusChange={ onFocusChange }
            focusedInput={ focusedInput }
            startDate={ dates.startDate }
            endDate={ dates.endDate }
            numberOfMonths={ isMobile ? 1 : 2 }
            initialVisibleMonth={ () => moment() }
            hideKeyboardShortcutsPanel
            daySize={ isMobile ? 47 : 63 }
            // onOutsideClick={ () => isOpen && setIsOpen(false) }
            navPrev={ LeftIcon }
            navNext={ RightIcon }
          />

          <div { ...cls('times') }>
            { dates.startDate && (
              <TimePicker
                { ...cls('time-picker') }
                dateTime={ dates.startDate }
                showDate
              />
            ) }
            { dates.endDate && (
              <TimePicker
                { ...cls('time-picker') }
                dateTime={ dates.endDate }
                showDate
                revert
              />
            ) }
          </div>

          { !isMobile && (
            <div { ...cls('ranges') }>
              { Ranges.map((item, itemIndex) => (
                <Button
                  { ...cls('range-button', { active: activeRange === item.id }) }
                  key={ itemIndex }
                  inline
                  onClick={ () => handleChangeRange(item) }
                >
                  { item.label }
                </Button>
              )) }
            </div>
          ) }

          <div { ...cls('buttons') }>
            <Button
              { ...cls('button') }
              onClick={ () => setIsOpen(false) }
            >
              Отмена
            </Button>
            <Button
              { ...cls('button') }
              disabled={ !dates.startDate || !dates.endDate }
              onClick={ handleApply }
              filled
            >
              Применить
            </Button>
          </div>
        </div>
      ) }
    </div>
  );
};

export default DatePicker;
