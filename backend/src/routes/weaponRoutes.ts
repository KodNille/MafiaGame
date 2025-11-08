import { Router, Request, Response } from 'express';
import { FakeDB } from '../db/FakeDB';

export function createWeaponRoutes(db: FakeDB) {
  const router = Router();

  // Get all available weapons
  router.get('/weapons', (req: Request, res: Response) => {
    const weapons = db.getWeapons();
    return res.json(weapons);
  });

  // Get user's weapons
  router.get('/weapons/inventory/:username', (req: Request, res: Response) => {
    const { username } = req.params;
    const userWeapons = db.getUserWeapons(username);
    
    // Map weapon IDs to full weapon data
    const weaponsWithDetails = userWeapons.map(uw => {
      const weapon = db.getWeaponById(uw.weaponId);
      return {
        ...weapon,
        equipped: uw.equipped
      };
    });

    return res.json(weaponsWithDetails);
  });

  // Buy a weapon
  router.post('/weapons/buy', (req: Request, res: Response) => {
    const { username, weaponId } = req.body;

    if (!username || !weaponId) {
      return res.status(400).json({ error: 'Username and weaponId required' });
    }

    const weapon = db.getWeaponById(weaponId);
    if (!weapon) {
      return res.status(404).json({ error: 'Weapon not found' });
    }

    const success = db.buyWeapon(username, weaponId);
    
    if (success) {
      const user = db.getUserProfile(username);
      return res.json({
        success: true,
        weapon: weapon.name,
        newMoney: user?.money || 0
      });
    } else {
      return res.status(400).json({ 
        error: 'Could not buy weapon. Check if you have enough money or already own it.' 
      });
    }
  });

  // Equip a weapon
  router.post('/weapons/equip', (req: Request, res: Response) => {
    const { username, weaponId } = req.body;

    if (!username || !weaponId) {
      return res.status(400).json({ error: 'Username and weaponId required' });
    }

    const success = db.equipWeapon(username, weaponId);
    
    if (success) {
      const weapon = db.getWeaponById(weaponId);
      return res.json({
        success: true,
        weapon: weapon?.name || 'Unknown'
      });
    } else {
      return res.status(400).json({ 
        error: 'Could not equip weapon. Make sure you own it.' 
      });
    }
  });

  // Get equipped weapon
  router.get('/weapons/equipped/:username', (req: Request, res: Response) => {
    const { username } = req.params;
    const weapon = db.getEquippedWeapon(username);
    
    if (weapon) {
      return res.json(weapon);
    } else {
      return res.json(null);
    }
  });

  return router;
}
