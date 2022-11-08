import '@testing-library/jest-native/extend-expect';
import { fireEvent, render, screen } from '@testing-library/react-native';
import React from 'react';
import theme from 'src/utils/theme';
import { StatusType } from 'src/utils/types';
import LAStatusChip from '../index';

const { colors } = theme;

const TEST_ID_CHIP = 'TEST_ID_CHIP';
const TEST_ID_CONTENT = 'TEST_ID_CONTENT';
const TEST_ID_ICON = 'TEST_ID_ICON';

const PENDING = 'Pending';
const APPROVED = 'Approved';
const DENIED = 'Denied';
const CANCELLED = 'Cancelled';
const STATUS_PENDING: StatusType = 'PENDING';
const STATUS_APPROVED: StatusType = 'APPROVED';
const STATUS_DENIED: StatusType = 'DENIED';
const STATUS_CANCELLED: StatusType = 'CANCELLED';

describe('Testing status chip molecule', () => {
    it('renders text by default', () => {
        const onPress = jest.fn();
        render(<LAStatusChip status={STATUS_PENDING} onPress={onPress} />);
        expect(screen.getByText(PENDING)).toBeTruthy();
    });

    it('renders status chip when PENDING', () => {
        const onPress = jest.fn();
        const { queryByTestId } = render(
            <LAStatusChip
                testIdContent={TEST_ID_CONTENT}
                testIdLeftIcon={TEST_ID_ICON}
                status={STATUS_PENDING}
                onPress={onPress}
            />,
        );
        expect(queryByTestId(TEST_ID_CONTENT)).not.toBeDisabled();
        expect(queryByTestId(TEST_ID_CONTENT)).toHaveTextContent(PENDING);
        expect(queryByTestId(TEST_ID_ICON)).toHaveStyle({
            color: colors.pending,
        });
    });

    it('renders status chip when APPROVED', () => {
        const onPress = jest.fn();
        const { queryByTestId } = render(
            <LAStatusChip
                testIdContent={TEST_ID_CONTENT}
                testIdLeftIcon={TEST_ID_ICON}
                status={STATUS_APPROVED}
                onPress={onPress}
            />,
        );
        expect(queryByTestId(TEST_ID_CONTENT)).not.toBeDisabled();
        expect(queryByTestId(TEST_ID_CONTENT)).toHaveTextContent(APPROVED);
        expect(queryByTestId(TEST_ID_ICON)).toHaveStyle({
            color: colors.approved,
        });
    });

    it('renders status chip when DENIED', () => {
        const onPress = jest.fn();
        const { queryByTestId } = render(
            <LAStatusChip
                testIdContent={TEST_ID_CONTENT}
                testIdLeftIcon={TEST_ID_ICON}
                status={STATUS_DENIED}
                onPress={onPress}
            />,
        );
        expect(queryByTestId(TEST_ID_CONTENT)).not.toBeDisabled();
        expect(queryByTestId(TEST_ID_CONTENT)).toHaveTextContent(DENIED);
        expect(queryByTestId(TEST_ID_ICON)).toHaveStyle({
            color: colors.error,
        });
    });

    it('renders status chip when CANCELLED', () => {
        const onPress = jest.fn();
        const { queryByTestId } = render(
            <LAStatusChip
                testIdContent={TEST_ID_CONTENT}
                testIdLeftIcon={TEST_ID_ICON}
                status={STATUS_CANCELLED}
                onPress={onPress}
            />,
        );
        expect(queryByTestId(TEST_ID_CONTENT)).not.toBeDisabled();
        expect(queryByTestId(TEST_ID_CONTENT)).toHaveTextContent(CANCELLED);
        expect(queryByTestId(TEST_ID_ICON)).toHaveStyle({
            color: colors.black,
        });
    });

    it('renders status chip on press', () => {
        const onPress = jest.fn();
        const pressEventData = {
            test: 'Testing',
        };
        const { queryByTestId } = render(
            <LAStatusChip
                testId={TEST_ID_CHIP}
                status={STATUS_PENDING}
                onPress={onPress}
            />,
        );
        expect(queryByTestId(TEST_ID_CHIP)).not.toBeDisabled();
        fireEvent.press(screen.getByTestId(TEST_ID_CHIP), pressEventData);
    });
});
