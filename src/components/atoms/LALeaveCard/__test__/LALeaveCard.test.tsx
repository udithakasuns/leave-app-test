import { render } from '@testing-library/react-native';
import React from 'react';
import theme from 'src/utils/theme';
import LALeaveCard from '..';

const { colors } = theme;

const TAKE_LEAVES_CONTENT = '2';
const TOTAL_LEAVES_CONTENT = '10';
const UNICODE_CONTENT = '🌴';
const LEAVE_TYPE_CONTENT = 'Causal';

const TEST_ID_CONTAINER = 'TEST_ID_CONTAINER';

describe('Testing Leave Card atom', () => {
    it('renders default leave card', () => {
        const { queryByTestId, queryByText } = render(
            <LALeaveCard
                testId={TEST_ID_CONTAINER}
                takenLeaves={TAKE_LEAVES_CONTENT}
                totalLeaves={TOTAL_LEAVES_CONTENT}
                uniCodeIcon={UNICODE_CONTENT}
                leaveType={LEAVE_TYPE_CONTENT}
            />,
        );
        expect(queryByText(TAKE_LEAVES_CONTENT)).toBeTruthy();
        expect(queryByText(`/${TOTAL_LEAVES_CONTENT}`)).toBeTruthy();
        expect(queryByText(LEAVE_TYPE_CONTENT)).toBeTruthy();
        expect(queryByText(UNICODE_CONTENT)).toBeTruthy();
        expect(queryByTestId(TEST_ID_CONTAINER)).toHaveStyle({
            backgroundColor: colors.tertiaryColor,
            borderWidth: 0,
        });
    });

    it('renders leave card is selected', () => {
        const { queryByTestId, queryByText } = render(
            <LALeaveCard
                isSelected
                testId={TEST_ID_CONTAINER}
                takenLeaves={TAKE_LEAVES_CONTENT}
                totalLeaves={TOTAL_LEAVES_CONTENT}
                uniCodeIcon={UNICODE_CONTENT}
                leaveType={LEAVE_TYPE_CONTENT}
            />,
        );
        expect(queryByText(TAKE_LEAVES_CONTENT)).toBeTruthy();
        expect(queryByText(`/${TOTAL_LEAVES_CONTENT}`)).toBeTruthy();
        expect(queryByText(LEAVE_TYPE_CONTENT)).toBeTruthy();
        expect(queryByText(UNICODE_CONTENT)).toBeTruthy();
        expect(queryByTestId(TEST_ID_CONTAINER)).toHaveStyle({
            backgroundColor: colors.secondaryBackground,
            borderWidth: 1,
        });
    });
});
