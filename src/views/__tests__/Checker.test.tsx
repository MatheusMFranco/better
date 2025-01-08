import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import GameContext from '../../context/GameContext';
import Checker from '../Checker';

const mockGameContext = {
  state: {
    specials: ['1234', '5678', '91011', '2233'],
    daily: [],
  },
  dispatch: () => ({}),
};

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(() => Promise.resolve(null)),
  setItem: jest.fn(() => Promise.resolve()),
  removeItem: jest.fn(() => Promise.resolve()),
  clear: jest.fn(() => Promise.resolve()),
  getAllKeys: jest.fn(() => Promise.resolve([])),
}));

describe('<Checker />', () => {
  it('renders correctly and shows the initial state', () => {
    const {getByText, getByTestId} = render(
      <GameContext.Provider value={mockGameContext}>
        <Checker />
      </GameContext.Provider>,
    );

    expect(getByText('Minimum Quantitys:')).toBeTruthy();
    expect(getByText('Enter the winning game:')).toBeTruthy();
    expect(getByTestId('game-input')).toBeTruthy();
    expect(getByTestId('price-input')).toBeTruthy();
  });

  it('should update minPriceAmount when typing in the input field', async () => {
    const {getByTestId} = render(
      <GameContext.Provider value={mockGameContext}>
        <Checker />
      </GameContext.Provider>,
    );

    const input = getByTestId('price-input');
    fireEvent.changeText(input, '6');

    expect(input.props.value).toBe('6');
  });
});
