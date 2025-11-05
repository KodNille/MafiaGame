<script lang="ts">
  import Login from './Login.svelte';
  import MainPage from './MainPage.svelte';
  import { onMount } from 'svelte';
  import type { User } from './types';

  let isLoggedIn = false;
  let user: User | null = null;

  function handleLogin(event: CustomEvent) {
    user = event.detail.user;
    isLoggedIn = true;
  }

  function handleLogout() {
    isLoggedIn = false;
    user = null;
  }

  onMount(() => {
    window.addEventListener('login', handleLogin as EventListener);
    window.addEventListener('logout', handleLogout);

    return () => {
      window.removeEventListener('login', handleLogin as EventListener);
      window.removeEventListener('logout', handleLogout);
    };
  });
</script>

<main>
  {#if !isLoggedIn}
    <Login />
  {:else if user}
    <MainPage {user} />
  {/if}
</main>

<style>
  main {
    width: 100%;
    min-height: 100vh;
  }
</style>
