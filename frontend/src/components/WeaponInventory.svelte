<script lang="ts">
  import type { Weapon } from '../types';

  export let weapons: Weapon[];
  export let onEquip: (weaponId: number) => void;

  function getTierColor(tier: string): string {
    switch (tier) {
      case 'common': return '#9e9e9e';
      case 'uncommon': return '#4CAF50';
      case 'rare': return '#2196F3';
      case 'legendary': return '#d4af37';
      default: return '#888';
    }
  }
</script>

<div class="inventory-container">
  <h2>// WEAPON INVENTORY</h2>
  {#if weapons.length === 0}
    <p class="no-weapons">NO WEAPONS OWNED. VISIT THE WEAPON SHOP!</p>
  {:else}
    <div class="weapons-list">
      {#each weapons as weapon (weapon.id)}
        <div class="inventory-item" class:equipped={weapon.equipped}>
          <div class="weapon-info">
            <div class="weapon-name-tier">
              <h3>{weapon.name}</h3>
              <span class="tier" style="color: {getTierColor(weapon.tier)}">
                {weapon.tier.toUpperCase()}
              </span>
            </div>
            <div class="weapon-bonuses">
              <span class="bonus">⚔️ +{weapon.damageBonus}</span>
              <span class="bonus">🎯 +{(weapon.successRateBonus * 100).toFixed(0)}%</span>
            </div>
          </div>
          <button 
            class="equip-btn"
            class:equipped={weapon.equipped}
            on:click={() => onEquip(weapon.id)}
            disabled={weapon.equipped}
          >
            {weapon.equipped ? 'EQUIPPED' : 'EQUIP'}
          </button>
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  .inventory-container {
    background: transparent;
    border-top: 2px solid var(--noir-accent);
    padding: 20px;
    width: 100%;
    max-width: 500px;
  }

  .inventory-container h2 {
    color: var(--noir-accent);
    margin: 0 0 20px 0;
    font-size: 1.3rem;
    font-family: 'Courier New', monospace;
    letter-spacing: 2px;
  }

  .no-weapons {
    color: var(--noir-text-muted);
    text-align: center;
    padding: 40px 20px;
    font-size: 0.9rem;
    font-family: 'Courier New', monospace;
    letter-spacing: 1px;
  }

  .weapons-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .inventory-item {
    background: rgba(0, 0, 0, 0.3);
    border-left: 2px solid var(--noir-accent);
    padding: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: all 0.2s;
  }

  .inventory-item:hover {
    border-color: var(--noir-accent);
  }

  .inventory-item.equipped {
    border-color: var(--noir-accent);
    background: rgba(255, 255, 255, 0.05);
  }

  .weapon-info {
    flex: 1;
  }

  .weapon-name-tier {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 8px;
  }

  .weapon-name-tier h3 {
    color: var(--noir-text);
    margin: 0;
    font-size: 1.1rem;
    font-family: 'Courier New', monospace;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
  }

  .tier {
    font-size: 0.7rem;
    font-weight: 700;
    padding: 2px 6px;
    background: rgba(0, 0, 0, 0.5);
    border: 1px solid currentColor;
    font-family: 'Courier New', monospace;
    letter-spacing: 0.5px;
  }

  .weapon-bonuses {
    display: flex;
    gap: 15px;
  }

  .bonus {
    color: #6b8e4e;
    font-size: 0.95rem;
    font-weight: 700;
    font-family: 'Courier New', monospace;
  }

  .equip-btn {
    padding: 8px 18px;
    background: transparent;
    border: 3px solid var(--noir-accent);
    color: var(--noir-accent);
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 1px;
    cursor: pointer;
    transition: all 0.2s;
    min-width: 100px;
    font-family: 'Courier New', monospace;
  }

  .equip-btn:hover:not(:disabled) {
    background: rgba(128, 128, 128, 0.1);
  }

  .equip-btn:disabled {
    opacity: 0.8;
    cursor: default;
  }

  .equip-btn.equipped {
    background: transparent;
    border-color: var(--noir-accent-dim);
    color: var(--noir-text-muted);
  }
</style>
