import { render } from '@testing-library/react-native';
import React from 'react';
import theme from 'src/utils/theme';
import { Spacer } from '../..';

const { ms, mvs } = theme;

const TEST_ID_CONTAINER = 'TEST_ID_CONTAINER';

const DEFAULT_HEIGHT = 10;
const DEFAULT_WEIGHT = 10;
const DEFAULT_FACTOR = 0.5;
const TEST_HEIGHT = 20;
const TEST_WEIGHT = 20;
const TEST_FACTOR = 5;

describe('Testing spacer atom', () => {
    it('renders default spacer', () => {
        const { queryByTestId } = render(<Spacer testId={TEST_ID_CONTAINER} />);
        expect(queryByTestId(TEST_ID_CONTAINER)).toBeVisible();
        expect(queryByTestId(TEST_ID_CONTAINER)).toHaveStyle({
            marginHorizontal: ms(DEFAULT_WEIGHT, DEFAULT_FACTOR),
            marginVertical: mvs(DEFAULT_HEIGHT, DEFAULT_FACTOR),
        });
    });

    it('renders spacer with height', () => {
        const { queryByTestId } = render(
            <Spacer height={TEST_HEIGHT} testId={TEST_ID_CONTAINER} />,
        );
        expect(queryByTestId(TEST_ID_CONTAINER)).toHaveStyle({
            marginVertical: mvs(TEST_HEIGHT, DEFAULT_FACTOR),
        });
    });

    it('renders spacer with weight', () => {
        const { queryByTestId } = render(
            <Spacer width={TEST_WEIGHT} testId={TEST_ID_CONTAINER} />,
        );
        expect(queryByTestId(TEST_ID_CONTAINER)).toHaveStyle({
            marginHorizontal: ms(TEST_WEIGHT, DEFAULT_FACTOR),
        });
    });

    it('renders spacer with factor', () => {
        const { queryByTestId } = render(
            <Spacer factor={TEST_FACTOR} testId={TEST_ID_CONTAINER} />,
        );
        expect(queryByTestId(TEST_ID_CONTAINER)).toHaveStyle({
            marginVertical: mvs(DEFAULT_HEIGHT, TEST_FACTOR),
        });
    });
});
