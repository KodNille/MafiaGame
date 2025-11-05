<script lang="ts">
  export let success: boolean;
  export let missionName: string;
  export let moneyChange: number;
  export let xpGained: number;
  export let onClose: () => void;
</script>

<section class="result-section" class:success class:failure={!success}>
  <h3>{success ? '✅ Mission Successful!' : '❌ Mission Failed!'}</h3>
  <p><strong>{missionName}</strong></p>
  <div class="result-details">
    <p>Money: <span class:positive={moneyChange > 0} class:negative={moneyChange < 0}>
      {moneyChange > 0 ? '+' : ''}{moneyChange.toLocaleString()}$
    </span></p>
    {#if xpGained > 0}
      <p>XP Gained: <span class="positive">+{xpGained}</span></p>
    {/if}
  </div>
  <button on:click={onClose}>Close</button>
</section>

<style>
  .result-section {
    background: #2a2a2a;
    border: 2px solid #444;
    border-radius: 12px;
    padding: 25px;
    margin-bottom: 30px;
    text-align: center;
  }

  .result-section.success {
    border-color: #4CAF50;
    background: #1a3a1a;
  }

  .result-section.failure {
    border-color: #f44336;
    background: #3a1a1a;
  }

  .result-section h3 {
    margin-bottom: 15px;
    font-size: 1.5rem;
  }

  .result-details {
    margin: 20px 0;
    font-size: 1.2rem;
  }

  .result-details p {
    margin: 10px 0;
  }

  .positive {
    color: #4CAF50;
    font-weight: 600;
  }

  .negative {
    color: #f44336;
    font-weight: 600;
  }

  .result-section button {
    padding: 10px 30px;
    background: #d4af37;
    color: #1a1a1a;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 600;
    margin-top: 10px;
    transition: background 0.3s;
  }

  .result-section button:hover {
    background: #c09a2a;
  }
</style>
