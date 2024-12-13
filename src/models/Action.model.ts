export type ActionType =
  'createGame' |
  'deleteGame' |
  'dailyGame' |
  'removeAllDailyGame' |
  'removeAllSpecialsGame' |
  'importToFavorites';

export interface Action {
    type: ActionType;
    payload: string | string[];
}
