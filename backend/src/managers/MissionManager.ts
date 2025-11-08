import * as fs from 'fs';
import * as path from 'path';

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

export class MissionManager {
  private missions: Mission[] = [];

  constructor(dataPath?: string) {
    const missionsPath = dataPath || path.join(__dirname, '../data/missions.json');
    this.loadMissions(missionsPath);
  }

  private loadMissions(filePath: string): void {
    try {
      const data = fs.readFileSync(filePath, 'utf-8');
      this.missions = JSON.parse(data);
    } catch (error) {
      console.error('Failed to load missions:', error);
      this.missions = [];
    }
  }

  getAllMissions(): Mission[] {
    return this.missions;
  }

  getMissionById(id: number): Mission | undefined {
    return this.missions.find(mission => mission.id === id);
  }

  getMissionsByDifficulty(difficulty: 'easy' | 'medium' | 'hard'): Mission[] {
    return this.missions.filter(mission => mission.difficulty === difficulty);
  }
}
