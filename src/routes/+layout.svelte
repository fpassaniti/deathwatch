<script>
  import '../app.css';
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { invalidate } from '$app/navigation';
  import { goto } from '$app/navigation';

  export let data;

  let { supabase, session } = data;
  $: ({ supabase, session } = data);

  onMount(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, _session) => {
      if (_session?.expires_at !== session?.expires_at) {
        invalidate('supabase:auth');
      }
    });

    return () => subscription.unsubscribe();
  });

  async function handleSignOut() {
    try {
      await supabase.auth.signOut();
      goto('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  }
</script>

<svelte:head>
  <link href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;500;700;900&display=swap" rel="stylesheet">
</svelte:head>

<div class="app">
  <header class="header">
    <div class="header-content">
      <div class="header-left">
        <div class="logo">
          <a href="/">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            In Memoriam
          </a>
        </div>
      </div>

      <nav class="main-nav">
        {#if session}
          <!-- Navigation pour utilisateurs connectés -->
          <a href="/persons" class:active={$page.url.pathname.startsWith('/persons')}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H6C4.93913 15 3.92172 15.4214 3.17157 16.1716C2.42143 16.9217 2 17.9391 2 19V21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <circle cx="9" cy="7" r="4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M19 8V14M22 11H16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Mon réseau
          </a>
          <a href="/persons/add" class:active={$page.url.pathname === '/persons/add'}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H6C4.93913 15 3.92172 15.4214 3.17157 16.1716C2.42143 16.9217 2 17.9391 2 19V21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <circle cx="9" cy="7" r="4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M19 8V14M22 11H16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Ajouter
          </a>
          <a href="/deaths" class:active={$page.url.pathname.startsWith('/deaths')}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 16V8C20.9996 7.64928 20.9071 7.30481 20.7315 7.00116C20.556 6.69751 20.3037 6.44536 20 6.27L13 2.27C12.696 2.09446 12.3511 2.00205 12 2.00205C11.6489 2.00205 11.304 2.09446 11 2.27L4 6.27C3.69626 6.44536 3.44398 6.69751 3.26846 7.00116C3.09294 7.30481 3.00036 7.64928 3 8V16C3.00036 16.3507 3.09294 16.6952 3.26846 16.9988C3.44398 17.3025 3.69626 17.5546 4 17.73L11 21.73C11.304 21.9055 11.6489 21.9979 12 21.9979C12.3511 21.9979 12.696 21.9055 13 21.73L20 17.73C20.3037 17.5546 20.556 17.3025 20.7315 16.9988C20.9071 16.6952 20.9996 16.3507 21 16Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <polyline points="7.5,12 10.5,15 16.5,9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Derniers décès
          </a>
          <a href="/account" class:active={$page.url.pathname.startsWith('/account')}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <circle cx="12" cy="7" r="4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Mon compte
          </a>
        {:else}
          <!-- Navigation pour visiteurs -->
          <a href="/" class:active={$page.url.pathname === '/'}>Accueil</a>
          <a href="#features" class:active={false}>Fonctionnalités</a>
          <a href="#about" class:active={false}>À propos</a>
        {/if}
      </nav>

      <div class="header-actions">
        {#if session}
          <!-- Actions pour utilisateurs connectés -->
          <div class="user-info">
            <div class="user-avatar">
              <span>{session.user.email?.[0]?.toUpperCase() || 'U'}</span>
            </div>
            <div class="user-details">
              <span class="user-email">{session.user.email}</span>
            </div>
          </div>
          <button type="button" class="btn secondary" on:click={handleSignOut}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <polyline points="16,17 21,12 16,7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <line x1="21" y1="12" x2="9" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Déconnexion
          </button>
        {:else}
          <!-- Actions pour visiteurs -->
          <a href="/auth/login" class="btn secondary">Se connecter</a>
          <a href="/auth/register" class="btn">S'inscrire</a>
        {/if}
      </div>
    </div>
  </header>

  <main class="main-content">
    <slot />
  </main>

  <footer class="footer">
    <div class="footer-content">
      <div class="footer-links">
        <a href="/privacy">Politique de confidentialité</a>
        <a href="/terms">Conditions d'utilisation</a>
        <a href="/contact">Contact</a>
      </div>
      <div class="footer-copyright">
        <p>© 2024 In Memoriam. Tous droits réservés.</p>
      </div>
    </div>
  </footer>
</div>

<style>
  .app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  /* Header */
  .header {
    background-color: var(--color-bg-0);
    border-bottom: 1px solid var(--color-border);
    position: sticky;
    top: 0;
    z-index: 100;
    backdrop-filter: blur(8px);
  }

  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: var(--max-width);
    margin: 0 auto;
    padding: var(--spacing-md) var(--spacing-xl);
    height: 64px;
  }

  .header-left {
    display: flex;
    align-items: center;
  }

  .logo a {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    font-size: 1.125rem;
    font-weight: 700;
    color: var(--color-text-primary);
    text-decoration: none;
    transition: color 0.2s ease;
  }

  .logo a:hover {
    color: var(--color-primary);
    text-decoration: none;
  }

  .logo svg {
    color: var(--color-text-primary);
  }

  .main-nav {
    display: flex;
    gap: var(--spacing-2xl);
    align-items: center;
  }

  .main-nav a {
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);
    color: var(--color-text-primary);
    font-weight: 500;
    font-size: 0.875rem;
    text-decoration: none;
    padding: var(--spacing-sm) var(--spacing-md);
    border-radius: var(--border-radius-sm);
    transition: all 0.2s ease;
  }

  .main-nav a:hover {
    color: var(--color-primary);
    background-color: rgba(13, 128, 242, 0.1);
    text-decoration: none;
  }

  .main-nav a.active {
    color: var(--color-primary);
    background-color: rgba(13, 128, 242, 0.1);
    font-weight: 600;
  }

  .main-nav a svg {
    opacity: 0.7;
  }

  .header-actions {
    display: flex;
    gap: var(--spacing-sm);
    align-items: center;
  }

  /* User info */
  .user-info {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    padding: var(--spacing-xs) var(--spacing-sm);
    background-color: var(--color-bg-1);
    border-radius: var(--border-radius);
  }

  .user-avatar {
    width: 32px;
    height: 32px;
    border-radius: 16px;
    background: linear-gradient(135deg, var(--color-primary) 0%, #764ba2 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 600;
    font-size: 0.75rem;
  }

  .user-details {
    display: flex;
    flex-direction: column;
  }

  .user-email {
    font-size: 0.75rem;
    color: var(--color-text-secondary);
    max-width: 120px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  /* Main Content */
  .main-content {
    flex: 1;
  }

  /* Footer */
  .footer {
    background-color: var(--color-bg-0);
    border-top: 1px solid var(--color-border);
    margin-top: auto;
  }

  .footer-content {
    max-width: var(--max-width);
    margin: 0 auto;
    padding: var(--spacing-4xl) var(--spacing-xl);
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: var(--spacing-2xl);
  }

  .footer-links {
    display: flex;
    gap: var(--spacing-2xl);
    flex-wrap: wrap;
    justify-content: center;
  }

  .footer-links a {
    color: var(--color-text-secondary);
    font-size: 0.875rem;
    text-decoration: none;
    transition: color 0.2s ease;
  }

  .footer-links a:hover {
    color: var(--color-text-primary);
    text-decoration: none;
  }

  .footer-copyright {
    text-align: center;
  }

  .footer-copyright p {
    color: var(--color-text-secondary);
    font-size: 0.875rem;
    margin: 0;
  }

  /* Mobile Responsive */
  @media (max-width: 1024px) {
    .header-content {
      padding: var(--spacing-md) var(--spacing-lg);
    }

    .user-info {
      display: none;
    }
  }

  @media (max-width: 768px) {
    .header-content {
      flex-direction: column;
      height: auto;
      padding: var(--spacing-lg);
      gap: var(--spacing-lg);
    }

    .main-nav {
      gap: var(--spacing-lg);
      flex-wrap: wrap;
      justify-content: center;
    }

    .main-nav a {
      font-size: 0.75rem;
      padding: var(--spacing-xs) var(--spacing-sm);
    }

    .header-actions {
      flex-wrap: wrap;
      justify-content: center;
    }

    .footer-content {
      flex-direction: column;
      text-align: center;
      gap: var(--spacing-lg);
    }

    .footer-links {
      justify-content: center;
    }
  }

  @media (max-width: 480px) {
    .header-content {
      padding: var(--spacing-md);
    }

    .main-nav {
      flex-direction: column;
      gap: var(--spacing-sm);
    }

    .main-nav a {
      justify-content: center;
      min-width: 120px;
    }

    .header-actions .btn {
      width: 100%;
      min-width: 120px;
    }
  }

  /* Focus states for accessibility */
  .logo a:focus,
  .main-nav a:focus,
  .header-actions .btn:focus,
  .header-actions button:focus {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
    border-radius: var(--border-radius-sm);
  }

  /* Loading state */
  .header.loading {
    opacity: 0.7;
  }
</style>