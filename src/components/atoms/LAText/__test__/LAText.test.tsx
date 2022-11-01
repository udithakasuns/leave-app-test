import '@testing-library/jest-native/extend-expect';
import { fireEvent, render, screen } from '@testing-library/react-native';
import React from 'react';
import LAText from '../index';
import { styles } from '../styles';

const CHILD = 'Testing';
const TEST_ID = 'text';

describe('Testing text atom', () => {
    it('renders text by default', () => {
        render(<LAText>{CHILD}</LAText>);
        expect(screen.getByText('Testing')).toBeTruthy();
    });

    it('renders text with type H1', () => {
        const { getByTestId } = render(
            <LAText testID={TEST_ID} type='H1'>
                {CHILD}
            </LAText>,
        );
        expect(getByTestId('text')).toHaveStyle(styles.H1Text);
    });

    it('renders text with type H2', () => {
        const { getByTestId } = render(
            <LAText testID={TEST_ID} type='H2'>
                {CHILD}
            </LAText>,
        );
        expect(getByTestId('text')).toHaveStyle(styles.H2Text);
    });

    it('renders text with type H3', () => {
        const { getByTestId } = render(
            <LAText testID={TEST_ID} type='H3'>
                {CHILD}
            </LAText>,
        );
        expect(getByTestId('text')).toHaveStyle(styles.H3Text);
    });

    it('renders text with type H4', () => {
        const { getByTestId } = render(
            <LAText testID={TEST_ID} type='H4'>
                {CHILD}
            </LAText>,
        );
        expect(getByTestId('text')).toHaveStyle(styles.H4Text);
    });

    it('renders text with type H5', () => {
        const { getByTestId } = render(
            <LAText testID={TEST_ID} type='H5'>
                {CHILD}
            </LAText>,
        );
        expect(getByTestId('text')).toHaveStyle(styles.H5Text);
    });

    it('renders text with type H6', () => {
        const { getByTestId } = render(
            <LAText testID={TEST_ID} type='H6'>
                {CHILD}
            </LAText>,
        );
        expect(getByTestId('text')).toHaveStyle(styles.H6Text);
    });

    it('renders text with type body1', () => {
        const { getByTestId } = render(
            <LAText testID={TEST_ID} type='body1'>
                {CHILD}
            </LAText>,
        );
        expect(getByTestId('text')).toHaveStyle(styles.body1Text);
    });

    it('renders text with type body2', () => {
        const { getByTestId } = render(
            <LAText testID={TEST_ID} type='body2'>
                {CHILD}
            </LAText>,
        );
        expect(getByTestId('text')).toHaveStyle(styles.body2Text);
    });

    it('renders text with type body3', () => {
        const { getByTestId } = render(
            <LAText testID={TEST_ID} type='body3'>
                {CHILD}
            </LAText>,
        );
        expect(getByTestId('text')).toHaveStyle(styles.body3Text);
    });

    it('renders text with style', () => {
        const style = styles.H1Text;
        const { getByTestId } = render(
            <LAText testID={TEST_ID} style={style}>
                {CHILD}
            </LAText>,
        );
        expect(getByTestId('text')).toHaveStyle(style);
    });

    it('renders text with number of lines', () => {
        render(<LAText numberOfLines={1}>{CHILD}</LAText>);
        expect(screen.getByText('Testing')).toBeTruthy();
    });

    it('should execute text onPress', () => {
        const onPress = jest.fn();
        const { getByTestId } = render(
            <LAText testID={TEST_ID} onPress={onPress} type='H1'>
                {CHILD}
            </LAText>,
        );
        fireEvent(getByTestId('text'), 'onPress');
        expect(onPress).toHaveBeenCalledTimes(1);
    });
});
