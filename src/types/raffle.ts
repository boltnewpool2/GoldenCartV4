export interface Contestant {
  name: string;
  supervisor: string;
  department: string;
}

export interface Winner {
  name: string;
  supervisor: string;
  department: string;
  week: number;
  prizeAmount: number;
}

export interface RaffleWeek {
  week: number;
  status: 'completed' | 'active' | 'coming_soon';
  drawDate?: Date;
  contestants: Contestant[];
  winner?: Winner;
}
