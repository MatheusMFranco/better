export interface GameState {
  daily: DailyItem[];
  specials: string[];
}

export interface DailyItem {
  numbers: string;
  registerDate: Date;
}
