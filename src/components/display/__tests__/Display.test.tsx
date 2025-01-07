import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';

import Display from '../Display';
import GameContext from '../../../context/GameContext';
import {notify} from '../../../utils/MessageUtils';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(() => Promise.resolve(null)),
  setItem: jest.fn(() => Promise.resolve()),
  removeItem: jest.fn(() => Promise.resolve()),
  clear: jest.fn(() => Promise.resolve()),
  getAllKeys: jest.fn(() => Promise.resolve([])),
}));

jest.mock('../../../utils/MessageUtils', () => ({notify: jest.fn()}));

describe('Display component', () => {
  const mockDispatch = jest.fn();
  const mockCancel = jest.fn();

  const defaultState = {
    specials: ['01,', '02,', '03', '04', '05', '06'],
    daily: [],
  };

  const renderWithContext = (props = {}) => {
    return render(
      <GameContext.Provider
        value={{dispatch: mockDispatch, state: defaultState}}>
        <Display
          value="Game 1"
          amount={3}
          max={3}
          cancel={mockCancel}
          {...props}
        />
      </GameContext.Provider>,
    );
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render the correct value', () => {
    const {getByText} = renderWithContext();
    expect(getByText('Game 1')).toBeTruthy();
  });

  test('should show the save button when amount equals max', () => {
    const {getByText} = renderWithContext();
    expect(getByText('SAVE')).toBeTruthy();
  });

  test('should call dispatch and notify when save button is pressed', () => {
    const {getByText} = renderWithContext();
    const saveButton = getByText('SAVE');
    fireEvent.press(saveButton);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'createGame',
      payload: 'Game 1',
    });
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'dailyGame',
      payload: 'Game 1',
    });
    expect(notify).toHaveBeenCalledWith('Game 1 has been saved!');
    expect(mockCancel).toHaveBeenCalled();
  });
});
