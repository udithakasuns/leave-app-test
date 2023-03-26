/* eslint-disable */

import { element } from 'detox';
import moment from 'moment';
import { expect as jestExpect } from '@jest/globals';

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

export const getElementCount = async (locator: Detox.NativeMatcher) => {
    const attributes = await element(locator).getAttributes();

    /* 
        If the query matches multiple elements, the attributes of all 
        matched elements is returned as an array of objects under the
        elements key.
    */
    if ("elements" in attributes) {
        return attributes.elements.length;
    } else {
        return 1;
    }
};

export const getFormattedDate = (date: Date, format: string) => moment(date).format(format);

export const isWeekDay = (date: moment.Moment) => date.day() === 0 || date.day() === 6

export const expectElementToHaveText = async (sourceElement: Detox.NativeMatcher, text: string) => {
    try {
        // @ts-ignore
        await expect(element(sourceElement)).toHaveText(text)
    } catch (error) {
        throw new Error('Element does not have text')
    }
}

export const expectElementToContainText = async (sourceElement: Detox.NativeMatcher, text: string) => {
    try {
        const attributes = await element(
            sourceElement
        ).getAttributes();
        // @ts-ignore
        jestExpect(attributes.text).toContain(text);
    } catch (error) {
        throw new Error('Element does not contain text')
    }
}