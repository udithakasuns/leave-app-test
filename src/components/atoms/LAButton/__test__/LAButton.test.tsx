import { fireEvent, render, screen } from '@testing-library/react-native';
import React from 'react';
import theme from 'src/utils/theme';
import LAButton from '..';

const { fontSize, fontFamily } = theme;

const BUTTON_LABEL = 'BUTTON';
const BUTTON_LABEL_TYPE = 'ParaLG';

const TEST_ID_BUTTON = 'TEST_ID_BUTTON';
const TEST_ID_BUTTON_LABEL = 'TEST_ID_BUTTON_LABEL';
const TEST_ID_BUTTON_LOADING = 'TEST_ID_BUTTON_LOADING';

describe('Testing button atom', () => {
    it('renders button required props', () => {
        const onPress = jest.fn();
        const { getByText } = render(
            <LAButton label={BUTTON_LABEL} onPress={onPress} />,
        );
        expect(getByText(BUTTON_LABEL)).toBeTruthy();
    });

    it('renders button with label type', () => {
        const onPress = jest.fn();
        const { queryByTestId, getByText } = render(
            <LAButton
                testID={TEST_ID_BUTTON}
                testIdLabel={TEST_ID_BUTTON_LABEL}
                labelType={BUTTON_LABEL_TYPE}
                label={BUTTON_LABEL}
                onPress={onPress}
            />,
        );
        expect(getByText(BUTTON_LABEL)).toBeTruthy();
        expect(queryByTestId(TEST_ID_BUTTON_LABEL)).toHaveStyle({
            fontSize: fontSize.fs14,
            fontFamily: fontFamily.poppins400,
        });
    });

    it('renders button with size large', () => {
        const onPress = jest.fn();
        const BUTTON_SIZE = 'large';
        const { queryByTestId, getByText } = render(
            <LAButton
                testID={TEST_ID_BUTTON}
                testIdLabel={TEST_ID_BUTTON_LABEL}
                labelType={BUTTON_LABEL_TYPE}
                label={BUTTON_LABEL}
                size={BUTTON_SIZE}
                onPress={onPress}
            />,
        );
        expect(getByText(BUTTON_LABEL)).toBeTruthy();
        expect(queryByTestId(TEST_ID_BUTTON)).toHaveStyle({
            paddingVertical: theme.scale.vsc16,
        });
    });

    it('renders button with size medium', () => {
        const onPress = jest.fn();
        const BUTTON_SIZE = 'medium';
        const { queryByTestId, getByText } = render(
            <LAButton
                testID={TEST_ID_BUTTON}
                testIdLabel={TEST_ID_BUTTON_LABEL}
                labelType={BUTTON_LABEL_TYPE}
                label={BUTTON_LABEL}
                size={BUTTON_SIZE}
                onPress={onPress}
            />,
        );
        expect(getByText(BUTTON_LABEL)).toBeTruthy();
        expect(queryByTestId(TEST_ID_BUTTON)).toHaveStyle({
            paddingVertical: theme.scale.vsc12,
        });
    });

    it('renders button with size small', () => {
        const onPress = jest.fn();
        const BUTTON_SIZE = 'small';
        const { queryByTestId, getByText } = render(
            <LAButton
                testID={TEST_ID_BUTTON}
                testIdLabel={TEST_ID_BUTTON_LABEL}
                labelType={BUTTON_LABEL_TYPE}
                label={BUTTON_LABEL}
                size={BUTTON_SIZE}
                onPress={onPress}
            />,
        );
        expect(getByText(BUTTON_LABEL)).toBeTruthy();
        expect(queryByTestId(TEST_ID_BUTTON)).toHaveStyle({
            paddingVertical: theme.scale.vsc10,
        });
    });

    it('renders button with contained mode', () => {
        const onPress = jest.fn();
        const BUTTON_MODE = 'contained';
        const { queryByTestId, getByText } = render(
            <LAButton
                testID={TEST_ID_BUTTON}
                testIdLabel={TEST_ID_BUTTON_LABEL}
                labelType={BUTTON_LABEL_TYPE}
                label={BUTTON_LABEL}
                mode={BUTTON_MODE}
                onPress={onPress}
            />,
        );
        expect(getByText(BUTTON_LABEL)).toBeTruthy();
        expect(queryByTestId(TEST_ID_BUTTON_LABEL)).toHaveStyle({
            color: theme.colors.black,
        });
        expect(queryByTestId(TEST_ID_BUTTON)).toHaveStyle({
            backgroundColor: theme.colors.primaryColor,
        });
    });

    it('renders button with contained-gray mode', () => {
        const onPress = jest.fn();
        const BUTTON_MODE = 'contained-gray';
        const { queryByTestId, getByText } = render(
            <LAButton
                testID={TEST_ID_BUTTON}
                testIdLabel={TEST_ID_BUTTON_LABEL}
                labelType={BUTTON_LABEL_TYPE}
                label={BUTTON_LABEL}
                mode={BUTTON_MODE}
                onPress={onPress}
            />,
        );
        expect(getByText(BUTTON_LABEL)).toBeTruthy();
        expect(queryByTestId(TEST_ID_BUTTON_LABEL)).toHaveStyle({
            color: theme.colors.tertiaryLabel,
        });
        expect(queryByTestId(TEST_ID_BUTTON)).toHaveStyle({
            backgroundColor: theme.colors.tertiaryColor,
        });
    });

    it('renders button with outlined mode', () => {
        const onPress = jest.fn();
        const BUTTON_MODE = 'outlined';
        const { queryByTestId, getByText } = render(
            <LAButton
                testID={TEST_ID_BUTTON}
                testIdLabel={TEST_ID_BUTTON_LABEL}
                labelType={BUTTON_LABEL_TYPE}
                label={BUTTON_LABEL}
                mode={BUTTON_MODE}
                onPress={onPress}
            />,
        );
        expect(getByText(BUTTON_LABEL)).toBeTruthy();
        expect(queryByTestId(TEST_ID_BUTTON_LABEL)).toHaveStyle({
            color: theme.colors.secondaryLabel,
        });
        expect(queryByTestId(TEST_ID_BUTTON)).toHaveStyle({
            borderColor: theme.colors.primaryColor,
        });
    });

    it('renders button with outlined-error mode', () => {
        const onPress = jest.fn();
        const BUTTON_MODE = 'outlined-error';
        const { queryByTestId, getByText } = render(
            <LAButton
                testID={TEST_ID_BUTTON}
                testIdLabel={TEST_ID_BUTTON_LABEL}
                labelType={BUTTON_LABEL_TYPE}
                label={BUTTON_LABEL}
                mode={BUTTON_MODE}
                onPress={onPress}
            />,
        );
        expect(getByText(BUTTON_LABEL)).toBeTruthy();
        expect(queryByTestId(TEST_ID_BUTTON_LABEL)).toHaveStyle({
            color: theme.colors.errorLabel,
        });
        expect(queryByTestId(TEST_ID_BUTTON)).toHaveStyle({
            backgroundColor: theme.colors.errorBackground,
            borderColor: theme.colors.errorLabel,
        });
    });

    it('renders button with loading', () => {
        const onPress = jest.fn();
        const { queryByTestId } = render(
            <LAButton
                loading
                testID={TEST_ID_BUTTON}
                testIdLoading={TEST_ID_BUTTON_LOADING}
                labelType={BUTTON_LABEL_TYPE}
                label={BUTTON_LABEL}
                onPress={onPress}
            />,
        );
        expect(queryByTestId(TEST_ID_BUTTON_LOADING)).toBeTruthy();
    });

    it('renders button on press', () => {
        const onPress = jest.fn();
        const pressEventData = {
            test: 'Testing',
        };
        const { queryByTestId } = render(
            <LAButton
                testID={TEST_ID_BUTTON}
                label={BUTTON_LABEL}
                onPress={onPress}
            />,
        );
        expect(queryByTestId(TEST_ID_BUTTON)).not.toBeDisabled();
        fireEvent.press(screen.getByTestId(TEST_ID_BUTTON), pressEventData);
        expect(onPress).toHaveBeenCalledWith(pressEventData);
    });
});
