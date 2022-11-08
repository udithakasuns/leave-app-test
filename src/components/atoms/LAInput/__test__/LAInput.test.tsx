import React from 'react';
import '@testing-library/jest-native/extend-expect';
import { fireEvent, render, screen } from '@testing-library/react-native';
import theme from 'src/utils/theme';
import LAInput from '..';

const { colors } = theme;

const LABEL = 'LABEL';
const PLACE_HOLDER = 'PLACE_HOLDER';
const VALUE = 'VALUE';
const CAPTION = 'CAPTION';
const LEFT_ICON_NAME = 'home';
const RIGHT_ICON_NAME = 'home';

const TEST_ID_LABEL = 'TEST_ID_LABEL';
const TEST_ID_INPUT_CONTAINER = 'TEST_ID_INPUT_CONTAINER';
const TEST_ID_INPUT = 'TEST_ID_INPUT';
const TEST_ID_LEFT_ICON = 'TEST_ID_LEFT_ICON';
const TEST_ID_RIGHT_ICON = 'TEST_ID_RIGHT_ICON';
const TEST_ID_CAPTION = 'TEST_ID_CAPTION';

describe('Testing input atom', () => {
    /* General Input Rendering  */
    it('renders default input with required props', () => {
        const { getByText, getByPlaceholderText, getByDisplayValue } = render(
            <LAInput label={LABEL} placeholder={PLACE_HOLDER} value={VALUE} />,
        );
        expect(getByText(LABEL)).toBeTruthy();
        expect(getByPlaceholderText(PLACE_HOLDER)).toBeTruthy();
        expect(getByDisplayValue(VALUE)).toBeTruthy();
    });

    it('renders input with left icon', () => {
        const { findByTestId } = render(
            <LAInput
                testIdLeftIcon={TEST_ID_LEFT_ICON}
                label={LABEL}
                placeholder={PLACE_HOLDER}
                value={VALUE}
                leftIconName={LEFT_ICON_NAME}
            />,
        );
        expect(findByTestId(TEST_ID_LEFT_ICON)).toBeTruthy();
    });

    it('renders input with right icon', () => {
        const { findByTestId } = render(
            <LAInput
                testIdRightIcon={TEST_ID_RIGHT_ICON}
                label={LABEL}
                placeholder={PLACE_HOLDER}
                value={VALUE}
                rightIconName={RIGHT_ICON_NAME}
            />,
        );
        expect(findByTestId(TEST_ID_RIGHT_ICON)).toBeTruthy();
    });

    it('renders input with both left & right icons', () => {
        const { findByTestId } = render(
            <LAInput
                testIdLeftIcon={TEST_ID_LEFT_ICON}
                testIdRightIcon={TEST_ID_RIGHT_ICON}
                label={LABEL}
                placeholder={PLACE_HOLDER}
                value={VALUE}
                leftIconName={LEFT_ICON_NAME}
                rightIconName={RIGHT_ICON_NAME}
            />,
        );
        expect(findByTestId(TEST_ID_LEFT_ICON)).toBeTruthy();
        expect(findByTestId(TEST_ID_RIGHT_ICON)).toBeTruthy();
    });

    it('renders input with caption', () => {
        const { queryByTestId } = render(
            <LAInput
                testIdCaption={TEST_ID_CAPTION}
                label={LABEL}
                placeholder={PLACE_HOLDER}
                value={VALUE}
                caption={CAPTION}
            />,
        );
        expect(queryByTestId(TEST_ID_CAPTION)).toHaveTextContent(CAPTION);
    });

    it('renders enabled input with all props', () => {
        render(
            <LAInput
                testIdLabel={TEST_ID_LABEL}
                testIdInputContainer={TEST_ID_INPUT_CONTAINER}
                testIdInput={TEST_ID_INPUT}
                testIdLeftIcon={TEST_ID_LEFT_ICON}
                testIdRightIcon={TEST_ID_RIGHT_ICON}
                testIdCaption={TEST_ID_CAPTION}
                label={LABEL}
                placeholder={PLACE_HOLDER}
                value={VALUE}
                leftIconName={LEFT_ICON_NAME}
                rightIconName={RIGHT_ICON_NAME}
                caption={CAPTION}
            />,
        );
    });

    it('renders disabled input with all props', () => {
        const { queryByTestId } = render(
            <LAInput
                testIdLabel={TEST_ID_LABEL}
                testIdInputContainer={TEST_ID_INPUT_CONTAINER}
                testIdInput={TEST_ID_INPUT}
                testIdLeftIcon={TEST_ID_LEFT_ICON}
                testIdRightIcon={TEST_ID_RIGHT_ICON}
                testIdCaption={TEST_ID_CAPTION}
                label={LABEL}
                placeholder={PLACE_HOLDER}
                value={VALUE}
                leftIconName={LEFT_ICON_NAME}
                rightIconName={RIGHT_ICON_NAME}
                caption={CAPTION}
                disabled
            />,
        );

        expect(queryByTestId(TEST_ID_LABEL)).toHaveStyle({
            color: colors.disabledColor,
        });
        expect(queryByTestId(TEST_ID_INPUT_CONTAINER)).toHaveStyle({
            borderColor: colors.disabledColor,
        });
        expect(queryByTestId(TEST_ID_INPUT)).toHaveStyle({
            color: colors.disabledColor,
        });
        expect(queryByTestId(TEST_ID_LEFT_ICON)).toHaveStyle({
            color: colors.disabledColor,
        });
        expect(queryByTestId(TEST_ID_RIGHT_ICON)).toHaveStyle({
            color: colors.disabledColor,
        });
        expect(queryByTestId(TEST_ID_CAPTION)).toHaveStyle({
            color: colors.disabledColor,
        });
        expect(queryByTestId(TEST_ID_INPUT)).toHaveProp('editable', false);
    });

    it('renders error input with all props', () => {
        const { queryByTestId } = render(
            <LAInput
                testIdLabel={TEST_ID_LABEL}
                testIdInputContainer={TEST_ID_INPUT_CONTAINER}
                testIdInput={TEST_ID_INPUT}
                testIdLeftIcon={TEST_ID_LEFT_ICON}
                testIdRightIcon={TEST_ID_RIGHT_ICON}
                testIdCaption={TEST_ID_CAPTION}
                label={LABEL}
                placeholder={PLACE_HOLDER}
                value={VALUE}
                leftIconName={LEFT_ICON_NAME}
                rightIconName={RIGHT_ICON_NAME}
                caption={CAPTION}
                error
            />,
        );

        expect(queryByTestId(TEST_ID_LABEL)).toHaveStyle({
            color: colors.error,
        });
        expect(queryByTestId(TEST_ID_INPUT_CONTAINER)).toHaveStyle({
            borderColor: colors.error,
            backgroundColor: colors.errorBackground,
        });
        expect(queryByTestId(TEST_ID_INPUT)).toHaveStyle({
            color: colors.error,
        });
        expect(queryByTestId(TEST_ID_LEFT_ICON)).toHaveStyle({
            color: colors.error,
        });
        expect(queryByTestId(TEST_ID_RIGHT_ICON)).toHaveStyle({
            color: colors.error,
        });
        expect(queryByTestId(TEST_ID_CAPTION)).toHaveStyle({
            color: colors.error,
        });
    });

    /* Comment Input Testing */
    it('renders comment input with required props', () => {
        const { getByText, getByPlaceholderText, getByDisplayValue } = render(
            <LAInput
                type='COMMENT'
                label={LABEL}
                placeholder={PLACE_HOLDER}
                value={VALUE}
            />,
        );
        expect(getByText(LABEL)).toBeTruthy();
        expect(getByPlaceholderText(PLACE_HOLDER)).toBeTruthy();
        expect(getByDisplayValue(VALUE)).toBeTruthy();
        expect(getByDisplayValue(VALUE)).toHaveProp('multiline', true);
    });
});
