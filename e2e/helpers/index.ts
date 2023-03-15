/* eslint-disable */

import { element } from 'detox';
import moment from 'moment';

export const isElementVisible = async (locator: Detox.NativeMatcher) => {
    try {
        const attributes = (await element(
            locator,
        ).getAttributes()) as Detox.ElementAttributes;
        return attributes.visible ?? false;
    } catch (error) {
        return false;
    }
};

export const getFormattedDate = (date: Date, format:string) => moment(date).format(format);

export const isWeekDay = (date: moment.Moment) => date.day() === 0 || date.day() === 6