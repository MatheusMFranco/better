import React, { createContext } from 'react';

const GameContext = createContext({});

export const GameProvider = props => {
    const data = [
        '01, 02, 03, 04, 05, 06',
        '07, 08, 09, 10, 11, 12',
    ]; 
    return (
        <GameContext.Provider value={{ state: data }}>
            { props.children }
        </GameContext.Provider>
    );
};

export default GameContext;
