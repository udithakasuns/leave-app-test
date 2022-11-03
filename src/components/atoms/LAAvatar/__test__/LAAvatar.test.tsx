/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { render } from '@testing-library/react-native';
import React from 'react';
import LAAvatar, { AvatarSize } from '..';

const TEST_ID_IMAGE = 'TEST_ID_IMAGE';

describe('Testing Avatar atom', () => {
    it('renders default avatar', () => {
        const imgSource = {
            uri: 'https://reactnative.dev/img/tiny_logo.png',
        };
        const { queryByTestId } = render(
            <LAAvatar testId={TEST_ID_IMAGE} source={imgSource} />,
        );
        expect(queryByTestId(TEST_ID_IMAGE)!.props.source).toBe(imgSource);
    });

    it('renders avatar by size small', () => {
        const imgSource = {
            uri: 'https://reactnative.dev/img/tiny_logo.png',
        };
        const size = AvatarSize.small;
        const { queryByTestId } = render(
            <LAAvatar testId={TEST_ID_IMAGE} size={size} source={imgSource} />,
        );
        expect(queryByTestId(TEST_ID_IMAGE)!.props.source).toBe(imgSource);
        expect(queryByTestId(TEST_ID_IMAGE)).toHaveStyle({
            width: size,
        });
    });

    it('renders avatar by size large', () => {
        const imgSource = {
            uri: 'https://reactnative.dev/img/tiny_logo.png',
        };
        const size = AvatarSize.large;
        const { queryByTestId } = render(
            <LAAvatar testId={TEST_ID_IMAGE} size={size} source={imgSource} />,
        );
        expect(queryByTestId(TEST_ID_IMAGE)!.props.source).toBe(imgSource);
        expect(queryByTestId(TEST_ID_IMAGE)).toHaveStyle({
            width: size,
        });
    });
});
