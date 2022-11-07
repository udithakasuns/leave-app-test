import { render } from '@testing-library/react-native';
import React from 'react';
import { StyleSheet } from 'react-native';
import theme from 'src/utils/theme';
import { Divider } from '../..';

const { colors } = theme;

const TEST_ID_CONTAINER = 'TEST_ID_CONTAINER';

const BORDER_WIDTH = 0.5;

describe('Testing divider atom', () => {
    it('renders default divider', () => {
        const { queryByTestId } = render(
            <Divider testId={TEST_ID_CONTAINER} />,
        );
        expect(queryByTestId(TEST_ID_CONTAINER)).toBeVisible();
        expect(queryByTestId(TEST_ID_CONTAINER)).toHaveStyle({
            flex: 1,
            borderWidth: StyleSheet.hairlineWidth,
            borderColor: colors.dividerColor,
        });
    });

    it('renders divider with borderWidth', () => {
        const { queryByTestId } = render(
            <Divider borderWidth={BORDER_WIDTH} testId={TEST_ID_CONTAINER} />,
        );
        expect(queryByTestId(TEST_ID_CONTAINER)).toHaveStyle({
            borderWidth: BORDER_WIDTH,
        });
    });
});
