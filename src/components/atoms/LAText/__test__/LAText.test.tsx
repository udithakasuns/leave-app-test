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
        expect(screen.getByText(CHILD)).toBeTruthy();
    });

    it('renders text with type H1', () => {
        const { getByTestId } = render(
            <LAText testID={TEST_ID} type='H1'>
                {CHILD}
            </LAText>,
        );
        expect(getByTestId(TEST_ID)).toHaveStyle(styles.H1);
    });

    it('renders text with type H3', () => {
        const { getByTestId } = render(
            <LAText testID={TEST_ID} type='H1Bold'>
                {CHILD}
            </LAText>,
        );
        expect(getByTestId(TEST_ID)).toHaveStyle(styles.H1Bold);
    });

    it('renders text with type H2', () => {
        const { getByTestId } = render(
            <LAText testID={TEST_ID} type='H2'>
                {CHILD}
            </LAText>,
        );
        expect(getByTestId(TEST_ID)).toHaveStyle(styles.H2);
    });

    it('renders text with type H2Bold', () => {
        const { getByTestId } = render(
            <LAText testID={TEST_ID} type='H2Bold'>
                {CHILD}
            </LAText>,
        );
        expect(getByTestId(TEST_ID)).toHaveStyle(styles.H2Bold);
    });

    it('renders text with type SubH', () => {
        const { getByTestId } = render(
            <LAText testID={TEST_ID} type='SubH'>
                {CHILD}
            </LAText>,
        );
        expect(getByTestId(TEST_ID)).toHaveStyle(styles.SubH);
    });

    it('renders text with type SubHBold', () => {
        const { getByTestId } = render(
            <LAText testID={TEST_ID} type='SubHBold'>
                {CHILD}
            </LAText>,
        );
        expect(getByTestId(TEST_ID)).toHaveStyle(styles.SubHBold);
    });

    it('renders text with type ParaLG', () => {
        const { getByTestId } = render(
            <LAText testID={TEST_ID} type='ParaLG'>
                {CHILD}
            </LAText>,
        );
        expect(getByTestId(TEST_ID)).toHaveStyle(styles.ParaLG);
    });

    it('renders text with type ParaLGBold', () => {
        const { getByTestId } = render(
            <LAText testID={TEST_ID} type='ParaLGBold'>
                {CHILD}
            </LAText>,
        );
        expect(getByTestId(TEST_ID)).toHaveStyle(styles.ParaLGBold);
    });

    it('renders text with type ParaSM', () => {
        const { getByTestId } = render(
            <LAText testID={TEST_ID} type='ParaSM'>
                {CHILD}
            </LAText>,
        );
        expect(getByTestId(TEST_ID)).toHaveStyle(styles.ParaSM);
    });

    it('renders text with type ParaSMBold', () => {
        const { getByTestId } = render(
            <LAText testID={TEST_ID} type='ParaSMBold'>
                {CHILD}
            </LAText>,
        );
        expect(getByTestId(TEST_ID)).toHaveStyle(styles.ParaSMBold);
    });

    it('renders text with type ParaXS', () => {
        const { getByTestId } = render(
            <LAText testID={TEST_ID} type='ParaXS'>
                {CHILD}
            </LAText>,
        );
        expect(getByTestId(TEST_ID)).toHaveStyle(styles.ParaXS);
    });

    it('renders text with type ParaXSBold', () => {
        const { getByTestId } = render(
            <LAText testID={TEST_ID} type='ParaXSBold'>
                {CHILD}
            </LAText>,
        );
        expect(getByTestId(TEST_ID)).toHaveStyle(styles.ParaXSBold);
    });

    it('renders text with style', () => {
        const style = styles.H1;
        const { getByTestId } = render(
            <LAText testID={TEST_ID} style={style}>
                {CHILD}
            </LAText>,
        );
        expect(getByTestId(TEST_ID)).toHaveStyle(style);
    });

    it('renders text with number of lines', () => {
        render(<LAText numberOfLines={1}>{CHILD}</LAText>);
        expect(screen.getByText(CHILD)).toBeTruthy();
    });

    it('should execute text onPress', () => {
        const onPress = jest.fn();
        const { getByTestId } = render(
            <LAText testID={TEST_ID} onPress={onPress} type='H1'>
                {CHILD}
            </LAText>,
        );
        fireEvent(getByTestId(TEST_ID), 'onPress');
        expect(onPress).toHaveBeenCalledTimes(1);
    });
});
