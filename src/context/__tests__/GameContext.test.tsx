import React from 'react';
import {render} from '@testing-library/react-native';

import GameContext, {GameProvider} from '../GameContext';
import {DailyItem, GameState} from '../../models/GameState.model';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

describe('GameProvider hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should initialize state with empty specials and daily arrays', () => {
    let contextValue: {state: GameState} = {
      state: {
        specials: [] as string[],
        daily: [] as DailyItem[],
      },
    };
    render(
      <GameProvider>
        <GameContext.Consumer>
          {value => {
            contextValue = value;
            return null;
          }}
        </GameContext.Consumer>
      </GameProvider>,
    );
    expect(contextValue.state.specials).toEqual([]);
    expect(contextValue.state.daily).toEqual([]);
  });
});
