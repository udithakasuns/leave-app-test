import React from 'react';
import '@testing-library/jest-native/extend-expect';
import { fireEvent, render, screen } from '@testing-library/react-native';
import theme from 'src/utils/theme';
import LAChip from '..';

const { colors, scale } = theme;

const TEXT_CONTENT = 'TEXT_CONTENT';
const UNICODE_CONTENT = '🌴';
const LEFT_ICON_NAME = 'home';
const RIGHT_ICON_NAME = 'home';

const TEST_ID_CONTAINER = 'TEST_ID_CONTAINER';
const TEST_ID_CONTENT = 'TEST_ID_CONTENT';
const TEST_ID_LEFT_ICON = 'TEST_ID_LEFT_ICON';
const TEST_ID_RIGHT_ICON = 'TEST_ID_RIGHT_ICON';
const TEST_ID_LEFT_PRESSABLE = 'TEST_ID_LEFT_PRESSABLE';
const TEST_ID_RIGHT_PRESSABLE = 'TEST_ID_RIGHT_PRESSABLE';

describe('Testing chip atom', () => {
    it('renders default chip', () => {
        const { queryByTestId, queryByText } = render(
            <LAChip
                testIdcontainer={TEST_ID_CONTAINER}
                testIdContent={TEST_ID_CONTENT}
                content={TEXT_CONTENT}
            />,
        );
        expect(queryByText(TEXT_CONTENT)).toBeTruthy();
        expect(queryByTestId(TEST_ID_CONTENT)).toHaveStyle({
            color: colors.gray600,
        });

        expect(queryByTestId(TEST_ID_CONTAINER)).toHaveStyle({
            borderWidth: 0,
            borderColor: 'transparent',
            backgroundColor: colors.tertiaryColor,
        });
    });

    it('renders chip with text content', () => {
        const { queryByText } = render(<LAChip content={TEXT_CONTENT} />);
        expect(queryByText(TEXT_CONTENT)).toBeTruthy();
    });

    it('renders chip with unicode content', () => {
        const { queryByText } = render(<LAChip content={UNICODE_CONTENT} />);
        expect(queryByText(UNICODE_CONTENT)).toBeTruthy();
    });

    it('renders chip with both unicode and text content', () => {
        const content = `${UNICODE_CONTENT} ${TEXT_CONTENT}`;
        const { queryByTestId } = render(
            <LAChip testIdContent={TEST_ID_CONTENT} content={content} />,
        );
        expect(queryByTestId(TEST_ID_CONTENT)).toHaveTextContent(content);
    });

    it('renders chip with outline(Default color)', () => {
        const { queryByTestId } = render(
            <LAChip
                outline
                testIdcontainer={TEST_ID_CONTAINER}
                content={TEXT_CONTENT}
            />,
        );
        expect(queryByTestId(TEST_ID_CONTAINER)).toHaveStyle({
            borderWidth: scale.sc1,
            borderColor: colors.disabledColor,
        });
    });

    it('renders chip with outline by given color', () => {
        const outlineColor = colors.primaryColor;
        const { queryByTestId } = render(
            <LAChip
                outline
                outlineColor={outlineColor}
                testIdcontainer={TEST_ID_CONTAINER}
                content={TEXT_CONTENT}
            />,
        );
        expect(queryByTestId(TEST_ID_CONTAINER)).toHaveStyle({
            borderWidth: scale.sc1,
            borderColor: outlineColor,
        });
    });

    it('renders default chip with outline color', () => {
        /* 
            If the outline color is given, but outline prop is not given 
            the boarder should't be displayed
        */
        const outlineColor = colors.primaryColor;
        const { queryByTestId } = render(
            <LAChip
                outlineColor={outlineColor}
                testIdcontainer={TEST_ID_CONTAINER}
                content={TEXT_CONTENT}
            />,
        );
        expect(queryByTestId(TEST_ID_CONTAINER)).toHaveStyle({
            borderWidth: 0,
            borderColor: 'transparent',
        });
    });

    it('renders chip with given background color', () => {
        const backgroundColor = colors.primaryColor;
        const { queryByTestId } = render(
            <LAChip
                testIdcontainer={TEST_ID_CONTAINER}
                content={TEXT_CONTENT}
                backgroundColor={backgroundColor}
            />,
        );
        expect(queryByTestId(TEST_ID_CONTAINER)).toHaveStyle({
            backgroundColor,
        });
    });

    it('renders chip with left icon', () => {
        const { queryByTestId } = render(
            <LAChip
                testIdLeftIcon={TEST_ID_LEFT_ICON}
                content={TEXT_CONTENT}
                leftIconName={LEFT_ICON_NAME}
            />,
        );
        expect(queryByTestId(TEST_ID_LEFT_ICON)).toBeTruthy();
    });

    it('renders chip with right icon', () => {
        const { queryByTestId } = render(
            <LAChip
                testIdRightIcon={TEST_ID_RIGHT_ICON}
                content={TEXT_CONTENT}
                rightIconName={RIGHT_ICON_NAME}
            />,
        );
        expect(queryByTestId(TEST_ID_RIGHT_ICON)).toBeTruthy();
    });

    it('renders chip with both left & right icon', () => {
        const { queryByTestId } = render(
            <LAChip
                testIdLeftIcon={TEST_ID_LEFT_ICON}
                testIdRightIcon={TEST_ID_RIGHT_ICON}
                content={TEXT_CONTENT}
                leftIconName={LEFT_ICON_NAME}
                rightIconName={RIGHT_ICON_NAME}
            />,
        );
        expect(queryByTestId(TEST_ID_LEFT_ICON)).toBeTruthy();
        expect(queryByTestId(TEST_ID_RIGHT_ICON)).toBeTruthy();
    });

    it('renders chip and press left icon', () => {
        const onPressLeft = jest.fn();
        const pressEventData = {
            test: 'Testing',
        };
        const { queryByTestId } = render(
            <LAChip
                testIdLeftPressable={TEST_ID_LEFT_PRESSABLE}
                testIdLeftIcon={TEST_ID_LEFT_ICON}
                content={TEXT_CONTENT}
                leftIconName={LEFT_ICON_NAME}
                onPressLeft={onPressLeft}
            />,
        );
        expect(queryByTestId(TEST_ID_LEFT_ICON)).toBeTruthy();
        expect(queryByTestId(TEST_ID_LEFT_PRESSABLE)).not.toBeDisabled();
        fireEvent.press(screen.getByTestId(TEST_ID_LEFT_ICON), pressEventData);
        expect(onPressLeft).toHaveBeenCalledWith(pressEventData);
    });

    it('renders chip and press right icon', () => {
        const onPressRight = jest.fn();
        const pressEventData = {
            test: 'Testing',
        };
        const { queryByTestId } = render(
            <LAChip
                testIdRightPressable={TEST_ID_RIGHT_PRESSABLE}
                testIdRightIcon={TEST_ID_RIGHT_ICON}
                content={TEXT_CONTENT}
                rightIconName={RIGHT_ICON_NAME}
                onPressRight={onPressRight}
            />,
        );
        expect(queryByTestId(TEST_ID_RIGHT_ICON)).toBeTruthy();
        expect(queryByTestId(TEST_ID_RIGHT_PRESSABLE)).not.toBeDisabled();
        fireEvent.press(screen.getByTestId(TEST_ID_RIGHT_ICON), pressEventData);
        expect(onPressRight).toHaveBeenCalledWith(pressEventData);
    });

    it('renders disable chip and test left press event', () => {
        const onPressLeft = jest.fn();
        const pressEventData = {
            test: 'Testing',
        };
        const { queryByTestId } = render(
            <LAChip
                testIdLeftPressable={TEST_ID_LEFT_PRESSABLE}
                testIdLeftIcon={TEST_ID_LEFT_ICON}
                content={TEXT_CONTENT}
                leftIconName={LEFT_ICON_NAME}
                onPressLeft={onPressLeft}
                disabled
            />,
        );
        expect(queryByTestId(TEST_ID_LEFT_ICON)).toBeTruthy();
        expect(queryByTestId(TEST_ID_LEFT_PRESSABLE)).toBeDisabled();
        fireEvent.press(screen.getByTestId(TEST_ID_LEFT_ICON), pressEventData);
        expect(onPressLeft).not.toHaveBeenCalledWith(pressEventData);
    });

    it('renders disable chip and test right press event', () => {
        const onPressRight = jest.fn();
        const pressEventData = {
            test: 'Testing',
        };
        const { queryByTestId } = render(
            <LAChip
                testIdRightPressable={TEST_ID_RIGHT_PRESSABLE}
                testIdRightIcon={TEST_ID_RIGHT_ICON}
                content={TEXT_CONTENT}
                rightIconName={RIGHT_ICON_NAME}
                onPressRight={onPressRight}
                disabled
            />,
        );
        expect(queryByTestId(TEST_ID_RIGHT_ICON)).toBeTruthy();
        expect(queryByTestId(TEST_ID_RIGHT_PRESSABLE)).toBeDisabled();
        fireEvent.press(screen.getByTestId(TEST_ID_RIGHT_ICON), pressEventData);
        expect(onPressRight).not.toHaveBeenCalledWith(pressEventData);
    });
});
