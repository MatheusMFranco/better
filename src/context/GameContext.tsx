import React, { createContext, useReducer, ReactNode } from 'react';

interface GameState {
  data: string[];
}

type ActionType = 'createGame' | 'deleteGame';

interface Action {
  type: ActionType;
  payload: string;
}

const actions = {
  createGame(state: GameState, action: Action): GameState {
    const game = action.payload;
    return {
      ...state,
      data: [...state.data, game],
    };
  },
  deleteGame(state: GameState, action: Action): GameState {
    const game = action.payload;
    return {
      ...state,
      data: state.data.filter((numbers) => numbers !== game),
    };
  },
};

export const GameProvider: React.FC<{ children: ReactNode }> = (props) => {
  function reducer(state: GameState, action: Action): GameState {
    const fn = actions[action.type];
    return fn ? fn(state, action) : state;
  }

  const [state, dispatch] = useReducer(reducer, { data: [] });

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
  state: { data: [] },
  dispatch: () => {},
});

export default GameContext;
