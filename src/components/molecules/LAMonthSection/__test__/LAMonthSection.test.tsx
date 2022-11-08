import { render } from '@testing-library/react-native';
import React from 'react';
import theme from 'src/utils/theme';
import LAMonthSection from '..';

const { colors } = theme;

const TEST_ID_TEXT = 'TEST_ID_TEXT';
const TEST_ID_DIVIDER = 'TEST_ID_DIVIDER';

const MONTH = 'January';

describe('Testing month section molecule', () => {
    it('renders default month section', () => {
        const { queryByTestId } = render(
            <LAMonthSection
                testId={TEST_ID_DIVIDER}
                testIdContent={TEST_ID_TEXT}
                month={MONTH}
            />,
        );
        expect(queryByTestId(TEST_ID_TEXT)).toHaveTextContent(MONTH);
        expect(queryByTestId(TEST_ID_DIVIDER)).toBeVisible();
        expect(queryByTestId(TEST_ID_TEXT)).toHaveStyle({
            color: colors.primaryGrayLabel,
        });
    });
});
