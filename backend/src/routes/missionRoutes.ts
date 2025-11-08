import { Router, Request, Response } from 'express';
import { FakeDB } from '../db/FakeDB';

export function createMissionRoutes(db: FakeDB) {
  const router = Router();

  // Get all missions
  router.get('/missions', (req: Request, res: Response) => {
    const missions = db.getMissions();
    return res.json(missions);
  });

  // Execute a mission
  router.post('/missions/:id/execute', async (req: Request, res: Response) => {
    const missionId = parseInt(req.params.id);
    const { username } = req.body;
    
    if (!username) {
      return res.status(400).json({ error: 'Username required' });
    }

    const mission = db.getMissionById(missionId);
    const user = db.getUserProfile(username);
    
    if (!mission) {
      return res.status(404).json({ error: 'Mission not found' });
    }
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Wait for mission duration
    await new Promise(resolve => setTimeout(resolve, mission.duration));

    // Calculate success based on mission success rate
    const randomValue = Math.random();
    const success = randomValue <= mission.successRate;
    
    let newMoney = user.money;
    let newXP = user.xp;
    
    if (success) {
      newMoney += mission.rewardMoney;
      newXP += mission.rewardXP;
    } else {
      newMoney -= mission.lossMoney;
      // Ensure money doesn't go below 0
      newMoney = Math.max(0, newMoney);
    }
    
    // Update user progress
    db.updateUserProgress(username, newMoney, newXP);
    
    return res.json({
      success,
      mission: mission.name,
      moneyChange: success ? mission.rewardMoney : -mission.lossMoney,
      xpGained: success ? mission.rewardXP : 0,
      newMoney,
      newXP,
      newLevel: Math.floor(newXP / 500) + 1
    });
  });

  return router;
}
