<script>
  export let type = 'button';
  export let variant = 'primary';
  export let disabled = false;
  export let loading = false;
</script>

<button
  {type}
  class={variant}
  {disabled}
  on:click
>
  {#if loading}
    <span class="loader"></span>
  {/if}
  <slot></slot>
</button>

<style>
  button {
    display: inline-block;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
    font-weight: 500;
    font-size: 0.875rem;
    transition: background-color 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }
  
  button:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
  
  .primary {
    background-color: var(--color-theme-1);
    color: white;
  }
  
  .primary:hover:not(:disabled) {
    background-color: var(--color-theme-2);
  }
  
  .secondary {
    background-color: transparent;
    border: 1px solid var(--color-theme-1);
    color: var(--color-theme-1);
  }
  
  .secondary:hover:not(:disabled) {
    background-color: rgba(59, 130, 246, 0.05);
  }
  
  .danger {
    background-color: #ef4444;
    color: white;
  }
  
  .danger:hover:not(:disabled) {
    background-color: #dc2626;
  }
  
  .loader {
    display: inline-block;
    width: 0.875rem;
    height: 0.875rem;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    border-top-color: white;
    animation: spin 1s ease-in-out infinite;
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
</style>