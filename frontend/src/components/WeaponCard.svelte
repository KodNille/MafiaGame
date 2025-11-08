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
  <div class="card-content">
    <div class="card-image">
      <img src="https://placehold.co/200x200/1a1a1a/b8a472?text=Weapon" alt={weapon.name} />
    </div>
    <div class="card-info">
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
</div>

<style>
  .weapon-card {
    background: transparent;
    border: 1px solid var(--noir-light-gray);
    border-left: 2px solid var(--noir-accent);
    border-radius: 0;
    padding: 20px;
    transition: all 0.3s;
    width: 100%;
    min-height: 240px;
  }

  .card-content {
    display: flex;
    gap: 20px;
    align-items: center;
  }

  .card-image {
    flex-shrink: 0;
  }

  .card-image img {
    width: 200px;
    height: 200px;
    object-fit: cover;
    border: 1px solid var(--noir-light-gray);
  }

  .card-info {
    flex: 1;
  }

  .weapon-card:hover {
    border-left-color: var(--noir-accent);
    background: rgba(26, 26, 26, 0.95);
  }

  .weapon-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
    padding-bottom: 8px;
    border-bottom: 1px solid rgba(240, 230, 140, 0.1);
  }

  .weapon-header h3 {
    color: var(--noir-text);
    margin: 0;
    font-size: 1.4rem;
    font-family: 'Courier New', monospace;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
  }

  .tier {
    font-size: 0.8rem;
    font-weight: 700;
    padding: 4px 10px;
    background: rgba(0, 0, 0, 0.5);
    border: 1px solid currentColor;
    border-radius: 0;
    font-family: 'Courier New', monospace;
    letter-spacing: 1px;
  }

  .weapon-description {
    color: var(--noir-text-muted);
    margin-bottom: 15px;
    line-height: 1.6;
    font-size: 1.05rem;
    font-family: 'Courier New', monospace;
    font-weight: 500;
  }

  .weapon-stats {
    background: rgba(0, 0, 0, 0.4);
    border: 1px solid var(--noir-light-gray);
    border-radius: 0;
    padding: 12px;
    margin-bottom: 15px;
    box-shadow: inset 2px 2px 5px rgba(0, 0, 0, 0.5);
  }

  .stat {
    display: flex;
    justify-content: space-between;
    margin-bottom: 6px;
    font-family: 'Courier New', monospace;
  }

  .stat:last-child {
    margin-bottom: 0;
  }

  .stat-label {
    color: var(--noir-text-muted);
    font-size: 1rem;
    letter-spacing: 0.5px;
    font-weight: 600;
  }

  .stat-value {
    font-weight: 700;
    font-size: 1rem;
    color: var(--noir-text);
  }

  .stat-value.success {
    color: #6b8e4e;
  }

  .stat-value.price {
    color: var(--noir-accent);
  }

  .weapon-btn {
    padding: 12px 30px;
    background: transparent;
    border: 3px solid var(--noir-accent);
    color: var(--noir-accent);
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.2s;
    font-family: 'Courier New', monospace;
    white-space: nowrap;
    min-width: 180px;
  }

  .weapon-btn:hover:not(:disabled):not(.owned) {
    background: rgba(128, 128, 128, 0.1);
  }

  .weapon-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .weapon-btn.owned {
    background: transparent;
    border-color: var(--noir-accent-dim);
    color: var(--noir-text-muted);
  }

  .weapon-btn.cant-afford {
    background: transparent;
    border-color: var(--noir-light-gray);
    color: var(--noir-text-muted);
  }
</style>
