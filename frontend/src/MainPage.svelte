<script lang="ts">
  import Header from './components/Header.svelte';
  import Profile from './components/Profile.svelte';
  import MissionCard from './components/MissionCard.svelte';
  import MissionResult from './components/MissionResult.svelte';
  import WeaponCard from './components/WeaponCard.svelte';
  import WeaponInventory from './components/WeaponInventory.svelte';
  import { ApiService } from './services/apiService';
  import type { User, Mission, MissionResult as MissionResultType, Weapon } from './types';

  export let user: User;

  let missions: Mission[] = [];
  let weapons: Weapon[] = [];
  let userWeapons: Weapon[] = [];
  let loading = false;
  let executingMissionId: number | null = null;
  let missionResult: MissionResultType | null = null;
  let activeTab: 'missions' | 'weapons' = 'missions';

  async function loadMissions() {
    loading = true;
    try {
      missions = await ApiService.getMissions();
    } catch (err) {
      console.error('Failed to load missions:', err);
    } finally {
      loading = false;
    }
  }

  async function loadWeapons() {
    try {
      weapons = await ApiService.getWeapons();
    } catch (err) {
      console.error('Failed to load weapons:', err);
    }
  }

  async function loadUserWeapons() {
    try {
      userWeapons = await ApiService.getUserWeapons(user.username);
    } catch (err) {
      console.error('Failed to load user weapons:', err);
    }
  }

  async function executeMission(missionId: number) {
    executingMissionId = missionId;
    missionResult = null;

    try {
      const result = await ApiService.executeMission(missionId, user.username);
      missionResult = result;

      // Update user stats
      user.money = result.newMoney;
      user.xp = result.newXP;
      user.level = result.newLevel;
    } catch (err) {
      console.error('Failed to execute mission:', err);
    } finally {
      executingMissionId = null;
    }
  }

  async function buyWeapon(weaponId: number) {
    try {
      const result = await ApiService.buyWeapon(user.username, weaponId);
      user.money = result.newMoney;
      
      // Reload weapons
      await loadUserWeapons();
    } catch (err) {
      console.error('Failed to buy weapon:', err);
      alert(err instanceof Error ? err.message : 'Failed to buy weapon');
    }
  }

  async function equipWeapon(weaponId: number) {
    try {
      await ApiService.equipWeapon(user.username, weaponId);
      
      // Reload weapons
      await loadUserWeapons();
    } catch (err) {
      console.error('Failed to equip weapon:', err);
      alert(err instanceof Error ? err.message : 'Failed to equip weapon');
    }
  }

  function logout() {
    window.dispatchEvent(new CustomEvent('logout'));
  }

  // Load data on component mount
  loadMissions();
  loadWeapons();
  loadUserWeapons();
</script>

<div class="main-container">
  <Header username={user.username} onLogout={logout} />
  <div class="content">
    <!-- Left Column -->
    <div class="left-column">
      <!-- Profile Section -->
      <Profile 
        username={user.username}
        level={user.level}
        money={user.money}
        xp={user.xp}
      />
      
      <!-- Weapon Inventory -->
      <WeaponInventory 
        weapons={userWeapons}
        onEquip={equipWeapon}
      />
    </div>

    <!-- Right Column -->
    <div class="right-column">
      <!-- Mission Result Section -->
      {#if missionResult}
        <MissionResult
          success={missionResult.success}
          missionName={missionResult.mission}
          moneyChange={missionResult.moneyChange}
          xpGained={missionResult.xpGained}
          onClose={() => missionResult = null}
        />
      {/if}

      <!-- Tab Navigation -->
      <div class="tab-navigation">
        <button 
          class="tab-btn"
          class:active={activeTab === 'missions'}
          on:click={() => activeTab = 'missions'}
        >
          💼 Missions
        </button>
        <button 
          class="tab-btn"
          class:active={activeTab === 'weapons'}
          on:click={() => activeTab = 'weapons'}
        >
          🔫 Weapon Shop
        </button>
      </div>

      <!-- Missions Section -->
      {#if activeTab === 'missions'}
        <section class="content-section">
          {#if loading}
            <p class="loading">Loading missions...</p>
          {:else if missions.length === 0}
            <p class="no-content">No missions available</p>
          {:else}
            <div class="items-grid">
              {#each missions as mission (mission.id)}
                <MissionCard
                  id={mission.id}
                  name={mission.name}
                  description={mission.description}
                  difficulty={mission.difficulty}
                  rewardMoney={mission.rewardMoney}
                  rewardXP={mission.rewardXP}
                  lossMoney={mission.lossMoney}
                  successRate={mission.successRate}
                  duration={mission.duration}
                  onExecute={executeMission}
                  disabled={executingMissionId !== null}
                  isExecuting={executingMissionId === mission.id}
                  durationClass={mission.durationClass}
                />
              {/each}
            </div>
          {/if}
        </section>
      {/if}

      <!-- Weapons Section -->
      {#if activeTab === 'weapons'}
        <section class="content-section">
          {#if weapons.length === 0}
            <p class="no-content">No weapons available</p>
          {:else}
            <div class="items-grid">
              {#each weapons as weapon (weapon.id)}
                <WeaponCard
                  weapon={weapon}
                  onBuy={buyWeapon}
                  owned={userWeapons.some(w => w.id === weapon.id)}
                  canAfford={user.money >= weapon.price}
                />
              {/each}
            </div>
          {/if}
        </section>
      {/if}
    </div>
  </div>
</div>

<style>
  .main-container {
    min-height: 100vh;
    padding: 80px;
  }

  .content {
    display: flex;
    gap: 30px;
  }

  .left-column {
    display: flex;
    flex-direction: column;
    gap: 10px;
    min-width: 450px;
  }

  .right-column {
    flex: 1;
  }

  .tab-navigation {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
  }

  .tab-btn {
    flex: 1;
    padding: 12px 24px;
    background: #2a2a2a;
    border: 2px solid #444;
    border-radius: 8px;
    color: #e8e6e3;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
  }

  .tab-btn:hover {
    border-color: #d4af37;
    transform: translateY(-2px);
  }

  .tab-btn.active {
    background: linear-gradient(135deg, #d4af37 0%, #aa8c2c 100%);
    border-color: #d4af37;
    color: #1a1a1a;
  }

  .content-section {
    min-height: 400px;
  }

  .items-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }

  .loading, .no-content {
    text-align: center;
    color: #888;
    padding: 40px;
    font-size: 1.2rem;
  }
</style>
