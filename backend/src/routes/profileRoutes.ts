import { Router, Request, Response } from 'express';
import { FakeDB } from '../db/FakeDB';

export function createProfileRoutes(db: FakeDB) {
  const router = Router();

  // Get user profile
  router.get('/profile/:username', (req: Request, res: Response) => {
    const { username } = req.params;
    const user = db.getUserProfile(username);
    
    if (user) {
      return res.json({
        username: user.username,
        money: user.money,
        xp: user.xp,
        level: user.level
      });
    }
    
    return res.status(404).json({ error: 'User not found' });
  });

  return router;
}
