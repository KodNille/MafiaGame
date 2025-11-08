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
    <h1>// MAFIA GAME</h1>
    <p class="subtitle">[ ENTER THE UNDERWORLD ]</p>

    <form on:submit|preventDefault={handleLogin}>
      <div class="form-group">
        <label for="username">USERNAME:</label>
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
        <label for="password">PASSWORD:</label>
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
        <div class="error">// ERROR: {error}</div>
      {/if}

      <button type="submit" disabled={loading}>
        {loading ? '[ AUTHENTICATING... ]' : '[ LOGIN ]'}
      </button>
    </form>

    <div class="hint">
      <small>// DEV: username: "don" | password: "asd"</small>
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
    background: transparent;
    border-top: 2px solid var(--noir-accent);
    padding: 50px 40px;
    width: 100%;
    max-width: 450px;
    position: relative;
  }

  .login-box::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: var(--noir-accent);
    opacity: 0.3;
  }

  h1 {
    color: var(--noir-accent);
    text-align: center;
    margin-bottom: 10px;
    font-size: 2rem;
    font-family: 'Courier New', monospace;
    font-weight: 700;
    letter-spacing: 3px;
  }

  .subtitle {
    text-align: center;
    color: var(--noir-text-muted);
    margin-bottom: 40px;
    font-family: 'Courier New', monospace;
    font-size: 0.9rem;
    letter-spacing: 2px;
  }

  .form-group {
    margin-bottom: 25px;
  }

  label {
    display: block;
    margin-bottom: 8px;
    color: var(--noir-text);
    font-weight: 700;
    font-family: 'Courier New', monospace;
    letter-spacing: 1px;
    font-size: 0.9rem;
  }

  input {
    width: 100%;
    padding: 14px;
    background: rgba(0, 0, 0, 0.5);
    border: 1px solid var(--noir-light-gray);
    color: var(--noir-text);
    font-size: 15px;
    font-family: 'Courier New', monospace;
    transition: all 0.3s;
  }

  input:focus {
    outline: none;
    border-color: var(--noir-accent);
  }

  input:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  button {
    width: 100%;
    padding: 16px;
    background: transparent;
    border: 3px solid var(--noir-accent);
    color: var(--noir-accent);
    font-size: 15px;
    font-weight: 700;
    letter-spacing: 2px;
    cursor: pointer;
    transition: all 0.2s;
    font-family: 'Courier New', monospace;
    margin-top: 10px;
  }

  button:hover:not(:disabled) {
    background: rgba(128, 128, 128, 0.1);
  }

  button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .error {
    background: rgba(139, 0, 0, 0.2);
    border-left: 2px solid var(--noir-red);
    color: #ff6b6b;
    padding: 12px 15px;
    margin-bottom: 20px;
    text-align: left;
    font-family: 'Courier New', monospace;
    font-size: 0.9rem;
    letter-spacing: 0.5px;
  }

  .hint {
    margin-top: 30px;
    text-align: center;
    color: var(--noir-text-muted);
    font-family: 'Courier New', monospace;
    font-size: 0.8rem;
    letter-spacing: 0.5px;
  }
</style>
