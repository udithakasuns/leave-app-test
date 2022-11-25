import { render } from '@testing-library/react-native';
import React from 'react';
import theme from 'src/utils/theme';
import { Spacer } from '../..';

const { pixel } = theme;

const TEST_ID_CONTAINER = 'TEST_ID_CONTAINER';

const DEFAULT_HEIGHT = 10;
const DEFAULT_WEIGHT = 10;
const TEST_HEIGHT = 20;
const TEST_WEIGHT = 20;

describe('Testing spacer atom', () => {
    it('renders default spacer', () => {
        const { queryByTestId } = render(<Spacer testId={TEST_ID_CONTAINER} />);
        expect(queryByTestId(TEST_ID_CONTAINER)).toBeVisible();
        expect(queryByTestId(TEST_ID_CONTAINER)).toHaveStyle({
            marginHorizontal: pixel(DEFAULT_WEIGHT * 0.8),
            marginVertical: pixel(DEFAULT_HEIGHT * 0.8),
        });
    });

    it('renders spacer with height', () => {
        const { queryByTestId } = render(
            <Spacer height={TEST_HEIGHT} testId={TEST_ID_CONTAINER} />,
        );
        expect(queryByTestId(TEST_ID_CONTAINER)).toHaveStyle({
            marginVertical: pixel(TEST_HEIGHT * 0.8),
        });
    });

    it('renders spacer with weight', () => {
        const { queryByTestId } = render(
            <Spacer width={TEST_WEIGHT} testId={TEST_ID_CONTAINER} />,
        );
        expect(queryByTestId(TEST_ID_CONTAINER)).toHaveStyle({
            marginHorizontal: pixel(TEST_WEIGHT * 0.8),
        });
    });

    it('renders spacer with factor', () => {
        const { queryByTestId } = render(<Spacer testId={TEST_ID_CONTAINER} />);
        expect(queryByTestId(TEST_ID_CONTAINER)).toHaveStyle({
            marginVertical: pixel(DEFAULT_HEIGHT * 0.8),
        });
    });
});
