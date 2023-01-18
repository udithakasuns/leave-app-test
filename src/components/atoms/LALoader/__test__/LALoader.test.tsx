import '@testing-library/jest-native/extend-expect';
import { render, screen } from '@testing-library/react-native';
import React from 'react';
import LALoader from '../index';

const TEST_ID = 'LOADER_ID';
describe('Testing ModalLoder atom', () => {
    it('renders loader', () => {
        render(<LALoader testID={TEST_ID} isVisible />);
        const modalLoader = screen.getByTestId(TEST_ID);
        expect(modalLoader).toBeVisible();
    });
});
