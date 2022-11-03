import { fireEvent, render, screen } from '@testing-library/react-native';
import React from 'react';
import theme from 'src/utils/theme';
import LAHalfButton from '..';

const { colors } = theme;

const LABEL_CONTENT = 'LABEL_CONTENT';
const ICON_NAME = 'arrow-forward';
const LEFT_HALF_TITLE = 'LEFT_HALF_TITLE';
const RIGHT_HALF_TITLE = 'RIGHT_HALF_TITLE';

const TEST_ID_BUTTON = 'TEST_ID_BUTTON';
const LEFT_TEST_ID_BUTTON = 'LEFT_TEST_ID_BUTTON';
const RIGHT_TEST_ID_BUTTON = 'RIGHT_TEST_ID_BUTTON';

describe('Testing half button', () => {
    it('renders default half button', () => {
        const onPress = jest.fn();

        const { queryByTestId, queryByText } = render(
            <LAHalfButton
                testId={TEST_ID_BUTTON}
                label={LABEL_CONTENT}
                onPress={onPress}
                icon={ICON_NAME}
                isHalfSelected={false}
                halfDay={{
                    leftHalfTitle: LEFT_HALF_TITLE,
                    rightHalfTitle: RIGHT_HALF_TITLE,
                }}
            />,
        );
        expect(queryByText(LABEL_CONTENT)).toBeTruthy();
        expect(queryByTestId(TEST_ID_BUTTON)).toHaveStyle({
            backgroundColor: colors.tertiaryColor,
        });
    });

    it('renders default half button when pressed', () => {
        const onPress = jest.fn();
        const pressEventData = {
            test: 'Testing',
        };
        const { queryByTestId, queryByText } = render(
            <LAHalfButton
                testId={TEST_ID_BUTTON}
                label={LABEL_CONTENT}
                onPress={onPress}
                icon={ICON_NAME}
                isHalfSelected={false}
                halfDay={{
                    leftHalfTitle: LEFT_HALF_TITLE,
                    rightHalfTitle: RIGHT_HALF_TITLE,
                }}
            />,
        );
        expect(queryByText(LABEL_CONTENT)).toBeTruthy();
        expect(queryByTestId(TEST_ID_BUTTON)).not.toBeDisabled();
        fireEvent.press(screen.getByTestId(TEST_ID_BUTTON), pressEventData);
    });

    it('renders half button when selected', () => {
        const onPress = jest.fn();
        const pressEventData = {
            test: 'Testing',
        };
        const { queryByTestId, queryByText } = render(
            <LAHalfButton
                testIdRightButton={RIGHT_TEST_ID_BUTTON}
                testIdLeftButton={LEFT_TEST_ID_BUTTON}
                label={LABEL_CONTENT}
                onPress={onPress}
                icon={ICON_NAME}
                isHalfSelected
                halfDay={{
                    leftHalfTitle: LEFT_HALF_TITLE,
                    rightHalfTitle: RIGHT_HALF_TITLE,
                }}
            />,
        );
        expect(queryByText(RIGHT_HALF_TITLE)).toBeTruthy();
        expect(queryByText(LEFT_HALF_TITLE)).toBeTruthy();
        expect(queryByTestId(LEFT_TEST_ID_BUTTON)).toHaveStyle({
            backgroundColor: colors.tertiaryColor,
        });
        expect(queryByTestId(RIGHT_TEST_ID_BUTTON)).toHaveStyle({
            backgroundColor: colors.tertiaryColor,
        });
        expect(queryByTestId(LEFT_TEST_ID_BUTTON)).not.toBeDisabled();
        fireEvent.press(
            screen.getByTestId(LEFT_TEST_ID_BUTTON),
            pressEventData,
        );
        expect(queryByTestId(RIGHT_TEST_ID_BUTTON)).not.toBeDisabled();
        fireEvent.press(
            screen.getByTestId(RIGHT_TEST_ID_BUTTON),
            pressEventData,
        );
    });
});
