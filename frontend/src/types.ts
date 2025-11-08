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
  duration: number; // in milliseconds
  durationClass: string;
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

export interface Weapon {
  id: number;
  name: string;
  description: string;
  price: number;
  damageBonus: number;
  successRateBonus: number;
  tier: 'common' | 'uncommon' | 'rare' | 'legendary';
  equipped?: boolean;
}

export interface BuyWeaponResponse {
  success: boolean;
  weapon: string;
  newMoney: number;
}

export interface EquipWeaponResponse {
  success: boolean;
  weapon: string;
}
