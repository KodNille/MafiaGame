import express from 'express';
import cors from 'cors';
import { FakeDB } from './db/FakeDB';
import { createAuthRoutes } from './routes/authRoutes';
import { createProfileRoutes } from './routes/profileRoutes';
import { createMissionRoutes } from './routes/missionRoutes';
import { createWeaponRoutes } from './routes/weaponRoutes';

const app = express();
const PORT = 3000;
const db = new FakeDB();

app.use(cors());
app.use(express.json());

// Register routes
app.use('/api', createAuthRoutes(db));
app.use('/api', createProfileRoutes(db));
app.use('/api', createMissionRoutes(db));
app.use('/api', createWeaponRoutes(db));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
