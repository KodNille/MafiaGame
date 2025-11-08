<script lang="ts">
  import Header from './components/Header.svelte';
  import Profile from './components/Profile.svelte';
  import MissionCard from './components/MissionCard.svelte';
  import MissionResult from './components/MissionResult.svelte';
  import WeaponCard from './components/WeaponCard.svelte';
  import WeaponInventory from './components/WeaponInventory.svelte';
  import Hoods from './components/Hoods.svelte';
  import { ApiService } from './services/apiService';
  import type { User, Mission, MissionResult as MissionResultType, Weapon } from './types';

  export let user: User;

  let missions: Mission[] = [];
  let weapons: Weapon[] = [];
  let userWeapons: Weapon[] = [];
  let loading = false;
  let executingMissionId: number | null = null;
  let missionResult: MissionResultType | null = null;
  let activeTab: 'missions' | 'weapons' | 'realestate' | 'hoods' = 'missions';

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

  function handleTabChange(tab: 'missions' | 'weapons' | 'realestate' | 'hoods') {
    activeTab = tab;
  }

  // Load data on component mount
  loadMissions();
  loadWeapons();
  loadUserWeapons();
</script>

<div class="main-container">
  <!-- Navbar -->
  <Header 
    activeTab={activeTab} 
    onTabChange={handleTabChange} 
    onLogout={logout} 
  />

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

      <!-- Real Estate Section -->
      {#if activeTab === 'realestate'}
        <section class="content-section">
          <p class="no-content">Real Estate coming soon...</p>
        </section>
      {/if}

      <!-- Hoods Section -->
      {#if activeTab === 'hoods'}
        <section class="content-section">
          <Hoods userMoney={user.money} />
        </section>
      {/if}
    </div>
  </div>
</div>

<style>
  .main-container {
    min-height: 100vh;
    padding-top: 100px;
    max-width: 1600px;
    margin: 0 auto;
  }

  .content {
    display: flex;
    gap: 30px;
    padding: 0 40px;
    max-width: 1600px;
    margin: 0 auto;
  }

  .left-column {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 400px;
    flex-shrink: 0;
  }

  .right-column {
    flex: 1;
    max-width: 1000px;
  }

  .content-section {
    min-height: 400px;
  }

  .items-grid {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .loading, .no-content {
    text-align: center;
    color: var(--noir-text-muted);
    padding: 40px;
    font-size: 1.2rem;
    font-family: 'Courier New', monospace;
    letter-spacing: 1px;
    text-transform: uppercase;
  }
</style>
