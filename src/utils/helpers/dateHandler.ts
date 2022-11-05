import { DateTime } from 'luxon';

export const getFormattedDate = (date: number) => {
    const dateFormate = new Date(date);
    const dateIOS = DateTime.fromISO(dateFormate.toISOString());
    const day = dateIOS.toLocaleString({ day: 'numeric' });
    switch (Number(day)) {
        case 1:
        case 21:
            return `${day}st`;
            break;
        case 2:
        case 22:
            return `${day}nd`;
            break;
        case 3:
        case 23:
            return `${day}rd`;
            break;
        default:
            return `${day}th`;
    }
};

export const getStartEndDate = (start: number, end: number) => {
    if (start === end) {
        return getFormattedDate(start);
    }
    return `${getFormattedDate(start)} to ${getFormattedDate(end)}`;
};

export const getGreetingsByTime = () => {
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
