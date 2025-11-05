<script lang="ts">
  import { ApiService } from './services/apiService';
  
  let username = '';
  let password = '';
  let error = '';
  let loading = false;

  async function handleLogin() {
    error = '';
    loading = true;

    try {
      const data = await ApiService.login(username, password);

      if (data.success) {
        // Dispatch event to parent with user data
        window.dispatchEvent(new CustomEvent('login', { 
          detail: { user: data.user } 
        }));
      }
    } catch (err) {
      error = err instanceof Error ? err.message : 'Failed to connect to server';
    } finally {
      loading = false;
    }
  }
</script>

<div class="login-container">
  <div class="login-box">
    <h1>🕴️ Mafia Game</h1>
    <p class="subtitle">Enter the underworld</p>

    <form on:submit|preventDefault={handleLogin}>
      <div class="form-group">
        <label for="username">Username</label>
        <input
          id="username"
          type="text"
          bind:value={username}
          placeholder="Enter username"
          required
          disabled={loading}
        />
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input
          id="password"
          type="password"
          bind:value={password}
          placeholder="Enter password"
          required
          disabled={loading}
        />
      </div>

      {#if error}
        <div class="error">{error}</div>
      {/if}

      <button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>

    <div class="hint">
      <small>Hint: username: "don", password: "asd"</small>
    </div>
  </div>
</div>

<style>
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 20px;
  }

  .login-box {
    background: #2a2a2a;
    border: 2px solid #444;
    border-radius: 12px;
    padding: 40px;
    width: 100%;
    max-width: 400px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
  }

  h1 {
    color: #d4af37;
    text-align: center;
    margin-bottom: 10px;
    font-size: 2.5rem;
  }

  .subtitle {
    text-align: center;
    color: #888;
    margin-bottom: 30px;
    font-style: italic;
  }

  .form-group {
    margin-bottom: 20px;
  }

  label {
    display: block;
    margin-bottom: 8px;
    color: #e8e6e3;
    font-weight: 500;
  }

  input {
    width: 100%;
    padding: 12px;
    background: #1a1a1a;
    border: 2px solid #444;
    border-radius: 6px;
    color: #e8e6e3;
    font-size: 16px;
    transition: border-color 0.3s;
  }

  input:focus {
    outline: none;
    border-color: #d4af37;
  }

  input:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  button {
    width: 100%;
    padding: 14px;
    background: linear-gradient(135deg, #d4af37 0%, #aa8c2c 100%);
    border: none;
    border-radius: 6px;
    color: #1a1a1a;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
  }

  button:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(212, 175, 55, 0.4);
  }

  button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .error {
    background: #4a2020;
    border: 1px solid #8b0000;
    color: #ff6b6b;
    padding: 12px;
    border-radius: 6px;
    margin-bottom: 20px;
    text-align: center;
  }

  .hint {
    margin-top: 20px;
    text-align: center;
    color: #666;
  }
</style>
