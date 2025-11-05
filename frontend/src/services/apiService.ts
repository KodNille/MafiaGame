import type { User, Mission, MissionResult, LoginResponse } from '../types';

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
}
