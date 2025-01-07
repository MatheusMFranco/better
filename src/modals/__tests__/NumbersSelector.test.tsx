import React, {act} from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import {ThemeProvider} from '@rneui/themed';
import {ModalProps} from 'react-native';

import ModalComponent from '../NumbersSelector';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(() => Promise.resolve(null)),
  setItem: jest.fn(() => Promise.resolve()),
  removeItem: jest.fn(() => Promise.resolve()),
  clear: jest.fn(() => Promise.resolve()),
  getAllKeys: jest.fn(() => Promise.resolve([])),
}));

describe('ModalComponent', () => {
  const mockOnCancel = jest.fn();

  const renderComponent = (props: Partial<ModalProps> = {}) =>
    render(
      <ThemeProvider>
        <ModalComponent
          isVisible={true}
          amount={6}
          onCancel={mockOnCancel}
          {...props}
        />
      </ThemeProvider>,
    );

  test('should clear numbers when cancel is pressed', () => {
    const {getByText, getByRole} = renderComponent();

    act(() => {
      fireEvent.press(getByText('01'));
      fireEvent.press(getByText('02'));
      fireEvent.press(getByRole('button'));
    });

    expect(mockOnCancel).toHaveBeenCalled();
    act(() => {
      fireEvent.press(getByText('01'));
      fireEvent.press(getByText('02'));
    });
    expect(getByText('01')).toBeTruthy();
    expect(getByText('02')).toBeTruthy();
  });
});
