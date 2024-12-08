import { GameState } from '../models/GameState.model';

export interface GameContextProps {
    state: GameState;
    dispatch: React.Dispatch<any>;
}
