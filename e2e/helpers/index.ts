/* eslint-disable */

import { element } from 'detox';

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
