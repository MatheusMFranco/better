import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';

import {SelectableButtonProps} from '../../../props/SelectableButtonProps';
import SelectableButton from '../Selectable';

describe('SelectableButton component', () => {
  const mockOnClick = jest.fn();

  const defaultProps: SelectableButtonProps = {
    onClick: mockOnClick,
    label: 'Button 1',
    disabled: false,
    list: [],
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render the button with the correct label', () => {
    const {getByText} = render(<SelectableButton {...defaultProps} />);
    expect(getByText('Button 1')).toBeTruthy();
  });

  test('should call onClick when pressed if not disabled', () => {
    const {getByText} = render(<SelectableButton {...defaultProps} />);
    const button = getByText('Button 1');

    fireEvent.press(button);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  test('should not call onClick if disabled', () => {
    const props = {...defaultProps, disabled: true};
    const {getByText} = render(<SelectableButton {...props} />);
    const button = getByText('Button 1');

    fireEvent.press(button);

    expect(mockOnClick).not.toHaveBeenCalled();
  });
});
