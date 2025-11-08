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
  <h2>🔫 Weapon Inventory</h2>
  {#if weapons.length === 0}
    <p class="no-weapons">No weapons owned. Visit the weapon shop!</p>
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
            {weapon.equipped ? 'Equipped' : 'Equip'}
          </button>
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  .inventory-container {
    background: #2a2a2a;
    border: 2px solid #444;
    border-radius: 12px;
    padding: 20px;
    width: 100%;
    max-width: 500px;
  }

  .inventory-container h2 {
    color: #d4af37;
    margin: 0 0 20px 0;
    font-size: 1.5rem;
  }

  .no-weapons {
    color: #888;
    text-align: center;
    padding: 40px 20px;
    font-size: 1rem;
  }

  .weapons-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .inventory-item {
    background: #1a1a1a;
    border: 2px solid #333;
    border-radius: 8px;
    padding: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: border-color 0.2s, transform 0.2s;
  }

  .inventory-item:hover {
    border-color: #555;
  }

  .inventory-item.equipped {
    border-color: #d4af37;
    background: #252520;
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
    color: #e8e6e3;
    margin: 0;
    font-size: 1.1rem;
  }

  .tier {
    font-size: 0.7rem;
    font-weight: 700;
    padding: 3px 6px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
  }

  .weapon-bonuses {
    display: flex;
    gap: 15px;
  }

  .bonus {
    color: #4CAF50;
    font-size: 0.9rem;
    font-weight: 600;
  }

  .equip-btn {
    padding: 8px 20px;
    background: linear-gradient(135deg, #d4af37 0%, #aa8c2c 100%);
    border: none;
    border-radius: 6px;
    color: #1a1a1a;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
    min-width: 100px;
  }

  .equip-btn:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(212, 175, 55, 0.4);
  }

  .equip-btn:disabled {
    opacity: 0.8;
    cursor: default;
  }

  .equip-btn.equipped {
    background: #4CAF50;
    color: white;
  }
</style>
