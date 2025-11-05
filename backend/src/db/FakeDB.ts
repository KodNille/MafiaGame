import { MissionManager, Mission } from '../managers/MissionManager';

export interface User {
  username: string;
  password: string;
  money: number;
  xp: number;
  level: number;
}

// Re-export Mission for backward compatibility
export type { Mission };

export class FakeDB {
  private users: Map<string, User>;
  private userProgress: Map<string, { money: number; xp: number; level: number }>;
  private missionManager: MissionManager;

  constructor() {
    this.users = new Map();
    this.userProgress = new Map();
    this.missionManager = new MissionManager();
    
    // Initialize fake user
    this.users.set('don', {
      username: 'don',
      password: 'asd',
      money: 10000,
      xp: 0,
      level: 1
    });
  }

  authenticate(username: string, password: string): User | null {
    const user = this.users.get(username);
    if (user && user.password === password) {
      // Initialize progress if not exists
      if (!this.userProgress.has(username)) {
        this.userProgress.set(username, {
          money: user.money,
          xp: user.xp,
          level: user.level
        });
      }
      return { ...user, ...this.userProgress.get(username)! };
    }
    return null;
  }

  getUserProfile(username: string): User | null {
    const user = this.users.get(username);
    if (user) {
      const progress = this.userProgress.get(username) || {
        money: user.money,
        xp: user.xp,
        level: user.level
      };
      return { ...user, ...progress };
    }
    return null;
  }

  getMissions(): Mission[] {
    return this.missionManager.getAllMissions();
  }

  getMissionById(id: number): Mission | undefined {
    return this.missionManager.getMissionById(id);
  }

  updateUserProgress(username: string, money: number, xp: number): void {
    const progress = this.userProgress.get(username);
    if (progress) {
      progress.money = money;
      progress.xp = xp;
      progress.level = Math.floor(xp / 500) + 1;
      this.userProgress.set(username, progress);
    }
  }
}
