import React, { createContext, useReducer, ReactNode } from 'react';
import { GameState } from '../models/GameState.model';

type ActionType = 'createGame' | 'deleteGame' | 'dailyGame';

interface Action {
  type: ActionType;
  payload: string;
}

const actions = {
  createGame(state: GameState, action: Action): GameState {
    const game = action.payload;
    return {
      ...state,
      specials: [...state.specials, game],
    };
  },
  deleteGame(state: GameState, action: Action): GameState {
    const gamesToDelete = action.payload;
    return {
      ...state,
      specials: state.specials.filter((numbers) => !gamesToDelete.includes(numbers)),
    };
  },
  dailyGame(state: GameState, action: Action): GameState {
    const game = action.payload;
    return {
      ...state,
      daily: [...state.daily, { 
        numbers: game,
        registerDate: new Date(),
      }],
    };
  },
};

export const GameProvider: React.FC<{ children: ReactNode }> = (props) => {
  function reducer(state: GameState, action: Action): GameState {
    const fn = actions[action.type];
    return fn ? fn(state, action) : state;
  }

  const [state, dispatch] = useReducer(reducer, { specials: [],  daily: []});

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {props.children}
    </GameContext.Provider>
  );
};

const GameContext = createContext<{
  state: GameState;
  dispatch: React.Dispatch<Action>;
}>({
  state: { specials: [], daily: []},
  dispatch: () => {},
});

export default GameContext;
