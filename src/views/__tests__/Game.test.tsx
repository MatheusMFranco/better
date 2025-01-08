import React from 'react';
import {render} from '@testing-library/react-native';
import {NavigationContainer} from '@react-navigation/native';
import Game from '../Game';
import {FavoritesNavigationProp} from '../../props/FavoritesProps';

const mockNavigate = jest.fn();
const mockDispatch = jest.fn();
const mockReset = jest.fn();
const mockGoBack = jest.fn();

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(() => Promise.resolve(null)),
  setItem: jest.fn(() => Promise.resolve()),
  removeItem: jest.fn(() => Promise.resolve()),
  clear: jest.fn(() => Promise.resolve()),
  getAllKeys: jest.fn(() => Promise.resolve([])),
}));

const navigationMock = {
  navigate: mockNavigate,
  dispatch: mockDispatch,
  reset: mockReset,
  goBack: mockGoBack,
};

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => navigationMock, // Usando o mock
}));

describe('<Game />', () => {
  it('renders correctly', () => {
    const {getByText} = render(
      <NavigationContainer>
        <Game
          navigation={navigationMock as unknown as FavoritesNavigationProp}
        />
      </NavigationContainer>,
    );

    expect(getByText('Chose the number of numbers:')).toBeTruthy();
    expect(getByText('OR')).toBeTruthy();
  });
});
