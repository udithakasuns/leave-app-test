import { render, fireEvent } from '@testing-library/react-native';
import React from 'react';
import theme from 'src/utils/theme';
import LAIcon, { IconSize } from '../index';

const ICON_NAME = 'check';
const ICON_COLOR = theme.colors.primaryColor;
const ICON_TEST_ID = 'iconButton';

describe('Testing text icon', () => {
    it('renders icon by default', () => {
        render(<LAIcon name={ICON_NAME} />);
    });

    it('renders icon with color', () => {
        render(<LAIcon name={ICON_NAME} color={ICON_COLOR} />);
    });

    it('renders icon with custom testID', () => {
        render(<LAIcon name={ICON_NAME} testId={ICON_TEST_ID} />);
    });

    it('renders icon with icon size', () => {
        render(<LAIcon name={ICON_NAME} size={IconSize.small} />);
    });

    it('renders icon with background enable', () => {
        render(<LAIcon name={ICON_NAME} enableBackground />);
    });

    it('renders icon with background enable & background color', () => {
        render(
            <LAIcon
                name={ICON_NAME}
                enableBackground
                backgroundColor={theme.colors.primaryColor}
            />,
        );
    });

    it('renders icon with enableBackground & xSmall icon size', () => {
        const increasePadding = 2;
        const { queryByTestId } = render(
            <LAIcon
                name={ICON_NAME}
                testId={ICON_TEST_ID}
                size={IconSize.xSmall}
                enableBackground
                increasePadding={increasePadding}
            />,
        );
        expect(queryByTestId(ICON_TEST_ID)).toHaveStyle({
            padding: increasePadding * theme.scale.sc2,
        });
    });

    it('renders icon with enableBackground & small icon size', () => {
        const increasePadding = 2;
        const { queryByTestId } = render(
            <LAIcon
                name={ICON_NAME}
                testId={ICON_TEST_ID}
                size={IconSize.small}
                enableBackground
                increasePadding={increasePadding}
            />,
        );
        expect(queryByTestId(ICON_TEST_ID)).toHaveStyle({
            padding: increasePadding * theme.scale.sc2,
        });
    });

    it('renders icon with enableBackground & medium icon size', () => {
        const increasePadding = 2;
        const { queryByTestId } = render(
            <LAIcon
                name={ICON_NAME}
                testId={ICON_TEST_ID}
                size={IconSize.medium}
                enableBackground
                increasePadding={increasePadding}
            />,
        );
        expect(queryByTestId(ICON_TEST_ID)).toHaveStyle({
            padding: increasePadding * theme.scale.sc2,
        });
    });

    it('renders icon with enableBackground & xxLarge icon size', () => {
        const increasePadding = 2;
        const { queryByTestId } = render(
            <LAIcon
                name={ICON_NAME}
                testId={ICON_TEST_ID}
                size={IconSize.xxLarge}
                enableBackground
                increasePadding={increasePadding}
            />,
        );
        expect(queryByTestId(ICON_TEST_ID)).toHaveStyle({
            padding: increasePadding * theme.scale.sc4,
        });
    });

    it('renders icon with background enable, background color & increased padding of the background', () => {
        render(
            <LAIcon
                name={ICON_NAME}
                enableBackground
                backgroundColor={theme.colors.primaryColor}
                increasePadding={2}
            />,
        );
    });

    it('renders icon  with ref value', () => {
        const mockUseRef = (obj: any) => () =>
            Object.defineProperty({}, 'current', {
                get: () => obj,
                set: () => {},
            });
        const useRef = mockUseRef({ refFunction: jest.fn() });
        render(<LAIcon name={ICON_NAME} touchableRef={useRef} />);
    });

    it('should execute icon onPress', () => {
        const onPress = jest.fn();
        const { getByTestId } = render(
            <LAIcon name={ICON_NAME} onPress={onPress} testId={ICON_TEST_ID} />,
        );
        fireEvent(getByTestId('iconButton'), 'onPress');
        expect(onPress).toHaveBeenCalledTimes(1);
    });

    it('renders icon with community library', () => {
        const { queryByTestId } = render(
            <LAIcon
                name={ICON_NAME}
                library='community'
                testId={ICON_TEST_ID}
            />,
        );
        expect(queryByTestId(ICON_TEST_ID)).toBeVisible();
        expect(queryByTestId(ICON_TEST_ID)).toHaveStyle({
            color: theme.colors.black,
        });
    });

    it('renders with all attributes and should execute icon onPress', () => {
        const onPress = jest.fn();
        const mockUseRef = (obj: any) => () =>
            Object.defineProperty({}, 'current', {
                get: () => obj,
                set: () => {},
            });
        const useRef = mockUseRef({ refFunction: jest.fn() });
        const { getByTestId } = render(
            <LAIcon
                name={ICON_NAME}
                color={ICON_COLOR}
                onPress={onPress}
                testId={ICON_TEST_ID}
                size={IconSize.xLarge}
                enableBackground
                backgroundColor={theme.colors.primaryColor}
                increasePadding={2}
                touchableRef={useRef}
            />,
        );
        fireEvent(getByTestId('iconButton'), 'onPress');
        expect(onPress).toHaveBeenCalledTimes(1);
    });
});
