/* eslint-disable no-plusplus */
import { DateTime } from 'luxon';

export const getFormattedDate = (date: string): DateTime => {
    const dateFormate = new Date(date);
    const dateIOS = DateTime.fromISO(dateFormate.toISOString(), {
        locale: 'en',
    });
    return dateIOS;
};

export const getFormattedDay = (date: string): string => {
    const day = getFormattedDate(date).toLocaleString({ day: 'numeric' });
    switch (Number(day)) {
        case 1:
        case 21:
            return `${day}st`;
        case 2:
        case 22:
            return `${day}nd`;
        case 3:
        case 23:
            return `${day}rd`;
        default:
            return `${day}th`;
    }
};

export const getFormattedMonth = (date: string): string => {
    const month = getFormattedDate(date).toLocaleString({ month: 'long' });
    return month;
};

export const getStartEndDate = (start: string, end: string) => {
    if (start === end) {
        return getFormattedDay(start);
    }
    return `${getFormattedDay(start)} to ${getFormattedDay(end)}`;
};

export const getGreetingsByTime = (): string => {
    const today = new Date();
    const currentHour = today.getHours();

    if (currentHour < 12) {
        return 'Good Morning!';
    }

    if (currentHour < 18) {
        return 'Good Afternoon!';
    }

    return 'Good Evening!';
};

export const getCalendarDate = (date: string): string => {
    const dateFormate = new Date(date);
    let calendarDate = DateTime.fromISO(dateFormate.toISOString()).toFormat(
        'MMM yyyy',
    );
    calendarDate = `${getFormattedDay(
        dateFormate.toDateString(),
    )} ${calendarDate}`;
    return calendarDate;
};

export const getCalendarRangeDate = (
    startDate: string,
    endDate?: string,
): string => {
    const startDateFormate = new Date(startDate);

    let calendarDate = DateTime.fromISO(
        startDateFormate.toISOString(),
    ).toFormat('MMM');

    calendarDate = `${getFormattedDay(
        startDateFormate.toDateString(),
    )} ${calendarDate}`;

    if (endDate && startDate !== endDate) {
        const endDateFormate = new Date(endDate);
        const endCalendarDate = DateTime.fromISO(
            endDateFormate.toISOString(),
        ).toFormat('MMM');
        const endDateString = `${getFormattedDay(
            endDateFormate.toDateString(),
        )} ${endCalendarDate}`;
        calendarDate = `${calendarDate} - ${endDateString}`;
    }

    return calendarDate;
};

export const getTimeAgo = (date: string) => {
    const str = `${
        DateTime.fromISO(date).toRelativeCalendar() as string
    } at ${DateTime.fromISO(date).toFormat('h:mm a')}`;

    const strArray = str.split(' ');

    const firstWord =
        strArray[0].charAt(0).toUpperCase() + strArray[0].slice(1);

    strArray.shift();
    strArray.unshift(firstWord);

    return strArray.join(' ');
};
