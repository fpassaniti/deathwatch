<script>
  import {onMount} from 'svelte';
  import {getPersons} from '$lib/database';

  export let data;
  const {session} = data;

  let persons = [];
  let loading = true;
  let error = null;

  onMount(async () => {
    await loadPersons();
  });

  async function loadPersons() {
    loading = true;
    error = null;

    try {
      if (session) {
        const {data: personsData, error: dbError} = await getPersons(session.user.id);

        if (dbError) throw dbError;

        persons = personsData || [];
      } else {
        // Demo data matching Figma design
        persons = [
          {
            id: 1,
            first_name: 'Sophia',
            last_name: 'Dubois',
            status: 'alive',
            avatar_color: '#E8B4CB'
          },
          {
            id: 2,
            first_name: 'Jean-Pierre',
            last_name: 'Martin',
            status: 'deceased',
            death_date: '2024-01-15',
            avatar_color: '#A8D8EA'
          },
          {
            id: 3,
            first_name: 'Isabelle',
            last_name: 'Lefevre',
            status: 'alive',
            avatar_color: '#FFD93D'
          },
          {
            id: 4,
            first_name: 'Antoine',
            last_name: 'Moreau',
            status: 'deceased',
            death_date: '2024-02-20',
            avatar_color: '#6BCF7F'
          },
          {
            id: 5,
            first_name: 'Camille',
            last_name: 'Bernard',
            status: 'alive',
            avatar_color: '#FF6B6B'
          }
        ];
      }
    } catch (e) {
      error = e.message;
    } finally {
      loading = false;
    }
  }

  function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    });
  }
</script>

<div class="network-page">
  <div class="hero-container">
    <div class="page-header">
      <div class="header-content">
        <h1>My Network</h1>
      </div>

      <div class="header-actions">
        <div class="search-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="2" />
            <path d="21 21L16.65 16.65" stroke="currentColor" stroke-width="2" />
          </svg>
        </div>

        <div class="profile-btn">
          <div class="profile-avatar"></div>
        </div>
      </div>
    </div>
  </div>

  <div class="container">
    {#if error}
      <div class="error">
        {error}
      </div>
    {/if}

    {#if loading}
      <div class="loading-state">
        <div class="loader"></div>
        <p>Loading your network...</p>
      </div>
    {:else if persons.length === 0}
      <div class="empty-state">
        <div class="empty-icon">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H6C4.93913 15 3.92172 15.4214 3.17157 16.1716C2.42143 16.9217 2 17.9391 2 19V21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <circle cx="9" cy="7" r="4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M19 8V14M22 11H16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </div>
        <h3>No network connections yet</h3>
        <p>Start by adding people you want to follow</p>
        <a href="/persons/add" class="btn large">Add Your First Person</a>
      </div>
    {:else}
      <div class="network-list">
        {#each persons as person}
          <div class="network-item">
            <div class="person-main">
              <div class="person-avatar" style="background-color: {person.avatar_color || '#E8B4CB'}">
                <span>{person.first_name[0]}{person.last_name[0]}</span>
              </div>
              <div class="person-info">
                <h3>{person.first_name} {person.last_name}</h3>
                <div class="person-status">
                  {#if person.status === 'alive'}
                    <span class="status-text">Living</span>
                  {:else}
                    <span class="status-text">Deceased - {formatDate(person.death_date)}</span>
                  {/if}
                </div>
              </div>
            </div>

            <div class="person-actions">
              <div class="status-indicator" class:alive={person.status === 'alive'} class:deceased={person.status === 'deceased'}></div>
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</div>

<style>
  .network-page {
    min-height: 100vh;
    background-color: var(--color-bg-0);
  }

  .page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-4xl);
  }

  .header-content h1 {
    font-size: 2rem;
    font-weight: 700;
    color: var(--color-text-primary);
    margin: 0;
    max-width: 288px;
  }

  .header-actions {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
  }

  .search-btn {
    width: 40px;
    height: 40px;
    background-color: var(--color-bg-2);
    border-radius: var(--border-radius);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background-color 0.2s ease;
  }

  .search-btn:hover {
    background-color: #E9ECEF;
  }

  .search-btn svg {
    color: var(--color-text-primary);
  }

  .profile-btn {
    width: 40px;
    height: 40px;
    cursor: pointer;
  }

  .profile-avatar {
    width: 100%;
    height: 100%;
    border-radius: 20px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  }

  .network-list {
    display: flex;
    flex-direction: column;
    gap: 0;
    background-color: var(--color-bg-0);
    border-radius: var(--border-radius);
    overflow: hidden;
  }

  .network-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--spacing-sm) var(--spacing-lg);
    border-bottom: 1px solid var(--color-border);
    transition: background-color 0.2s ease;
  }

  .network-item:hover {
    background-color: var(--color-bg-1);
  }

  .network-item:last-child {
    border-bottom: none;
  }

  .person-main {
    display: flex;
    align-items: center;
    gap: var(--spacing-lg);
    flex: 1;
  }

  .person-avatar {
    width: 56px;
    height: 56px;
    border-radius: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 1.125rem;
    color: var(--color-text-light);
    flex-shrink: 0;
  }

  .person-info {
    flex: 1;
  }

  .person-info h3 {
    font-size: 1rem;
    font-weight: 500;
    margin: 0 0 var(--spacing-xs) 0;
    color: var(--color-text-primary);
  }

  .status-text {
    font-size: 0.875rem;
    color: var(--color-text-secondary);
  }

  .person-actions {
    display: flex;
    align-items: center;
  }

  .status-indicator {
    width: 12px;
    height: 12px;
    border-radius: 6px;
    flex-shrink: 0;
  }

  .status-indicator.alive {
    background-color: #088738;
  }

  .status-indicator.deceased {
    background-color: #DC2626;
  }

  .loading-state, .empty-state {
    text-align: center;
    padding: var(--spacing-6xl) var(--spacing-xl);
  }

  .empty-icon {
    color: var(--color-text-secondary);
    margin-bottom: var(--spacing-xl);
  }

  .empty-state h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: var(--spacing-sm);
    color: var(--color-text-primary);
  }

  .empty-state p {
    color: var(--color-text-secondary);
    margin-bottom: var(--spacing-xl);
  }

  .loading-state p {
    color: var(--color-text-secondary);
    margin-top: var(--spacing-lg);
  }

  .error {
    background: #FEE2E2;
    border: 1px solid #EF4444;
    color: #B91C1C;
    padding: var(--spacing-md);
    border-radius: var(--border-radius);
    margin-bottom: var(--spacing-lg);
    font-size: 0.875rem;
  }

  @media (max-width: 768px) {
    .page-header {
      flex-direction: column;
      gap: var(--spacing-xl);
      align-items: flex-start;
    }

    .header-content h1 {
      font-size: 1.75rem;
      max-width: none;
    }

    .header-actions {
      align-self: flex-end;
    }

    .network-item {
      padding: var(--spacing-md);
    }

    .person-main {
      gap: var(--spacing-md);
    }
  }

  @media (max-width: 480px) {
    .person-info h3 {
      font-size: 0.875rem;
    }

    .status-text {
      font-size: 0.75rem;
    }

    .person-avatar {
      width: 48px;
      height: 48px;
      border-radius: 24px;
      font-size: 1rem;
    }
  }
</style>