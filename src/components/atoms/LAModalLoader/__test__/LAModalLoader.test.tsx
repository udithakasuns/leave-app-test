import '@testing-library/jest-native/extend-expect';
import { render, screen } from '@testing-library/react-native';
import React from 'react';
import LAModalLoder from '../index';

const TEST_ID = 'LOADER_ID';
describe('Testing ModalLoder atom', () => {
    it('renders loader', () => {
        render(<LAModalLoder testID={TEST_ID} />);
        const modalLoader = screen.getByTestId(TEST_ID);
        expect(modalLoader).toBeVisible();
    });

    it('renders disabled loader', () => {
        render(<LAModalLoder testID={TEST_ID} isVisible={false} />);
    });
});
