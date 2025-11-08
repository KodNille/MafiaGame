import * as fs from 'fs';
import * as path from 'path';

export interface Weapon {
  id: number;
  name: string;
  description: string;
  price: number;
  damageBonus: number;
  successRateBonus: number;
  tier: 'common' | 'uncommon' | 'rare' | 'legendary';
}

export class WeaponManager {
  private weapons: Weapon[] = [];

  constructor(dataPath?: string) {
    const weaponsPath = dataPath || path.join(__dirname, '../data/weapons.json');
    this.loadWeapons(weaponsPath);
  }

  private loadWeapons(filePath: string): void {
    try {
      const data = fs.readFileSync(filePath, 'utf-8');
      this.weapons = JSON.parse(data);
    } catch (error) {
      console.error('Failed to load weapons:', error);
      this.weapons = [];
    }
  }

  getAllWeapons(): Weapon[] {
    return this.weapons;
  }

  getWeaponById(id: number): Weapon | undefined {
    return this.weapons.find(weapon => weapon.id === id);
  }

  getWeaponsByTier(tier: 'common' | 'uncommon' | 'rare' | 'legendary'): Weapon[] {
    return this.weapons.filter(weapon => weapon.tier === tier);
  }
}
