<script>
  import {goto} from '$app/navigation';
  import {createPerson} from '$lib/database';

  export let data;
  const {session} = data;

  let firstName = '';
  let lastName = '';
  let birthDate = '';
  let relationship = '';
  let loading = false;
  let error = null;

  async function handleAddPerson() {
    loading = true;
    error = null;

    try {
      if (!session) {
        throw new Error('You must be logged in to add a person');
      }

      if (!firstName.trim() || !lastName.trim()) {
        throw new Error('First name and last name are required');
      }

      const personData = {
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        birth_date: birthDate || null,
        relationship: relationship || null,
        status: 'alive',
        user_id: session.user.id
      };

      const {error: dbError} = await createPerson(personData);

      if (dbError) throw dbError;

      // Redirect to network page after adding
      goto('/persons');
    } catch (e) {
      error = e.message;
    } finally {
      loading = false;
    }
  }
</script>

<div class="add-person-page">
  <div class="hero-container">
    <div class="page-header">
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

  <div class="form-container">
    <div class="form-card">
      <div class="form-header">
        <h1>Add a person to follow</h1>
      </div>

      {#if error}
        <div class="error">
          {error}
        </div>
      {/if}

      <form on:submit|preventDefault={handleAddPerson} class="add-person-form">
        <div class="form-group">
          <label for="first-name">First Name</label>
          <input
            type="text"
            id="first-name"
            bind:value={firstName}
            placeholder="Enter first name"
            required
          />
        </div>

        <div class="form-group">
          <label for="last-name">Last Name</label>
          <input
            type="text"
            id="last-name"
            bind:value={lastName}
            placeholder="Enter last name"
            required
          />
        </div>

        <div class="form-group">
          <label for="birth-date">Date of Birth (Optional)</label>
          <input
            type="date"
            id="birth-date"
            bind:value={birthDate}
            placeholder="MM/DD/YYYY"
          />
        </div>

        <div class="form-group">
          <label for="relationship">Relationship (Optional)</label>
          <input
            type="text"
            id="relationship"
            bind:value={relationship}
            placeholder="e.g., Parent, Sibling, Friend"
          />
        </div>

        <div class="form-actions">
          <button type="submit" disabled={loading} class="submit-btn">
            {#if loading}
              <div class="loader small"></div>
            {/if}
            Add Person
          </button>
        </div>
      </form>
    </div>
  </div>
</div>

<style>
  .add-person-page {
    min-height: 100vh;
    background-color: var(--color-bg-0);
  }

  .page-header {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-bottom: var(--spacing-4xl);
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

  .form-container {
    display: flex;
    justify-content: center;
    padding: var(--spacing-xl) 160px var(--spacing-6xl);
  }

  .form-card {
    width: 100%;
    max-width: 960px;
    min-height: 695px;
    background-color: var(--color-bg-0);
    padding: var(--spacing-xl) 0;
  }

  .form-header {
    padding: var(--spacing-lg);
    margin-bottom: var(--spacing-xl);
  }

  .form-header h1 {
    font-size: 2rem;
    font-weight: 700;
    color: var(--color-text-primary);
    margin: 0;
  }

  .add-person-form {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-lg);
  }

  .form-group {
    padding: var(--spacing-md) var(--spacing-lg);
  }

  .form-group label {
    display: block;
    font-size: 1rem;
    font-weight: 500;
    color: var(--color-text-primary);
    margin-bottom: var(--spacing-sm);
  }

  .form-group input {
    width: 100%;
    height: 56px;
    padding: var(--spacing-lg);
    background-color: var(--color-bg-2);
    border: none;
    border-radius: var(--border-radius);
    font-size: 1rem;
    color: var(--color-text-primary);
    transition: background-color 0.2s ease, box-shadow 0.2s ease;
  }

  .form-group input::placeholder {
    color: var(--color-text-secondary);
  }

  .form-group input:focus {
    outline: none;
    background-color: var(--color-bg-0);
    box-shadow: 0 0 0 2px var(--color-primary);
  }

  .form-group input[type="date"] {
    color: var(--color-text-secondary);
  }

  .form-group input[type="date"]::-webkit-calendar-picker-indicator {
    cursor: pointer;
    opacity: 0.6;
  }

  .form-actions {
    padding: var(--spacing-md) var(--spacing-lg);
    margin-top: var(--spacing-xl);
  }

  .submit-btn {
    width: 100%;
    height: 40px;
    background-color: var(--color-primary);
    color: var(--color-text-light);
    border: none;
    border-radius: var(--border-radius);
    font-size: 0.875rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-sm);
  }

  .submit-btn:hover:not(:disabled) {
    background-color: #0066CC;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(13, 128, 242, 0.3);
  }

  .submit-btn:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }

  .loader.small {
    width: 1rem;
    height: 1rem;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    border-top-color: white;
    animation: spin 1s ease-in-out infinite;
  }

  .error {
    background: #FEE2E2;
    border: 1px solid #EF4444;
    color: #B91C1C;
    padding: var(--spacing-md);
    border-radius: var(--border-radius);
    margin: 0 var(--spacing-lg) var(--spacing-lg);
    font-size: 0.875rem;
  }

  @media (max-width: 1024px) {
    .form-container {
      padding: var(--spacing-xl) var(--spacing-4xl) var(--spacing-6xl);
    }
  }

  @media (max-width: 768px) {
    .form-container {
      padding: var(--spacing-xl) var(--spacing-xl) var(--spacing-6xl);
    }

    .form-card {
      min-height: auto;
    }

    .form-header h1 {
      font-size: 1.75rem;
    }

    .form-group {
      padding: var(--spacing-sm) var(--spacing-md);
    }

    .form-actions {
      padding: var(--spacing-sm) var(--spacing-md);
    }

    .error {
      margin: 0 var(--spacing-md) var(--spacing-lg);
    }
  }

  @media (max-width: 480px) {
    .page-header {
      margin-bottom: var(--spacing-2xl);
    }

    .form-container {
      padding: var(--spacing-lg) var(--spacing-lg) var(--spacing-4xl);
    }

    .form-header {
      padding: var(--spacing-md);
    }

    .form-header h1 {
      font-size: 1.5rem;
    }
  }
</style>