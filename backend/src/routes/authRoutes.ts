import { Router, Request, Response } from 'express';
import { FakeDB } from '../db/FakeDB';

export function createAuthRoutes(db: FakeDB) {
  const router = Router();

  // Login endpoint
  router.post('/login', (req: Request, res: Response) => {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password required' });
    }

    const user = db.authenticate(username, password);
    
    if (user) {
      return res.json({
        success: true,
        user: {
          username: user.username,
          money: user.money,
          xp: user.xp,
          level: user.level
        }
      });
    }
    
    return res.status(401).json({ error: 'Invalid credentials' });
  });

  return router;
}
