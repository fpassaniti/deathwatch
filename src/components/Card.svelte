<script>
  export let padding = '1.5rem';
</script>

<div class="card" style="--padding: {padding}">
  <slot></slot>
</div>

<style>
  .card {
    padding: var(--padding);
    background-color: white;
    border-radius: 0.5rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
</style>