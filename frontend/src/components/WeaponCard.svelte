<script lang="ts">
  import type { Weapon } from '../types';

  export let weapon: Weapon;
  export let onBuy: (weaponId: number) => void;
  export let owned: boolean = false;
  export let canAfford: boolean = true;

  function getTierColor(tier: string): string {
    switch (tier) {
      case 'common': return '#9e9e9e';
      case 'uncommon': return '#4CAF50';
      case 'rare': return '#2196F3';
      case 'legendary': return '#d4af37';
      default: return '#888';
    }
  }

  function handleBuy() {
    if (!owned && canAfford) {
      onBuy(weapon.id);
    }
  }
</script>

<div class="weapon-card">
  <div class="weapon-header">
    <h3>{weapon.name}</h3>
    <span class="tier" style="color: {getTierColor(weapon.tier)}">
      {weapon.tier.toUpperCase()}
    </span>
  </div>
  <p class="weapon-description">{weapon.description}</p>
  <div class="weapon-stats">
    <div class="stat">
      <span class="stat-label">⚔️ Damage Bonus:</span>
      <span class="stat-value success">+{weapon.damageBonus}</span>
    </div>
    <div class="stat">
      <span class="stat-label">🎯 Success Rate:</span>
      <span class="stat-value success">+{(weapon.successRateBonus * 100).toFixed(0)}%</span>
    </div>
    <div class="stat">
      <span class="stat-label">💰 Price:</span>
      <span class="stat-value price">${weapon.price.toLocaleString()}</span>
    </div>
  </div>
  <button 
    class="weapon-btn"
    class:owned
    class:cant-afford={!canAfford && !owned}
    on:click={handleBuy}
    disabled={owned || !canAfford}
  >
    {owned ? 'Owned' : canAfford ? 'Buy' : 'Not Enough Money'}
  </button>
</div>

<style>
  .weapon-card {
    background: #2a2a2a;
    border: 2px solid #444;
    border-radius: 12px;
    padding: 20px;
    transition: transform 0.2s, box-shadow 0.2s;
    width: 280px;
  }

  .weapon-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(212, 175, 55, 0.2);
  }

  .weapon-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
  }

  .weapon-header h3 {
    color: #e8e6e3;
    margin: 0;
    font-size: 1.2rem;
  }

  .tier {
    font-size: 0.75rem;
    font-weight: 700;
    padding: 4px 8px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
  }

  .weapon-description {
    color: #aaa;
    margin-bottom: 15px;
    line-height: 1.4;
    font-size: 0.9rem;
  }

  .weapon-stats {
    background: #1a1a1a;
    border-radius: 8px;
    padding: 12px;
    margin-bottom: 15px;
  }

  .stat {
    display: flex;
    justify-content: space-between;
    margin-bottom: 6px;
  }

  .stat:last-child {
    margin-bottom: 0;
  }

  .stat-label {
    color: #888;
    font-size: 0.85rem;
  }

  .stat-value {
    font-weight: 600;
    color: #e8e6e3;
  }

  .stat-value.success {
    color: #4CAF50;
  }

  .stat-value.price {
    color: #d4af37;
  }

  .weapon-btn {
    width: 100%;
    padding: 10px;
    background: linear-gradient(135deg, #d4af37 0%, #aa8c2c 100%);
    border: none;
    border-radius: 6px;
    color: #1a1a1a;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
  }

  .weapon-btn:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(212, 175, 55, 0.4);
  }

  .weapon-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .weapon-btn.owned {
    background: #4CAF50;
    color: white;
  }

  .weapon-btn.cant-afford {
    background: #666;
  }
</style>
