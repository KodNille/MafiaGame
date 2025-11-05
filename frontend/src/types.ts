export interface User {
  username: string;
  money: number;
  xp: number;
  level: number;
}

export interface Mission {
  id: number;
  name: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  rewardMoney: number;
  rewardXP: number;
  lossMoney: number;
  successRate: number;
}

export interface MissionResult {
  success: boolean;
  mission: string;
  moneyChange: number;
  xpGained: number;
  newMoney: number;
  newXP: number;
  newLevel: number;
}

export interface LoginResponse {
  success: boolean;
  user: User;
}
