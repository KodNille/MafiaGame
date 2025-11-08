<script lang="ts">
  export let activeTab: 'missions' | 'weapons' | 'realestate' | 'hoods';
  export let onTabChange: (tab: 'missions' | 'weapons' | 'realestate' | 'hoods') => void;
  export let onLogout: () => void;
</script>

<nav class="navbar">
  <div class="navbar-content">
    <button 
      class="nav-btn"
      class:active={activeTab === 'missions'}
      on:click={() => onTabChange('missions')}
    >
      Missions
    </button>
    <button 
      class="nav-btn"
      class:active={activeTab === 'weapons'}
      on:click={() => onTabChange('weapons')}
    >
      Weapons
    </button>
    <button 
      class="nav-btn"
      class:active={activeTab === 'realestate'}
      on:click={() => onTabChange('realestate')}
    >
      Real Estate
    </button>
    <button 
      class="nav-btn"
      class:active={activeTab === 'hoods'}
      on:click={() => onTabChange('hoods')}
    >
      Hoods
    </button>
    <button class="logout-btn" on:click={onLogout}>Logout</button>
  </div>
</nav>

<style>
  .navbar {
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(10, 10, 10, 0.95);
    backdrop-filter: blur(5px);
    border-bottom: 2px solid var(--noir-accent);
    z-index: 1000;
    width: 100%;
  }

  .navbar-content {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0;
    padding: 15px 20px;
    max-width: 1200px;
    margin: 0 auto;
  }

  .nav-btn {
    padding: 12px 35px;
    background: transparent;
    border: none;
    border-right: 1px solid rgba(128, 128, 128, 0.3);
    color: var(--noir-text-muted);
    font-size: 1rem;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.2s;
    font-family: 'Courier New', monospace;
  }

  .nav-btn:last-of-type {
    border-right: none;
  }

  .nav-btn:hover {
    color: var(--noir-accent);
    background: rgba(255, 255, 255, 0.05);
  }

  .nav-btn.active {
    color: var(--noir-accent);
    background: rgba(255, 255, 255, 0.1);
  }

  .logout-btn {
    margin-left: auto;
    padding: 10px 25px;
    background: transparent;
    border: 2px solid var(--noir-red);
    color: var(--noir-red);
    font-size: 0.9rem;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.3s;
    font-family: 'Courier New', monospace;
  }

  .logout-btn:hover {
    background: var(--noir-red);
    color: #c4c4c4;
  }
</style>
