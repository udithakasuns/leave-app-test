import '@testing-library/jest-native/extend-expect';
import { fireEvent, render, screen } from '@testing-library/react-native';
import React from 'react';
import LAToggle from '../index';

describe('Testing text atom', () => {
    it('renders Toggle events', () => {
        const onPress = jest.fn();
        render(<LAToggle testID='default' value onValueChange={onPress} />);
        const switchButton = screen.getByTestId('default');
        fireEvent(switchButton, 'onValueChange', false);
        expect(onPress).toHaveBeenCalledWith(false);
    });
});
