<script lang="ts">
  export let username: string;
  export let onLogout: () => void;
</script>

<header>
  <h1>🕴️ Mafia Game</h1>
  <div class="user-info">
    <span class="username">{username}</span>
    <button class="logout-btn" on:click={onLogout}>Logout</button>
  </div>
</header>

<style>
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    padding: 20px;
    background: #2a2a2a;
    border-radius: 12px;
    border: 2px solid #444;
  }

  header h1 {
    color: #d4af37;
    margin: 0;
  }

  .user-info {
    display: flex;
    align-items: center;
    gap: 15px;
  }

  .username {
    color: #d4af37;
    font-weight: 600;
    font-size: 1.1rem;
  }

  .logout-btn {
    padding: 10px 20px;
    background: #8b0000;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 600;
    transition: background 0.3s;
  }

  .logout-btn:hover {
    background: #a00000;
  }
</style>
