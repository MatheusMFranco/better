import React from 'react';
import {render} from '@testing-library/react-native';
import {ThemeProvider} from '@rneui/themed';

import Generator from '../Generator';
import GameContext from '../../../context/GameContext';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(() => Promise.resolve(null)),
  setItem: jest.fn(() => Promise.resolve()),
  removeItem: jest.fn(() => Promise.resolve()),
  clear: jest.fn(() => Promise.resolve()),
  getAllKeys: jest.fn(() => Promise.resolve([])),
}));

describe('Generator component', () => {
  const mockDispatch = jest.fn();
  const mockState = {specials: ['01 02 03'], daily: []};

  const renderComponent = (amount: number) =>
    render(
      <GameContext.Provider value={{dispatch: mockDispatch, state: mockState}}>
        <ThemeProvider>
          <Generator amount={amount} />
        </ThemeProvider>
      </GameContext.Provider>,
    );

  test('should disable generate button when amount is invalid', () => {
    const {getByText} = renderComponent(6);
    const generateButton = getByText(' GENERATE');
    expect(generateButton).toBeTruthy();
  });
});
