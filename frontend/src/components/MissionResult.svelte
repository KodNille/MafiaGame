<script lang="ts">
  export let success: boolean;
  export let missionName: string;
  export let moneyChange: number;
  export let xpGained: number;
  export let onClose: () => void;
</script>

<section class="result-section" class:success class:failure={!success}>
  <h3>{success ? '// MISSION SUCCESSFUL' : '// MISSION FAILED'}</h3>
  <p><strong>{missionName}</strong></p>
  <div class="result-details">
    <p>MONEY: <span class:positive={moneyChange > 0} class:negative={moneyChange < 0}>
      {moneyChange > 0 ? '+' : ''}{moneyChange.toLocaleString()}$
    </span></p>
    {#if xpGained > 0}
      <p>XP GAINED: <span class="positive">+{xpGained}</span></p>
    {/if}
  </div>
  <button on:click={onClose}>[ CLOSE ]</button>
</section>

<style>
  .result-section {
    background: transparent;
    padding: 30px;
    margin-bottom: 30px;
    text-align: center;
    font-family: 'Courier New', monospace;
  }

  .result-section.success {
    border-top: 2px solid #6b8e4e;
    border-left: 2px solid #6b8e4e;
  }

  .result-section.failure {
    border-top: 2px solid var(--noir-red);
    border-left: 2px solid var(--noir-red);
  }

  .result-section h3 {
    margin-bottom: 15px;
    font-size: 1.4rem;
    letter-spacing: 2px;
    color: var(--noir-text);
  }

  .result-section p {
    color: var(--noir-text);
  }

  .result-details {
    margin: 20px 0;
    font-size: 1.1rem;
    letter-spacing: 1px;
  }

  .result-details p {
    margin: 10px 0;
  }

  .positive {
    color: #6b8e4e;
    font-weight: 700;
  }

  .negative {
    color: var(--noir-red);
    font-weight: 700;
  }

  .result-section button {
    padding: 12px 35px;
    background: transparent;
    border: 3px solid var(--noir-accent);
    color: var(--noir-accent);
    cursor: pointer;
    font-weight: 700;
    letter-spacing: 1.5px;
    margin-top: 10px;
    transition: all 0.2s;
    font-family: 'Courier New', monospace;
  }

  .result-section button:hover {
    background: rgba(128, 128, 128, 0.1);
  }
</style>
