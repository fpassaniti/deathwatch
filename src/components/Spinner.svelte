<script>
  export let size = 'medium'; // 'small', 'medium', 'large'
  export let text = '';
  export let overlay = false;
  export let center = true;
</script>

{#if overlay}
  <div class="loading-overlay" class:center>
    <div class="loading-content">
      <div class="spinner" class:small={size === 'small'} class:large={size === 'large'}></div>
      {#if text}
        <p class="loading-text">{text}</p>
      {/if}
    </div>
  </div>
{:else}
  <div class="loading-inline" class:center>
    <div class="spinner" class:small={size === 'small'} class:large={size === 'large'}></div>
    {#if text}
      <p class="loading-text">{text}</p>
    {/if}
  </div>
{/if}

<style>
  .loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(4px);
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .loading-overlay.center {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .loading-inline {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-md);
    padding: var(--spacing-lg);
  }

  .loading-inline.center {
    justify-content: center;
    text-align: center;
  }

  .loading-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-lg);
    background: var(--color-bg-0);
    padding: var(--spacing-2xl);
    border-radius: var(--border-radius);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    border: 1px solid var(--color-border-light);
  }

  .spinner {
    width: 40px;
    height: 40px;
    border: 3px solid var(--color-border);
    border-radius: 50%;
    border-top-color: var(--color-primary);
    animation: spin 1s ease-in-out infinite;
  }

  .spinner.small {
    width: 24px;
    height: 24px;
    border-width: 2px;
  }

  .spinner.large {
    width: 56px;
    height: 56px;
    border-width: 4px;
  }

  .loading-text {
    margin: 0;
    color: var(--color-text-secondary);
    font-size: 0.875rem;
    font-weight: 500;
    text-align: center;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  /* Animation d'entrée */
  .loading-overlay {
    animation: fadeIn 0.2s ease-out;
  }

  .loading-content {
    animation: slideUp 0.3s ease-out;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Mode sombre */
  @media (prefers-color-scheme: dark) {
    .loading-overlay {
      background: rgba(18, 20, 23, 0.9);
    }

    .loading-content {
      background: var(--color-bg-dark, #1a1d21);
      border-color: #333;
    }
  }
</style>