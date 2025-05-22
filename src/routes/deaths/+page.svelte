<script>
  import {onMount} from 'svelte';
  import {getDeaths, getCities} from '$lib/database';

  export let data;

  let deaths = [];
  let loading = true;
  let error = null;
  let selectedRegion = '';
  let selectedCity = '';
  let cities = [];
  let currentPage = 1;
  let totalPages = 5;

  onMount(async () => {
    await Promise.all([
      loadDeaths(),
      loadCities()
    ]);
  });

  async function loadCities() {
    try {
      const {data: citiesData, error: citiesError} = await getCities();

      if (citiesError) throw citiesError;

      if (citiesData && citiesData.length > 0) {
        cities = citiesData.map(c => c.city).filter(Boolean);
      } else {
        cities = ['Paris', 'Lyon', 'Marseille', 'Lille', 'Bordeaux', 'Toulouse', 'Nantes', 'Strasbourg'];
      }
    } catch (e) {
      console.error('Error loading cities:', e);
      cities = ['Paris', 'Lyon', 'Marseille', 'Lille', 'Bordeaux', 'Toulouse', 'Nantes', 'Strasbourg'];
    }
  }

  async function loadDeaths() {
    loading = true;
    error = null;

    try {
      const filters = {
        limit: 50
      };

      if (selectedCity) {
        filters.city = selectedCity;
      }

      const {data: deathsData, error: deathsError} = await getDeaths(filters);

      if (deathsError) throw deathsError;

      if (deathsData && deathsData.length > 0) {
        deaths = deathsData;
      } else {
        // Demo data matching Figma design
        deaths = [
          {
            id: 1,
            first_name: 'Eleanor',
            last_name: 'Bennett',
            death_date: '2024-10-26',
            avatar_color: '#E8B4CB'
          },
          {
            id: 2,
            first_name: 'Charles',
            last_name: 'Thompson',
            death_date: '2024-10-25',
            avatar_color: '#A8D8EA'
          },
          {
            id: 3,
            first_name: 'Sophia',
            last_name: 'Carter',
            death_date: '2024-10-24',
            avatar_color: '#FFD93D'
          },
          {
            id: 4,
            first_name: 'Daniel',
            last_name: 'Evans',
            death_date: '2024-10-23',
            avatar_color: '#6BCF7F'
          },
          {
            id: 5,
            first_name: 'Olivia',
            last_name: 'Harper',
            death_date: '2024-10-22',
            avatar_color: '#FF6B6B'
          },
          {
            id: 6,
            first_name: 'William',
            last_name: 'Foster',
            death_date: '2024-10-21',
            avatar_color: '#4ECDC4'
          }
        ];
      }
    } catch (e) {
      error = e.message;
    } finally {
      loading = false;
    }
  }

  function handleRegionChange() {
    loadDeaths();
  }

  function handleCityChange() {
    loadDeaths();
  }

  function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  function goToPage(page) {
    currentPage = page;
    // In a real app, this would reload data for the new page
  }

  function nextPage() {
    if (currentPage < totalPages) {
      currentPage++;
    }
  }

  function prevPage() {
    if (currentPage > 1) {
      currentPage--;
    }
  }
</script>

<div class="deaths-page">
  <div class="hero-container">
    <div class="page-header">
      <div class="header-content">
        <h1>Recent Deaths</h1>
        <p>Find recent death announcements in your area. Filter by city or region to narrow your search.</p>
      </div>

      <div class="search-bar">
        <div class="search-input">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="2" />
            <path d="21 21L16.65 16.65" stroke="currentColor" stroke-width="2" />
          </svg>
          <input type="text" placeholder="Search" />
        </div>
      </div>
    </div>

    <div class="filters-section">
      <div class="filter-dropdown">
        <select bind:value={selectedRegion} on:change={handleRegionChange}>
          <option value="">Select Region</option>
          <option value="ile-de-france">Île-de-France</option>
          <option value="auvergne-rhone-alpes">Auvergne-Rhône-Alpes</option>
          <option value="provence-alpes-cote-azur">Provence-Alpes-Côte d'Azur</option>
          <option value="occitanie">Occitanie</option>
        </select>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </div>

      <div class="filter-dropdown">
        <select bind:value={selectedCity} on:change={handleCityChange}>
          <option value="">Select City</option>
          {#each cities as city}
            <option value={city}>{city}</option>
          {/each}
        </select>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </div>
    </div>
  </div>

  <div class="container">
    {#if error}
      <div class="error">
        {error}
      </div>
    {/if}

    <div class="section-header">
      <h2>Recent Announcements</h2>
    </div>

    {#if loading}
      <div class="loading-state">
        <div class="loader"></div>
        <p>Loading recent announcements...</p>
      </div>
    {:else if deaths.length === 0}
      <div class="empty-state">
        <p>No recent announcements found.</p>
      </div>
    {:else}
      <div class="deaths-list">
        {#each deaths as death}
          <div class="death-item">
            <div class="death-avatar" style="background-color: {death.avatar_color || '#E8B4CB'}">
              <span>{death.first_name[0]}{death.last_name[0]}</span>
            </div>
            <div class="death-info">
              <h3>{death.first_name} {death.last_name}</h3>
              <p>Died on {formatDate(death.death_date)}</p>
            </div>
          </div>
        {/each}
      </div>

      <div class="pagination">
        <button class="pagination-btn" on:click={prevPage} disabled={currentPage === 1}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>

        {#each Array(totalPages) as _, i}
          <button
            class="pagination-number"
            class:active={currentPage === i + 1}
            on:click={() => goToPage(i + 1)}
          >
            {i + 1}
          </button>
        {/each}

        <button class="pagination-btn" on:click={nextPage} disabled={currentPage === totalPages}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
      </div>
    {/if}
  </div>
</div>

<style>
  .deaths-page {
    min-height: 100vh;
    background-color: var(--color-bg-0);
  }

  .page-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: var(--spacing-4xl);
    margin-bottom: var(--spacing-2xl);
  }

  .header-content {
    flex: 1;
    max-width: 644px;
  }

  .header-content h1 {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: var(--spacing-md);
    color: var(--color-text-primary);
  }

  .header-content p {
    color: var(--color-text-secondary);
    font-size: 0.875rem;
    line-height: 1.5;
    margin: 0;
  }

  .search-bar {
    flex-shrink: 0;
  }

  .search-input {
    position: relative;
    display: flex;
    align-items: center;
    background-color: var(--color-bg-2);
    border-radius: var(--border-radius);
    padding: 0 0 0 var(--spacing-lg);
    height: 40px;
    min-width: 200px;
  }

  .search-input svg {
    color: var(--color-text-secondary);
    margin-right: var(--spacing-sm);
  }

  .search-input input {
    border: none;
    background: transparent;
    font-size: 1rem;
    color: var(--color-text-primary);
    width: 100%;
    padding: var(--spacing-sm) var(--spacing-lg) var(--spacing-sm) var(--spacing-sm);
  }

  .search-input input::placeholder {
    color: var(--color-text-secondary);
  }

  .search-input input:focus {
    outline: none;
    box-shadow: none;
  }

  .filters-section {
    display: flex;
    gap: var(--spacing-lg);
    margin-bottom: var(--spacing-4xl);
  }

  .filter-dropdown {
    position: relative;
    min-width: 200px;
  }

  .filter-dropdown select {
    appearance: none;
    width: 100%;
    height: 56px;
    padding: 0 var(--spacing-4xl) 0 var(--spacing-lg);
    background-color: var(--color-bg-0);
    border: 1px solid var(--color-border-light);
    border-radius: var(--border-radius);
    font-size: 1rem;
    color: var(--color-text-primary);
    cursor: pointer;
  }

  .filter-dropdown svg {
    position: absolute;
    right: var(--spacing-lg);
    top: 50%;
    transform: translateY(-50%);
    color: var(--color-text-secondary);
    pointer-events: none;
  }

  .section-header {
    margin-bottom: var(--spacing-xl);
  }

  .section-header h2 {
    font-size: 1.375rem;
    font-weight: 700;
    color: var(--color-text-primary);
    margin: 0;
  }

  .deaths-list {
    display: flex;
    flex-direction: column;
    gap: 0;
    background-color: var(--color-bg-0);
    border-radius: var(--border-radius);
    overflow: hidden;
    margin-bottom: var(--spacing-2xl);
  }

  .death-item {
    display: flex;
    align-items: center;
    gap: var(--spacing-lg);
    padding: var(--spacing-sm) var(--spacing-lg);
    border-bottom: 1px solid var(--color-border);
    transition: background-color 0.2s ease;
  }

  .death-item:hover {
    background-color: var(--color-bg-1);
  }

  .death-item:last-child {
    border-bottom: none;
  }

  .death-avatar {
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

  .death-info h3 {
    font-size: 1rem;
    font-weight: 500;
    margin: 0 0 var(--spacing-xs) 0;
    color: var(--color-text-primary);
  }

  .death-info p {
    font-size: 0.875rem;
    color: var(--color-text-secondary);
    margin: 0;
  }

  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: var(--spacing-sm);
    padding: var(--spacing-lg);
  }

  .pagination-btn, .pagination-number {
    width: 40px;
    height: 40px;
    border-radius: 20px;
    border: none;
    background: transparent;
    color: var(--color-text-primary);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s ease;
    font-size: 0.875rem;
    font-weight: 700;
  }

  .pagination-btn:hover:not(:disabled), .pagination-number:hover {
    background-color: var(--color-bg-1);
  }

  .pagination-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .pagination-number.active {
    background-color: var(--color-bg-2);
    font-weight: 700;
  }

  .loading-state, .empty-state {
    text-align: center;
    padding: var(--spacing-6xl) var(--spacing-xl);
  }

  .loading-state p, .empty-state p {
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
    }

    .search-bar {
      width: 100%;
    }

    .search-input {
      min-width: auto;
    }

    .filters-section {
      flex-direction: column;
      gap: var(--spacing-md);
    }

    .filter-dropdown {
      min-width: auto;
    }

    .death-item {
      padding: var(--spacing-md);
    }

    .header-content h1 {
      font-size: 1.75rem;
    }
  }
</style>