<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  
  export let id: number;
  export let name: string;
  export let description: string;
  export let difficulty: 'easy' | 'medium' | 'hard';
  export let rewardMoney: number;
  export let rewardXP: number;
  export let lossMoney: number;
  export let successRate: number;
  export let duration: number; // in milliseconds
  export let onExecute: (id: number) => void;
  export let disabled: boolean = false;
  export let isExecuting: boolean = false;
  export let durationClass: string = '';

  let progress = 0;
  let interval: number | null = null;

  $: if (isExecuting) {
    startProgress();
  } else {
    stopProgress();
  }

  function startProgress() {
    progress = 0;
    const steps = 100;
    const stepDuration = duration / steps;
    
    interval = window.setInterval(() => {
      progress += 1;
      if (progress >= 100) {
        stopProgress();
      }
    }, stepDuration);
  }

  function stopProgress() {
    if (interval !== null) {
      clearInterval(interval);
      interval = null;
    }
    if (!isExecuting) {
      progress = 0;
    }
  }

  onDestroy(() => {
    stopProgress();
  });

  function getDifficultyColor(difficulty: string): string {
    switch (difficulty) {
      case 'easy': return '#4CAF50';
      case 'medium': return '#FF9800';
      case 'hard': return '#f44336';
      default: return '#888';
    }
  }

  function handleExecute() {
    onExecute(id);
  }
</script>

<div class="mission-card">
  <div class="card-content">
    <div class="card-image">
      <img src="https://placehold.co/200x200/1a1a1a/b8a472?text=Mission" alt={name} />
    </div>
    <div class="card-info">
      <div class="mission-header">
        <h3>{name}</h3>
        <span class="difficulty" style="color: {getDifficultyColor(difficulty)}">
          {difficulty.toUpperCase()}
        </span>
      </div>
      <p class="mission-description">{description}</p>
      <div class="mission-stats">
        <div class="stat">
          <span class="stat-label">Success Rate:</span>
          <span class="stat-value">{(successRate * 100).toFixed(0)}%</span>
        </div>
        <div class="stat">
          <span class="stat-label">Time:</span>
          <span class="stat-value">{durationClass}</span>
        </div>
        <div class="stat success-stat">
          <span class="stat-label">💰 Reward:</span>
          <span class="stat-value">${rewardMoney.toLocaleString()}</span>
        </div>
        <div class="stat success-stat">
          <span class="stat-label">⭐ XP:</span>
          <span class="stat-value">+{rewardXP}</span>
        </div>
        <div class="stat fail-stat">
          <span class="stat-label">💸 Loss:</span>
          <span class="stat-value">-${lossMoney.toLocaleString()}</span>
        </div>
      </div>
    </div>
    <button 
      class="mission-btn"
      class:executing={isExecuting}
      on:click={handleExecute}
      {disabled}
    >
      {#if isExecuting}
        <div class="progress-bar">
          <div class="progress-fill" style="width: {progress}%"></div>
        </div>
        <span class="btn-text">Executing... {progress}%</span>
      {:else}
        Start Mission
      {/if}
    </button>
  </div>
</div>

<style>
  .mission-card {
    background: transparent;
    border: 1px solid var(--noir-light-gray);
    border-left: 2px solid var(--noir-accent);
    border-radius: 0;
    padding: 20px;
    transition: all 0.3s;
    width: 100%;
    min-height: 240px;
    position: relative;
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

  .mission-card::before {
    display: none;
  }

  .mission-card:hover {
    border-left-color: var(--noir-accent);
    background: rgba(26, 26, 26, 0.95);
  }

  .mission-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
    padding-bottom: 10px;
    border-bottom: 1px solid rgba(240, 230, 140, 0.1);
  }

  .mission-header h3 {
    color: var(--noir-text);
    margin: 0;
    font-size: 1.4rem;
    font-family: 'Courier New', monospace;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
  }

  .difficulty {
    font-size: 0.8rem;
    font-weight: 700;
    padding: 4px 10px;
    background: rgba(0, 0, 0, 0.5);
    border: 1px solid currentColor;
    border-radius: 0;
    font-family: 'Courier New', monospace;
    letter-spacing: 1px;
  }

  .mission-description {
    color: var(--noir-text-muted);
    margin-bottom: 15px;
    line-height: 1.6;
    font-size: 1.05rem;
    font-family: 'Courier New', monospace;
    font-weight: 500;
  }

  .mission-stats {
    background: rgba(0, 0, 0, 0.4);
    border: 1px solid var(--noir-light-gray);
    border-radius: 0;
    padding: 15px;
    margin-bottom: 15px;
    box-shadow: inset 2px 2px 5px rgba(0, 0, 0, 0.5);
  }

  .stat {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
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

  .success-stat .stat-value {
    color: #6b8e4e;
  }

  .fail-stat .stat-value {
    color: var(--noir-red);
  }

  .mission-btn {
    padding: 14px 30px;
    background: transparent;
    border: 3px solid var(--noir-accent);
    color: var(--noir-accent);
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.2s;
    position: relative;
    overflow: hidden;
    font-family: 'Courier New', monospace;
    white-space: nowrap;
    min-width: 180px;
  }

  .mission-btn:hover:not(.executing) {
    background: rgba(128, 128, 128, 0.1);
  }

  .mission-btn.executing {
    background: transparent;
    color: var(--noir-accent);
    border-color: var(--noir-accent);
  }

  .progress-bar {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--noir-black);
    z-index: 0;
  }

  .progress-fill {
    height: 100%;
    background: var(--noir-accent);
    transition: width 0.1s linear;
  }

  .btn-text {
    position: relative;
    z-index: 1;
  }

  .mission-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
</style>
