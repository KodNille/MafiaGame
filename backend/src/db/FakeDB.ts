import { MissionManager, Mission } from '../managers/MissionManager';
import { WeaponManager, Weapon } from '../managers/WeaponManager';

export interface User {
  username: string;
  password: string;
  money: number;
  xp: number;
  level: number;
}

export interface UserWeapon {
  weaponId: number;
  equipped: boolean;
}

// Re-export Mission and Weapon for backward compatibility
export type { Mission, Weapon };

export class FakeDB {
  private users: Map<string, User>;
  private userProgress: Map<string, { money: number; xp: number; level: number }>;
  private userWeapons: Map<string, UserWeapon[]>;
  private missionManager: MissionManager;
  private weaponManager: WeaponManager;

  constructor() {
    this.users = new Map();
    this.userProgress = new Map();
    this.userWeapons = new Map();
    this.missionManager = new MissionManager();
    this.weaponManager = new WeaponManager();
    
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

  // Weapon methods
  getWeapons(): Weapon[] {
    return this.weaponManager.getAllWeapons();
  }

  getWeaponById(id: number): Weapon | undefined {
    return this.weaponManager.getWeaponById(id);
  }

  getUserWeapons(username: string): UserWeapon[] {
    return this.userWeapons.get(username) || [];
  }

  buyWeapon(username: string, weaponId: number): boolean {
    const weapon = this.weaponManager.getWeaponById(weaponId);
    const user = this.getUserProfile(username);

    if (!weapon || !user) {
      return false;
    }

    // Check if user already owns the weapon
    const userWeapons = this.getUserWeapons(username);
    if (userWeapons.some(w => w.weaponId === weaponId)) {
      return false;
    }

    // Check if user has enough money
    if (user.money < weapon.price) {
      return false;
    }

    // Deduct money
    this.updateUserProgress(username, user.money - weapon.price, user.xp);

    // Add weapon to user's inventory
    if (!this.userWeapons.has(username)) {
      this.userWeapons.set(username, []);
    }
    this.userWeapons.get(username)!.push({
      weaponId,
      equipped: false
    });

    return true;
  }

  equipWeapon(username: string, weaponId: number): boolean {
    const userWeapons = this.userWeapons.get(username);
    if (!userWeapons) {
      return false;
    }

    const weapon = userWeapons.find(w => w.weaponId === weaponId);
    if (!weapon) {
      return false;
    }

    // Unequip all other weapons
    userWeapons.forEach(w => w.equipped = false);

    // Equip the selected weapon
    weapon.equipped = true;

    return true;
  }

  getEquippedWeapon(username: string): Weapon | null {
    const userWeapons = this.getUserWeapons(username);
    const equipped = userWeapons.find(w => w.equipped);
    
    if (equipped) {
      return this.weaponManager.getWeaponById(equipped.weaponId) || null;
    }
    
    return null;
  }
}
