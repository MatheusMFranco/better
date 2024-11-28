import React, { createContext, useReducer } from 'react';

const data = [];
const initialState = { data };
const GameContext = createContext({});

const actions = {
    createGame(state, action) {
        const game = action.payload;
        return {
            ...state,
            data: [...state.data, game],
        };
    },
    deleteGame(state, action) {
        const game = action.payload;
        return {
            ...state,
            data: state.data.filter(numbers => numbers !== game),
        };
    }
};

export const GameProvider = props => {

    function reducer(state, action) {
        const fn = actions[action.type];
        return fn ? fn(state, action) : state;
    }

    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <GameContext.Provider value={{ state, dispatch }}>
            { props.children }
        </GameContext.Provider>
    );
};

export default GameContext;
