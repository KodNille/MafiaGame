import type { User, Mission, MissionResult, LoginResponse, Weapon, BuyWeaponResponse, EquipWeaponResponse } from '../types';

const API_URL = 'http://localhost:3000/api';

export class ApiService {
  private static baseUrl = API_URL;

  static async login(username: string, password: string): Promise<LoginResponse> {
    const response = await fetch(`${this.baseUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Login failed');
    }

    return response.json();
  }

  static async getProfile(username: string): Promise<User> {
    const response = await fetch(`${this.baseUrl}/profile/${username}`);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to get profile');
    }

    return response.json();
  }

  static async getMissions(): Promise<Mission[]> {
    const response = await fetch(`${this.baseUrl}/missions`);

    if (!response.ok) {
      throw new Error('Failed to load missions');
    }

    return response.json();
  }

  static async executeMission(missionId: number, username: string): Promise<MissionResult> {
    const response = await fetch(`${this.baseUrl}/missions/${missionId}/execute`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to execute mission');
    }

    return response.json();
  }

  static async getWeapons(): Promise<Weapon[]> {
    const response = await fetch(`${this.baseUrl}/weapons`);

    if (!response.ok) {
      throw new Error('Failed to load weapons');
    }

    return response.json();
  }

  static async getUserWeapons(username: string): Promise<Weapon[]> {
    const response = await fetch(`${this.baseUrl}/weapons/inventory/${username}`);

    if (!response.ok) {
      throw new Error('Failed to load user weapons');
    }

    return response.json();
  }

  static async buyWeapon(username: string, weaponId: number): Promise<BuyWeaponResponse> {
    const response = await fetch(`${this.baseUrl}/weapons/buy`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, weaponId }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to buy weapon');
    }

    return response.json();
  }

  static async equipWeapon(username: string, weaponId: number): Promise<EquipWeaponResponse> {
    const response = await fetch(`${this.baseUrl}/weapons/equip`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, weaponId }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to equip weapon');
    }

    return response.json();
  }

  static async getEquippedWeapon(username: string): Promise<Weapon | null> {
    const response = await fetch(`${this.baseUrl}/weapons/equipped/${username}`);

    if (!response.ok) {
      throw new Error('Failed to load equipped weapon');
    }

    return response.json();
  }
}
