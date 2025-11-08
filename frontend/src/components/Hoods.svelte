<script lang="ts">
  export let userMoney: number;

  interface Hood {
    id: number;
    name: string;
    district: string;
    price: number;
    income: number;
    owned: boolean;
    position: { top: string; left: string };
  }

  let hoods: Hood[] = [
    { id: 1, name: "Downtown", district: "Central", price: 50000, income: 5000, owned: false, position: { top: "40%", left: "50%" } },
    { id: 2, name: "Little Italy", district: "North", price: 35000, income: 3500, owned: false, position: { top: "20%", left: "35%" } },
    { id: 3, name: "The Docks", district: "East", price: 45000, income: 4500, owned: false, position: { top: "55%", left: "70%" } },
    { id: 4, name: "Industrial Zone", district: "South", price: 30000, income: 3000, owned: false, position: { top: "75%", left: "40%" } },
    { id: 5, name: "Chinatown", district: "West", price: 40000, income: 4000, owned: false, position: { top: "35%", left: "20%" } },
    { id: 6, name: "Financial District", district: "Central", price: 75000, income: 7500, owned: false, position: { top: "50%", left: "65%" } },
  ];

  let selectedHood: Hood | null = null;

  function selectHood(hood: Hood) {
    selectedHood = hood;
  }

  function buyHood(hood: Hood) {
    if (userMoney >= hood.price && !hood.owned) {
      // TODO: Call API to purchase hood
      hood.owned = true;
      selectedHood = null;
      alert(`Successfully purchased ${hood.name}!`);
    }
  }

  function closeDetails() {
    selectedHood = null;
  }
</script>

<div class="hoods-container">
  <div class="hoods-header">
    <h2>// CITY MAP - TERRITORY CONTROL</h2>
    <p class="subtitle">PURCHASE HOODS TO EXPAND YOUR EMPIRE</p>
  </div>

  <div class="city-map">
    <div class="map-background">
      <div class="grid-overlay"></div>
      
      {#each hoods as hood (hood.id)}
        <button
          class="hood-marker"
          class:owned={hood.owned}
          class:selected={selectedHood?.id === hood.id}
          style="top: {hood.position.top}; left: {hood.position.left};"
          on:click={() => selectHood(hood)}
        >
          <div class="marker-dot"></div>
          <span class="marker-label">{hood.name}</span>
        </button>
      {/each}
    </div>

    {#if selectedHood}
      <div class="hood-details">
        <button class="close-btn" on:click={closeDetails}>✕</button>
        
        <h3>{selectedHood.name}</h3>
        <div class="detail-row">
          <span class="label">DISTRICT:</span>
          <span class="value">{selectedHood.district}</span>
        </div>
        <div class="detail-row">
          <span class="label">PRICE:</span>
          <span class="value price">${selectedHood.price.toLocaleString()}</span>
        </div>
        <div class="detail-row">
          <span class="label">INCOME/DAY:</span>
          <span class="value income">${selectedHood.income.toLocaleString()}</span>
        </div>
        <div class="detail-row">
          <span class="label">STATUS:</span>
          <span class="value status" class:owned={selectedHood.owned}>
            {selectedHood.owned ? 'OWNED' : 'AVAILABLE'}
          </span>
        </div>

        {#if !selectedHood.owned}
          <button 
            class="buy-btn"
            disabled={userMoney < selectedHood.price}
            on:click={() => buyHood(selectedHood)}
          >
            {userMoney >= selectedHood.price ? 'PURCHASE TERRITORY' : 'INSUFFICIENT FUNDS'}
          </button>
        {/if}
      </div>
    {/if}
  </div>
</div>

<style>
  .hoods-container {
    width: 100%;
  }

  .hoods-header {
    margin-bottom: 30px;
    border-bottom: 2px solid var(--noir-accent);
    padding-bottom: 15px;
  }

  .hoods-header h2 {
    color: var(--noir-accent);
    margin: 0 0 10px 0;
    font-size: 1.5rem;
    font-family: 'Courier New', monospace;
    letter-spacing: 2px;
  }

  .subtitle {
    color: var(--noir-text-muted);
    margin: 0;
    font-size: 0.9rem;
    font-family: 'Courier New', monospace;
    letter-spacing: 1px;
  }

  .city-map {
    position: relative;
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
  }

  .map-background {
    position: relative;
    width: 100%;
    height: 600px;
    background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
    border: 2px solid var(--noir-accent);
    overflow: hidden;
  }

  .grid-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: 
      repeating-linear-gradient(0deg, transparent, transparent 49px, rgba(255, 255, 255, 0.03) 49px, rgba(255, 255, 255, 0.03) 50px),
      repeating-linear-gradient(90deg, transparent, transparent 49px, rgba(255, 255, 255, 0.03) 49px, rgba(255, 255, 255, 0.03) 50px);
    pointer-events: none;
  }

  .hood-marker {
    position: absolute;
    transform: translate(-50%, -50%);
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    transition: all 0.3s;
  }

  .marker-dot {
    width: 20px;
    height: 20px;
    background: var(--noir-accent);
    border: 2px solid var(--noir-accent);
    position: relative;
    transition: all 0.3s;
  }

  .marker-dot::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 40px;
    height: 40px;
    border: 1px solid var(--noir-accent);
    opacity: 0.3;
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0%, 100% {
      transform: translate(-50%, -50%) scale(1);
      opacity: 0.3;
    }
    50% {
      transform: translate(-50%, -50%) scale(1.2);
      opacity: 0.1;
    }
  }

  .marker-label {
    color: var(--noir-text);
    font-family: 'Courier New', monospace;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    white-space: nowrap;
    opacity: 0.8;
    transition: all 0.3s;
  }

  .hood-marker:hover .marker-dot {
    transform: scale(1.3);
    box-shadow: 0 0 20px var(--noir-accent);
  }

  .hood-marker:hover .marker-label {
    opacity: 1;
    color: var(--noir-accent);
  }

  .hood-marker.owned .marker-dot {
    background: #6b8e4e;
    border-color: #6b8e4e;
  }

  .hood-marker.owned .marker-dot::after {
    border-color: #6b8e4e;
  }

  .hood-marker.owned .marker-label {
    color: #6b8e4e;
  }

  .hood-marker.selected .marker-dot {
    transform: scale(1.5);
    box-shadow: 0 0 30px var(--noir-accent);
  }

  .hood-details {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 300px;
    background: rgba(0, 0, 0, 0.95);
    border: 2px solid var(--noir-accent);
    padding: 25px;
    font-family: 'Courier New', monospace;
  }

  .close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    background: transparent;
    border: none;
    color: var(--noir-text-muted);
    font-size: 1.5rem;
    cursor: pointer;
    padding: 5px 10px;
    transition: all 0.2s;
  }

  .close-btn:hover {
    color: var(--noir-accent);
  }

  .hood-details h3 {
    color: var(--noir-accent);
    margin: 0 0 20px 0;
    font-size: 1.3rem;
    letter-spacing: 2px;
    text-transform: uppercase;
  }

  .detail-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;
    padding-bottom: 8px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .label {
    color: var(--noir-text-muted);
    font-size: 0.9rem;
    letter-spacing: 1px;
  }

  .value {
    color: var(--noir-text);
    font-weight: 700;
    font-size: 0.9rem;
  }

  .value.price {
    color: var(--noir-accent);
  }

  .value.income {
    color: #6b8e4e;
  }

  .value.status.owned {
    color: #6b8e4e;
  }

  .buy-btn {
    width: 100%;
    padding: 14px;
    margin-top: 20px;
    background: transparent;
    border: 3px solid var(--noir-accent);
    color: var(--noir-accent);
    font-size: 0.9rem;
    font-weight: 700;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.2s;
    font-family: 'Courier New', monospace;
  }

  .buy-btn:hover:not(:disabled) {
    background: rgba(128, 128, 128, 0.1);
  }

  .buy-btn:disabled {
    border-color: var(--noir-light-gray);
    color: var(--noir-text-muted);
    cursor: not-allowed;
    opacity: 0.5;
  }
</style>
