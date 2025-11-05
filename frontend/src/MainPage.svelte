<script lang="ts">
  import Header from './components/Header.svelte';
  import Profile from './components/Profile.svelte';
  import MissionCard from './components/MissionCard.svelte';
  import MissionResult from './components/MissionResult.svelte';
  import { ApiService } from './services/apiService';
  import type { User, Mission, MissionResult as MissionResultType } from './types';

  export let user: User;

  let missions: Mission[] = [];
  let loading = false;
  let executingMission = false;
  let missionResult: MissionResultType | null = null;

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

  async function executeMission(missionId: number) {
    executingMission = true;
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
      executingMission = false;
    }
  }

  function logout() {
    window.dispatchEvent(new CustomEvent('logout'));
  }

  // Load missions on component mount
  loadMissions();
</script>

<div class="main-container">
  <Header username={user.username} onLogout={logout} />

  <div class="content">
    <!-- Profile Section -->
    <Profile 
      username={user.username}
      level={user.level}
      money={user.money}
      xp={user.xp}
    />

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
    <section class="missions-section">
      <h2>💼 Available Missions</h2>
      
      {#if loading}
        <p class="loading">Loading missions...</p>
      {:else if missions.length === 0}
        <p class="no-missions">No missions available</p>
      {:else}
        <div class="missions-grid">
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
              onExecute={executeMission}
              disabled={executingMission}
            />
          {/each}
        </div>
      {/if}
    </section>
  </div>
</div>

<style>
  .main-container {
    min-height: 100vh;
    padding: 20px;
  }

  .content {
    max-width: 1400px;
    margin: 0 auto;
  }

  /* Missions Section */
  .missions-section h2 {
    color: #d4af37;
    margin-bottom: 20px;
  }

  .missions-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 20px;
  }

  .loading, .no-missions {
    text-align: center;
    color: #888;
    padding: 40px;
    font-size: 1.2rem;
  }
</style>
