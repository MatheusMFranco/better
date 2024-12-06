import React, { createContext, useReducer, ReactNode, useEffect } from 'react';
import { GameState } from '../models/GameState.model';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ActionType = 'createGame' | 'deleteGame' | 'dailyGame' | 'removeAllDailyGame' | 'removeAllSpecialsGame';

interface Action {
  type: ActionType;
  payload: string | string[];
}

const actions = {
  createGame(state: GameState, action: Action): GameState {
    const game = action.payload as string;
    return {
      ...state,
      specials: [...state.specials, game],
    };
  },
  deleteGame(state: GameState, action: Action): GameState {
    const gamesToDelete = action.payload as string[];
    return {
      ...state,
      specials: state.specials.filter((numbers) => !gamesToDelete.includes(numbers)),
    };
  },
  dailyGame(state: GameState, action: Action): GameState {
    const game = action.payload as string;
    return {
      ...state,
      daily: [...state.daily, { 
        numbers: game,
        registerDate: new Date(),
      }],
    };
  },
  removeAllDailyGame(state: GameState): GameState {
    return {
      ...state,
      daily: [],
    };
  },
  removeAllSpecialsGame(state: GameState): GameState {
    return {
      ...state,
      specials: [],
    };
  },
};

export const GameProvider: React.FC<{ children: ReactNode }> = props => {
  const [state, dispatch] = useReducer(reducer, { specials: [], daily: [] });

  useEffect(() => {
    const loadState = async () => {
      try {
        const specials = await AsyncStorage.getItem('specials');
        const daily = await AsyncStorage.getItem('daily');
        if (specials) {
          const specialsData = JSON.parse(specials);
          specialsData.forEach((game: string) => {
            dispatch({
              type: 'createGame',
              payload: game,
            });
          });
        }
        if (daily) {
          const dailyData = JSON.parse(daily);
          dailyData.forEach((game: { numbers: string }) => {
            dispatch({
              type: 'dailyGame',
              payload: game.numbers,
            });
          });
        }
      } catch (error) {
        console.error('Erro ao carregar dados', error);
      }
    };

    loadState();
  }, []);

  const saveStateToStorage = async (newState: GameState) => {
    try {
      await AsyncStorage.setItem('specials', JSON.stringify(newState.specials));
      await AsyncStorage.setItem('daily', JSON.stringify(newState.daily));
    } catch (error) {
      console.error('Erro ao salvar no AsyncStorage', error);
    }
  };

  function reducer(state: GameState, action: Action): GameState {
    let newState = state;
    const fn = actions[action.type];
    if (fn) {
      newState = fn(state, action);
    }
    return newState;
  }

  useEffect(() => {
    saveStateToStorage(state);
  }, [state]);

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
  state: { specials: [], daily: [] },
  dispatch: () => {},
});

export default GameContext;
