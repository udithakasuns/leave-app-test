/* eslint-disable no-plusplus */
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { FormikProps } from 'formik';
import { DateTime } from 'luxon';
import React, { useEffect, useMemo, useState } from 'react';
import { View } from 'react-native';
import { Calendar, CalendarUtils, DateData } from 'react-native-calendars';
import { MarkingProps } from 'react-native-calendars/src/calendar/day/marking';
import { MarkedDates } from 'react-native-calendars/src/types';
import { Spacer } from 'src/components/atoms';
import { ButtonDock, SelectionButton } from 'src/components/molecules';
import { getHttpAllHolidays, getHttpLeavesByUser } from 'src/services/http';
import { useUserStore } from 'src/store';
import {
    showErrorToast,
    showErrorWithInfoToast,
    showWarningToast,
} from 'src/utils/alerts';
import {
    getCalendarDate,
    getFormattedDay,
} from 'src/utils/helpers/dateHandler';
import { ErrorCodes } from 'src/utils/helpers/errorCodes';
import theme from 'src/utils/theme';
import {
    ApplyFormValues,
    CompanyHolidays,
    EmployeeModal,
    Holiday,
    TestProps,
} from 'src/utils/types';
import { SkelitonLoaderFull } from './SkelitonLoaders';
import { calendarTheme, styles } from './styles';
import TeamAvailability from './TeamAvailability';

const { scale, colors } = theme;
export interface DropDownList {
    teamId: number;
    teamName: string;
}
interface Props extends Partial<TestProps> {
    formik: FormikProps<ApplyFormValues>;
    onBackPress: (modalType: EmployeeModal) => void;
}
const defaultCompanyHolidayMarker: MarkingProps = {
    selected: true,
    marked: true,
    selectedColor: colors.dividerColor,
    selectedTextColor: colors.gray400,
    dotColor: '',
};

const ChooseDateSheetBody = ({ formik, onBackPress }: Props) => {
    const [range, setRange] = useState<{
        startDate: string;
        endDate?: string;
    }>({ startDate: '', endDate: '' });
    const [holidays, setHolidays] = useState<MarkedDates>({});
    const [companyHolidayList, setCompanyHolidayList] = useState<
        CompanyHolidays[]
    >([]);
    const [holiday, setHoliday] = useState<MarkedDates>({});
    const {
        user: { userId },
    } = useUserStore();
    const marked = useMemo(() => {
        if (!range.startDate) return holidays;
        const start = new Date(range.startDate).getTime();
        const end = new Date(range.endDate || range.startDate).getTime();
        const tempMarked: MarkedDates = JSON.parse(JSON.stringify(holidays));
        for (
            let currentDate = start;
            currentDate <= end;
            currentDate += 60 * 60 * 24000
        ) {
            const currentDateString = new Date(currentDate)
                .toISOString()
                .substr(0, 10);
            if (
                holidays[currentDateString] === undefined ||
                holidays[currentDateString]?.selectedColor ===
                    colors.secondaryBackground
            )
                tempMarked[
                    CalendarUtils.getCalendarDateString(currentDateString)
                ] = {
                    selected: true,
                    selectedColor: colors.primaryColor,
                    selectedTextColor: colors.white,
                };
        }
        return tempMarked;
    }, [range, holidays]);

    const updateCompanyHolidays = (allCompanyHolidays: Holiday[]): void => {
        allCompanyHolidays.forEach(companyHoliday => {
            setHoliday(prevHoliday => ({
                ...prevHoliday,
                [companyHoliday.date]: {
                    ...defaultCompanyHolidayMarker,
                    dotColor: companyHoliday.holidayColor,
                },
            }));
        });
    };
    // fetch All company holidays
    const { data: allCompanyHolidays, isLoading: isLoadingAllCompanyHolidays } =
        useQuery<Holiday[], AxiosError>(
            ['fetchAllCompanyHolidays'],
            () => getHttpAllHolidays(),
            {
                onSuccess: data => updateCompanyHolidays(data),
                keepPreviousData: true,
            },
        );
    const setCompanyHolidaysForSelectedDates = (
        startDate: string,
        endDate: string,
    ): void => {
        setCompanyHolidayList(
            Object.keys(holidays)
                .filter(
                    date =>
                        holidays[date].marked &&
                        date >= startDate &&
                        date <= endDate,
                )
                .map(date => ({ dateString: date })),
        );
    };

    const updateAlreadyLeaveDates = (alreadyLeaveDates: string[]): void => {
        Object.values(alreadyLeaveDates)
            .flat()
            .forEach(date => {
                setHoliday(prevHoliday => ({
                    ...prevHoliday,
                    [date]: { ...defaultCompanyHolidayMarker, marked: false },
                }));
            });
    };

    // fetch already leave dates of the user
    const { data: alreadyLeaveDates, isLoading: isLoadingAlreadyLeaveDates } =
        useQuery<string[], AxiosError>(
            ['fetchAlreadyLeaveDates'],
            () => getHttpLeavesByUser(userId),
            {
                onSuccess: data => updateAlreadyLeaveDates(data),
                keepPreviousData: true,
            },
        );

    const getAlreadyLeaveDatesForSelectedDates = (
        startDate: string,
        endDate: string,
    ): CompanyHolidays[] =>
        Object.keys(holidays)
            .filter(
                date =>
                    holidays[date].marked === false &&
                    date >= startDate &&
                    date <= endDate,
            )
            .map(date => ({ dateString: date }));

    const daysInMonth = (month: number, year: number) =>
        new Date(year, month, 0).getDate();

    const getAllHolidaysForMonth = (timeStamp: number) => {
        const holidayMarker: MarkingProps = {
            selected: true,
            inactive: true,
            selectedColor: colors.secondaryColor,
            selectedTextColor: colors.pending,
        };
        const dateForMonth = new Date(timeStamp);
        const getTotalDays = daysInMonth(
            dateForMonth.getMonth(),
            dateForMonth.getFullYear(),
        );
        for (let i = 1; i <= getTotalDays; i++) {
            const tempDate = new Date(
                dateForMonth.getFullYear(),
                dateForMonth.getMonth(),
                i,
            );
            if (tempDate.getDay() === 0 || tempDate.getDay() === 6) {
                setHoliday(prevHoliday => ({
                    ...prevHoliday,
                    [CalendarUtils.getCalendarDateString(tempDate)]:
                        holidayMarker,
                }));
            }
        }
    };
    useEffect(() => {
        setHolidays(holiday);
    }, [holiday]);

    const getPrevSelectedRange = () => {
        if (formik.values.startDate) {
            setRange({
                startDate: formik.values.startDate,
                endDate: formik.values.endDate,
            });
        }
    };
    const getResonForHoliday = (day: DateData): string => {
        const companyHoliday = allCompanyHolidays?.find(
            holidayDate => holidayDate.date === day.dateString,
        );
        return companyHoliday ? companyHoliday.reason : '';
    };

    const handleDayPress = (day: DateData) => {
        const currentDate = new Date(range.startDate);
        const clickedDate = new Date(day.dateString);

        if (holidays[clickedDate.toISOString().split('T')[0]]) {
            setRange({ ...range, startDate: '' });
            showErrorToast(ErrorCodes.LEAVE_ALREADY_APPLIED);
            if (holidays[clickedDate.toISOString().split('T')[0]].marked) {
                setRange({ ...range, startDate: '' });
                showWarningToast(
                    'This day is already a holiday!',
                    `The date is marked as a ${getResonForHoliday(day)}`,
                );
                return;
            }
            return;
        }
        if (
            range.startDate &&
            !range.endDate &&
            range.startDate !== day.dateString &&
            currentDate.getTime() < clickedDate.getTime()
        ) {
            const newRange = { ...range, ...{ endDate: day.dateString } };
            setRange(newRange);
            setCompanyHolidaysForSelectedDates(range.startDate, day.dateString);
            const alreadyLeaveDateList = getAlreadyLeaveDatesForSelectedDates(
                range.startDate,
                day.dateString,
            );
            if (alreadyLeaveDateList.length === 0) {
                setRange(newRange);
            } else {
                setRange({
                    startDate: '',
                    endDate: '',
                });
                const leaveDatesText = alreadyLeaveDateList
                    .map(date => getFormattedDay(date.dateString))
                    .join(', ');

                showErrorWithInfoToast(
                    'Cannot apply extended leave over an existing leave',
                    `You already have a leave applied for ${leaveDatesText}`,
                );
            }
        } else {
            setRange({
                startDate: day.dateString,
            });
        }
    };

    const handleConfirmationPress = () => {
        if (range.startDate) {
            formik.setFieldValue('startDate', range.startDate);
            formik.setFieldValue(
                'endDate',
                range.endDate === undefined ? '' : range.endDate,
            );
            onBackPress(EmployeeModal.CHOSE_DATE_MODAL);
        } else {
            showErrorToast(ErrorCodes.APPLY_CONFIRMATION_DATE);
        }
    };

    const isLastYear =
        DateTime.now().minus({ months: 1 }).toRelativeCalendar() ===
        'last year';

    const getLastFriday = () => {
        const lastDate = DateTime.local(DateTime.now().year, 12, 31);

        if (lastDate.weekday === 7) {
            return lastDate.minus({ days: 2 }).toFormat('yyyy-MM-dd');
        }
        if (lastDate.weekday === 6) {
            return lastDate.minus({ days: 1 }).toFormat('yyyy-MM-dd');
        }

        return lastDate.toFormat('yyyy-MM-dd');
    };

    const getFirstMonday = () => {
        const firstDate = DateTime.local(DateTime.now().year, 1, 1);

        if (firstDate.weekday === 7) {
            return firstDate.plus({ days: 1 }).toFormat('yyyy-MM-dd');
        }
        if (firstDate.weekday === 6) {
            return firstDate.plus({ days: 2 }).toFormat('yyyy-MM-dd');
        }

        return firstDate.toFormat('yyyy-MM-dd');
    };
    useEffect(() => {
        getAllHolidaysForMonth(new Date().valueOf());
        getPrevSelectedRange();
    }, []);

    if (
        isLoadingAllCompanyHolidays ||
        !allCompanyHolidays ||
        isLoadingAlreadyLeaveDates ||
        !alreadyLeaveDates
    ) {
        return <SkelitonLoaderFull />;
    }
    return (
        <View>
            <Spacer height={scale.vsc8} />
            {range.startDate && (
                <>
                    <TeamAvailability
                        startDate={range.startDate ? range.startDate : ''}
                        endDate={range.endDate ? range.endDate : ''}
                        companyHolidays={companyHolidayList}
                    />
                    <Spacer height={scale.vsc8} />
                </>
            )}
            <Calendar
                testID='ChooseDateSheetBody_calendar'
                firstDay={1}
                markedDates={marked}
                markingType='dot'
                onDayPress={day => {
                    handleDayPress(day);
                }}
                enableSwipeMonths
                disableAllTouchEventsForInactiveDays
                onMonthChange={(date: DateData) => {
                    getAllHolidaysForMonth(date.timestamp);
                }}
                style={styles.calendarStyle}
                headerStyle={styles.calendarHeaderStyle}
                theme={calendarTheme}
                minDate={
                    isLastYear
                        ? getFirstMonday()
                        : DateTime.now()
                              .minus({ month: 1 })
                              .toFormat('yyyy-MM-dd')
                }
                maxDate={getLastFriday()}
                context={{ date: '' }}
            />
            <Spacer height={scale.vsc10} />
            <View style={styles.halfButtonsStyle}>
                <SelectionButton
                    label={
                        range.startDate
                            ? getCalendarDate(range.startDate)
                            : 'Start Date'
                    }
                    onPress={() => {}}
                    isSelected={!!range.startDate}
                    icon=''
                    selectedIcon=''
                    buttonStyle={styles.fullButtonStyle}
                />
                <Spacer width={scale.sc4} />
                <SelectionButton
                    label={
                        range.endDate
                            ? getCalendarDate(range.endDate)
                            : 'End Date'
                    }
                    onPress={() => {}}
                    isSelected={!!range.endDate}
                    icon=''
                    selectedIcon=''
                    buttonStyle={styles.fullButtonStyle}
                />
            </View>
            <Spacer height={scale.vsc10} />
            <ButtonDock
                primaryButton={{
                    label: 'Confirm Date',
                    onPress: handleConfirmationPress,
                }}
                secondaryButton={{
                    label: 'Cancel',
                    onPress: () => onBackPress(EmployeeModal.CHOSE_DATE_MODAL),
                }}
            />
            <Spacer height={scale.vsc10} />
        </View>
    );
};

export default ChooseDateSheetBody;
