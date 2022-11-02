import { render } from '@testing-library/react-native';
import React from 'react';
import LAButton from '..';

const BUTTON_LABEL = 'button';

describe('Testing button atom', () => {
    it('renders button required props', () => {
        const onPress = jest.fn();
        const { getByText } = render(
            <LAButton label={BUTTON_LABEL} onPress={onPress} />,
        );
        expect(getByText(BUTTON_LABEL)).toBeTruthy();
    });
});
