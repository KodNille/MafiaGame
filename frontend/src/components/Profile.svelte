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
  <h2>👤 Your Profile</h2>
  <div class="profile-card">
    <div class="profile-item">
      <span class="label">Boss Name:</span>
      <span class="value">{username}</span>
    </div>
    <div class="profile-item">
      <span class="label">Level:</span>
      <span class="value level">{level}</span>
    </div>
    <div class="profile-item">
      <span class="label">Money:</span>
      <span class="value money">${money.toLocaleString()}</span>
    </div>
    <div class="profile-item">
      <span class="label">XP:</span>
      <span class="value xp">{xp} XP</span>
    </div>
    <div class="xp-bar">
      <div class="xp-progress" style="width: {xpProgressPercent}%"></div>
    </div>
    <small class="xp-info">{xpProgress} / {xpToNextLevel} XP to next level</small>
  </div>
</section>

<style>
  .profile-section {
    margin-bottom: 30px;
  }

  .profile-section h2 {
    color: #d4af37;
    margin-bottom: 15px;
  }

  .profile-card {
    background: #2a2a2a;
    border: 2px solid #444;
    border-radius: 12px;
    padding: 25px;
  }

  .profile-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;
    font-size: 1.1rem;
  }

  .profile-item .label {
    color: #888;
    font-weight: 500;
  }

  .profile-item .value {
    font-weight: 600;
    color: #e8e6e3;
  }

  .profile-item .level {
    color: #9c27b0;
  }

  .profile-item .money {
    color: #4CAF50;
  }

  .profile-item .xp {
    color: #2196F3;
  }

  .xp-bar {
    height: 20px;
    background: #1a1a1a;
    border-radius: 10px;
    overflow: hidden;
    margin-top: 15px;
    margin-bottom: 5px;
  }

  .xp-progress {
    height: 100%;
    background: linear-gradient(90deg, #2196F3, #21CBF3);
    transition: width 0.5s ease;
  }

  .xp-info {
    color: #888;
    font-size: 0.9rem;
  }
</style>
