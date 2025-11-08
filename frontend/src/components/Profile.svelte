<script lang="ts">
  export let username: string;
  export let level: number;
  export let money: number;
  export let xp: number;

  $: xpToNextLevel = 500;
  $: xpProgress = xp % xpToNextLevel;
  $: xpProgressPercent = (xpProgress / xpToNextLevel) * 100;
</script>

<section class="profile-section">
  <h2>// YOUR PROFILE</h2>
  <div class="profile-card">
    <div class="profile-item">
      <span class="label">BOSS NAME:</span>
      <span class="value">{username}</span>
    </div>
    <div class="profile-item">
      <span class="label">LEVEL:</span>
      <span class="value level">{level}</span>
    </div>
    <div class="profile-item">
      <span class="label">MONEY:</span>
      <span class="value money">${money.toLocaleString()}</span>
    </div>
    <div class="profile-item">
      <span class="label">XP:</span>
      <span class="value xp">{xp} XP</span>
    </div>
    <div class="xp-bar">
      <div class="xp-progress" style="width: {xpProgressPercent}%"></div>
    </div>
    <small class="xp-info">{xpProgress} / {xpToNextLevel} XP TO NEXT LEVEL</small>
  </div>
</section>

<style>
  .profile-section {
    margin-bottom: 30px;
    width: 100%;
    flex-shrink: 0;
  }

  .profile-section h2 {
    color: var(--noir-accent);
    margin-bottom: 15px;
    font-family: 'Courier New', monospace;
    font-size: 1.3rem;
    letter-spacing: 2px;
  }

  .profile-card {
    background: transparent;
    border: 1px solid var(--noir-light-gray);
    border-top: 2px solid var(--noir-accent);
    border-radius: 0;
    padding: 25px;
  }

  .profile-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;
    font-size: 1.1rem;
    font-family: 'Courier New', monospace;
    padding: 8px 0;
    border-bottom: 1px solid rgba(128, 128, 128, 0.2);
  }

  .profile-item .label {
    color: var(--noir-text-muted);
    font-weight: 700;
    letter-spacing: 1px;
  }

  .profile-item .value {
    font-weight: 700;
    color: var(--noir-text);
  }

  .profile-item .level {
    color: #9370db;
  }

  .profile-item .money {
    color: #6b8e4e;
  }

  .profile-item .xp {
    color: #4682b4;
  }

  .xp-bar {
    height: 18px;
    background: rgba(0, 0, 0, 0.5);
    border: 1px solid var(--noir-light-gray);
    border-radius: 0;
    overflow: hidden;
    margin-top: 15px;
    margin-bottom: 8px;
    box-shadow: inset 2px 2px 5px rgba(0, 0, 0, 0.6);
  }

  .xp-progress {
    height: 100%;
    background: var(--noir-accent);
    transition: width 0.5s ease;
  }

  .xp-info {
    color: var(--noir-text-muted);
    font-size: 0.8rem;
    font-family: 'Courier New', monospace;
    letter-spacing: 0.5px;
  }
</style>
