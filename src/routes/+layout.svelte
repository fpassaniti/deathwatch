<script>
  import '../app.css';
  import { page } from '$app/stores';

  export let data;
  const { session } = data;
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
          <a href="/persons" class:active={$page.url.pathname.startsWith('/persons')}>Liste des personnes</a>
          <a href="/deaths" class:active={$page.url.pathname.startsWith('/deaths')}>Derniers décès</a>
          <a href="/account" class:active={$page.url.pathname.startsWith('/account')}>Mon compte</a>
        {:else}
          <a href="/" class:active={$page.url.pathname === '/'}>Accueil</a>
          <a href="/auth/about">About</a>
          <a href="/auth/contact">Contact</a>
        {/if}
      </nav>

      <div class="header-actions">
        {#if !session}
          <a href="/auth/register" class="btn">Sign Up</a>
          <a href="/auth/login" class="btn secondary">Log In</a>
        {:else}
          <form action="/auth/logout" method="post" style="display: inline;">
            <button type="submit" class="btn secondary">Déconnexion</button>
          </form>
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
        <a href="/privacy">Privacy Policy</a>
        <a href="/terms">Terms of Service</a>
        <a href="/contact">Contact Us</a>
      </div>
      <div class="footer-copyright">
        <p>© 2024 In Memoriam. All rights reserved.</p>
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
    padding: var(--spacing-md) var(--spacing-4xl);
    height: 64px;
  }

  .header-left {
    display: flex;
    align-items: center;
  }

  .logo a {
    display: flex;
    align-items: center;
    gap: var(--spacing-lg);
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
    gap: var(--spacing-3xl);
    align-items: center;
  }

  .main-nav a {
    color: var(--color-text-primary);
    font-weight: 500;
    font-size: 0.875rem;
    text-decoration: none;
    padding: var(--spacing-sm) 0;
    border-bottom: 2px solid transparent;
    transition: all 0.2s ease;
  }

  .main-nav a:hover {
    color: var(--color-primary);
    border-bottom-color: var(--color-primary);
    text-decoration: none;
  }

  .main-nav a.active {
    color: var(--color-primary);
    border-bottom-color: var(--color-primary);
  }

  .header-actions {
    display: flex;
    gap: var(--spacing-sm);
    align-items: center;
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
      padding: var(--spacing-md) var(--spacing-xl);
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
      gap: var(--spacing-xl);
      flex-wrap: wrap;
      justify-content: center;
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
      gap: var(--spacing-md);
    }

    .header-actions .btn {
      width: 100%;
      min-width: 120px;
    }
  }

  /* Focus states for accessibility */
  .logo a:focus,
  .main-nav a:focus,
  .header-actions .btn:focus {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
    border-radius: var(--border-radius-sm);
  }
</style>