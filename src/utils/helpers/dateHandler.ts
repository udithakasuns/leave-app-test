import { DateTime } from 'luxon';

export const getFormattedDate = (date: number): DateTime => {
    const dateFormate = new Date(date);
    const dateIOS = DateTime.fromISO(dateFormate.toISOString());
    return dateIOS;
};

export const getFormattedDay = (date: number): string => {
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

export const getFormattedMonth = (date: number): string => {
    const month = getFormattedDate(date).toLocaleString({ month: 'long' });
    return month;
};

export const getStartEndDate = (start: number, end: number) => {
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
