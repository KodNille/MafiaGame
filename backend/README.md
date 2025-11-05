# Mafia Game Backend

Express.js backend for the Mafia game with TypeScript.

## Installation

```bash
npm install
```

## Running

Development mode:
```bash
npm run dev
```

Build and run production:
```bash
npm run build
npm start
```

## API Endpoints

- `POST /api/login` - Login with username and password
- `GET /api/profile/:username` - Get user profile
- `GET /api/missions` - Get all available missions
- `POST /api/missions/:id/execute` - Execute a mission

## Authentication

The fake database accepts:
- Username: `don`
- Password: `asd`

## Server

Runs on `http://localhost:3000`
