# Mafia Game

A web-based Mafia game where you complete missions to earn money and XP.

## Project Structure

- `/backend` - Node.js + Express.js + TypeScript backend
- `/frontend` - Svelte + TypeScript frontend

## Quick Start

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

Backend runs on `http://localhost:3000`

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`

## Login Credentials

- Username: `don`
- Password: `asd`

## Features

- 🔐 Login authentication
- 👤 User profile with money, XP, and level tracking
- 💼 Multiple missions with varying difficulty levels
- 🎲 Random success/failure based on mission success rates
- 💰 Earn money and XP on successful missions
- 📊 Progress tracking with XP bar
- 🌑 Dark themed UI

## Missions

The game includes 5 different missions:
1. **Street Hustle** (Easy) - 75% success rate
2. **Heist Planning** (Medium) - 55% success rate
3. **Casino Takeover** (Hard) - 35% success rate
4. **Smuggling Run** (Medium) - 60% success rate
5. **Underground Fight** (Easy) - 70% success rate

Each mission has:
- Money reward on success
- XP reward on success
- Money loss on failure
- Different success rates based on difficulty

## Technology Stack

**Backend:**
- Node.js
- Express.js
- TypeScript
- CORS enabled

**Frontend:**
- Svelte 4
- TypeScript
- Vite
- Single file components

Enjoy building your Mafia empire! 🕴️
