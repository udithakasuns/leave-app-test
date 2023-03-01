/* eslint-disable no-plusplus */
import { useQuery } from '@tanstack/react-query';
import { FormikProps } from 'formik';
import { DateTime } from 'luxon';
import React, { useEffect, useMemo, useState } from 'react';
import { View } from 'react-native';
import { Calendar, CalendarUtils, DateData } from 'react-native-calendars';
import { MarkingProps } from 'react-native-calendars/src/calendar/day/marking';
import { MarkedDates } from 'react-native-calendars/src/types';
import { Spacer } from 'src/components/atoms';
import { ButtonDock, SelectionButton } from 'src/components/molecules';
import { TeamAvailabilityFilterHeader } from 'src/components/organisms';
import {
    getHttpTeamAvailability,
    getHttpTeamAvailabilityDateRange,
    getHttpTeamByUser,
} from 'src/services/http';
import { useUserStore } from 'src/store';
import { showErrorToast } from 'src/utils/alerts';
import {
    getCalendarDate,
    getFormattedDay,
} from 'src/utils/helpers/dateHandler';
import { ErrorCodes } from 'src/utils/helpers/errorCodes';
import theme from 'src/utils/theme';
import { ApplyFormValues, EmployeeModal, TestProps } from 'src/utils/types';
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
    onPressTeamAvailibility: (
        startDate: string,
        endDate: string,
        awayEmployeeDetails: object[],
    ) => void;
}

const ChooseDateSheetBody = ({
    formik,
    onBackPress,
    onPressTeamAvailibility,
}: Props) => {
    const [range, setRange] = useState<{
        startDate: string;
        endDate?: string;
    }>({ startDate: '', endDate: '' });
    const [holidays, setHolidays] = useState<MarkedDates>({});
    const [enabled, setEnabled] = useState<boolean>(false);
    const [enabledForRange, setEnabledForRange] = useState<boolean>(false);
    const [enabledDetailsForRange, setEnabledDetailsForRange] =
        useState<boolean>(false);
    const [onlineCount, setOnlineCount] = useState<number>(0);
    const [onLeaveCount, setOnLeaveCount] = useState<number>(0);
    const [awayMembersImageList, setAwayMembersImageList] = useState<string[]>(
        [],
    );
    const [awayMembersNameList, setAwayMembersNameList] = useState<string[]>(
        [],
    );
    const [awayMembersDetailsList, setAwayMembersDetailsList] = useState<
        object[]
    >([]);
    const [employeeTeamList, setEmployeeTeamList] = useState<DropDownList[]>(
        [],
    );
    const [employeeTeamIdList, setEmployeeTeamIdList] = useState<number[]>([]);

    const {
        user: { userId },
    } = useUserStore();
    const teamChips: {
        chipId: number;
        content: string;
        chipInfo: string;
        availableCount: number;
    }[] = [
        {
            chipId: 1,
            content: 'Design',
            chipInfo: 'Design',
            availableCount: 10,
        },
        {
            chipId: 2,
            content: 'BA',
            chipInfo: 'BA',
            availableCount: 15,
        },
        {
            chipId: 3,
            content: 'Project Mgt',
            chipInfo: 'Project Mgt',
            availableCount: 8,
        },
    ];
    // useQuery(['employeeTeams'], () => getHttpTeamByUser(userId), {
    //     onSuccess: data => {
    //         setEmployeeTeamList(data);
    //         data.map((item: { teamId: number }, index: any) =>
    //             employeeTeamIdList.push(item.teamId),
    //         );
    //     },
    // });
    // useQuery(
    //     ['employeeOnLeaveRequests'],
    //     () =>
    //         getHttpTeamAvailability({
    //             date: range.startDate,
    //             teamIds: employeeTeamIdList,
    //         }),
    //     {
    //         enabled,
    //         onSuccess: data => {
    //             setOnlineCount(data.onlineCount);
    //             setAwayMembersImageList(data.imageList);
    //             setAwayMembersNameList(data.nameList);
    //             setOnLeaveCount(data.onLeaveCount);
    //             setEnabled(state => !state);
    //         },
    //     },
    // );

    // useQuery(
    //     ['employeeOnLeaveRequestsForRange'],
    //     () =>
    //         getHttpTeamAvailabilityDateRange({
    //             startDate: range.startDate,
    //             endDate: range.endDate,
    //             teamId: 4,
    //             imageOnly: true,
    //         }),
    //     {
    //         enabled: enabledForRange,
    //         onSuccess: data => {
    //             setOnlineCount(data.onlineCount);
    //             // setAwayMembersImageList(data.nameList);
    //             // setAwayMembersNameList(data.imageList);
    //             setOnLeaveCount(data.onLeaveCount);
    //             setEnabledForRange(state => !state);
    //         },
    //     },
    // );
    // useQuery(
    //     ['employeeOnLeaveDetailsForRange'],
    //     () =>
    //         getHttpTeamAvailabilityDateRange({
    //             startDate: range.startDate,
    //             endDate: range.endDate,
    //             teamId: 4,
    //         }),
    //     {
    //         enabled: enabledForRange,
    //         onSuccess: data => {
    //             setAwayMembersDetailsList(data);
    //             setEnabledDetailsForRange(state => !state);
    //         },
    //     },
    // );
    const getHttpTeamAvailabilityDetails = () => {
        if (range.startDate && !range.endDate) {
            setEnabled(state => !state);
            // eslint-disable-next-line no-dupe-else-if
        } else if (range.startDate && range.endDate) {
            setEnabledForRange(state => !state);
        }
    };
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
        getHttpTeamAvailabilityDetails();
        return tempMarked;
    }, [range, holidays]);

    const daysInMonth = (month: number, year: number) =>
        new Date(year, month, 0).getDate();

    const getAllHolidaysForMonth = (timeStamp: number) => {
        const holidayMarker: MarkingProps = {
            selected: true,
            selectedColor: colors.secondaryColor,
            selectedTextColor: colors.pending,
        };
        const dateForMonth = new Date(timeStamp);
        const getTotalDays = daysInMonth(
            dateForMonth.getMonth(),
            dateForMonth.getFullYear(),
        );
        const holiday: MarkedDates = {};
        holiday[CalendarUtils.getCalendarDateString(dateForMonth)] = {
            selectedColor: colors.secondaryBackground,
            selectedTextColor: colors.black,
        };
        for (let i = 1; i <= getTotalDays; i++) {
            const tempDate = new Date(
                dateForMonth.getFullYear(),
                dateForMonth.getMonth(),
                i,
            );
            if (tempDate.getDay() === 0 || tempDate.getDay() === 6) {
                holiday[CalendarUtils.getCalendarDateString(tempDate)] =
                    holidayMarker;
            }
        }
        setHolidays(holiday);
    };

    const getPrevSelectedRange = () => {
        if (formik.values.startDate) {
            setRange({
                startDate: formik.values.startDate,
                endDate: formik.values.endDate,
            });
        }
    };

    const handleDayPress = (day: DateData) => {
        const currentDate = new Date(range.startDate);
        const clickedDate = new Date(day.dateString);
        if (clickedDate.getDay() === 0 || clickedDate.getDay() === 6) {
            setRange({
                startDate: '',
            });
            showErrorToast(ErrorCodes.ERROR_OCCURRED);
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

    return (
        <View>
            <Spacer height={scale.vsc8} />
            {range.startDate ? (
                <>
                    <TeamAvailability
                        startDate={range.startDate ? range.startDate : ''}
                        endDate={range.endDate ? range.endDate : ''}
                    />
                    <Spacer height={scale.vsc8} />
                </>
            ) : null}
            <Calendar
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
