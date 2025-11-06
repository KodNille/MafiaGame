<script lang="ts">
  export let id: number;
  export let name: string;
  export let description: string;
  export let difficulty: 'easy' | 'medium' | 'hard';
  export let rewardMoney: number;
  export let rewardXP: number;
  export let lossMoney: number;
  export let successRate: number;
  export let onExecute: (id: number) => void;
  export let disabled: boolean = false;

  function getDifficultyColor(difficulty: string): string {
    switch (difficulty) {
      case 'easy': return '#4CAF50';
      case 'medium': return '#FF9800';
      case 'hard': return '#f44336';
      default: return '#888';
    }
  }

  function handleExecute() {
    onExecute(id);
  }
</script>

<div class="mission-card">
  <div class="mission-header">
    <h3>{name}</h3>
    <span class="difficulty" style="color: {getDifficultyColor(difficulty)}">
      {difficulty.toUpperCase()}
    </span>
  </div>
  <p class="mission-description">{description}</p>
  <div class="mission-stats">
    <div class="stat">
      <span class="stat-label">Success Rate:</span>
      <span class="stat-value">{(successRate * 100).toFixed(0)}%</span>
    </div>
    <div class="stat success-stat">
      <span class="stat-label">💰 Reward:</span>
      <span class="stat-value">${rewardMoney.toLocaleString()}</span>
    </div>
    <div class="stat success-stat">
      <span class="stat-label">⭐ XP:</span>
      <span class="stat-value">+{rewardXP}</span>
    </div>
    <div class="stat fail-stat">
      <span class="stat-label">💸 Loss:</span>
      <span class="stat-value">-${lossMoney.toLocaleString()}</span>
    </div>
  </div>
  <button 
    class="mission-btn"
    on:click={handleExecute}
    {disabled}
  >
    {disabled ? 'Executing...' : 'Start Mission'}
  </button>
</div>

<style>
  .mission-card {
    background: #2a2a2a;
    border: 2px solid #444;
    border-radius: 12px;
    padding: 20px;
    transition: transform 0.2s, box-shadow 0.2s;
    width: 400px;
  }

  .mission-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(212, 175, 55, 0.2);
  }

  .mission-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
  }

  .mission-header h3 {
    color: #e8e6e3;
    margin: 0;
    font-size: 1.3rem;
  }

  .difficulty {
    font-size: 0.85rem;
    font-weight: 700;
    padding: 4px 8px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
  }

  .mission-description {
    color: #aaa;
    margin-bottom: 15px;
    line-height: 1.5;
  }

  .mission-stats {
    background: #1a1a1a;
    border-radius: 8px;
    padding: 15px;
    margin-bottom: 15px;
  }

  .stat {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
  }

  .stat:last-child {
    margin-bottom: 0;
  }

  .stat-label {
    color: #888;
    font-size: 0.95rem;
  }

  .stat-value {
    font-weight: 600;
    color: #e8e6e3;
  }

  .success-stat .stat-value {
    color: #4CAF50;
  }

  .fail-stat .stat-value {
    color: #f44336;
  }

  .mission-btn {
    width: 100%;
    padding: 12px;
    background: linear-gradient(135deg, #d4af37 0%, #aa8c2c 100%);
    border: none;
    border-radius: 6px;
    color: #1a1a1a;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
  }

  .mission-btn:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(212, 175, 55, 0.4);
  }

  .mission-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
</style>
