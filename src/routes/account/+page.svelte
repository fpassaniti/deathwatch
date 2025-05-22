<script>
  import {onMount} from 'svelte';
  import {goto} from '$app/navigation';
  import Button from '../../components/Button.svelte';

  export let data;
  let {supabase, session} = data;
  $: ({supabase, session} = data);

  let loading = false;
  let error = null;
  let successMessage = null;

  let email = '';
  let name = '';
  let notificationsEnabled = true;

  // Rediriger si pas connecté
  $: if (!session) {
    goto('/auth/login');
  }

  // Initialiser les données utilisateur
  $: if (session?.user) {
    email = session.user.email || '';
    name = session.user.user_metadata?.name || '';
    notificationsEnabled = session.user.user_metadata?.notifications_enabled !== false;
  }

  async function updateProfile() {
    if (!session?.user) return;

    loading = true;
    error = null;
    successMessage = null;

    try {
      const {error: authError} = await supabase.auth.updateUser({
        email,
        data: {
          name,
          notifications_enabled: notificationsEnabled
        }
      });

      if (authError) throw authError;

      successMessage = 'Profil mis à jour avec succès';
    } catch (e) {
      error = e.message;
    } finally {
      loading = false;
    }
  }

  async function handleSignOut() {
    try {
      await supabase.auth.signOut();
      goto('/');
    } catch (e) {
      error = e.message;
    }
  }
</script>

<div class="account-page">
  <div class="container">
    <div class="page-header">
      <h1>Mon compte</h1>
      <p>Gérez vos informations personnelles et vos préférences</p>
    </div>

    {#if session?.user}
      <div class="account-content">
        <div class="account-card">
          {#if error}
            <div class="error">
              {error}
            </div>
          {/if}

          {#if successMessage}
            <div class="success">
              {successMessage}
            </div>
          {/if}

          <form on:submit|preventDefault={updateProfile}>
            <div class="section">
              <h2>Informations personnelles</h2>

              <div class="form-group">
                <label for="email">Adresse email</label>
                <input
                  type="email"
                  id="email"
                  bind:value={email}
                  required
                  placeholder="Votre adresse email"
                />
              </div>

              <div class="form-group">
                <label for="name">Nom complet</label>
                <input
                  type="text"
                  id="name"
                  bind:value={name}
                  placeholder="Votre nom complet"
                />
              </div>
            </div>

            <div class="section">
              <h2>Préférences de notification</h2>

              <div class="form-group">
                <label class="checkbox-label">
                  <input
                    type="checkbox"
                    bind:checked={notificationsEnabled}
                  />
                  <span class="checkmark"></span>
                  Recevoir des notifications par email
                  <small>Vous serez informé des nouveaux décès dans votre réseau</small>
                </label>
              </div>
            </div>

            <div class="form-actions">
              <Button type="submit" disabled={loading} loading={loading}>
                {loading ? 'Mise à jour...' : 'Mettre à jour le profil'}
              </Button>
            </div>
          </form>
        </div>

        <div class="account-sections">
          <div class="account-section">
            <div class="section-header">
              <h3>Sécurité</h3>
              <p>Gérez la sécurité de votre compte</p>
            </div>
            <div class="section-actions">
              <a href="/account/change-password" class="btn secondary">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="currentColor" stroke-width="2" />
                  <circle cx="12" cy="16" r="1" fill="currentColor" />
                  <path d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11" stroke="currentColor" stroke-width="2" />
                </svg>
                Changer le mot de passe
              </a>
            </div>
          </div>

          <div class="account-section">
            <div class="section-header">
              <h3>Informations du compte</h3>
              <p>Détails de votre compte</p>
            </div>
            <div class="account-info">
              <div class="info-item">
                <span class="info-label">Membre depuis</span>
                <span class="info-value">
                  {new Date(session.user.created_at).toLocaleDateString('fr-FR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
              <div class="info-item">
                <span class="info-label">Dernière connexion</span>
                <span class="info-value">
                  {session.user.last_sign_in_at ?
                    new Date(session.user.last_sign_in_at).toLocaleDateString('fr-FR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    }) :
                    'Première connexion'
                  }
                </span>
              </div>
            </div>
          </div>

          <div class="account-section danger-section">
            <div class="section-header">
              <h3>Zone de danger</h3>
              <p>Actions irréversibles concernant votre compte</p>
            </div>
            <div class="section-actions">
              <Button variant="danger" on:click={handleSignOut}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  <polyline points="16,17 21,12 16,7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  <line x1="21" y1="12" x2="9" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                Se déconnecter
              </Button>
            </div>
          </div>
        </div>
      </div>
    {:else}
      <div class="loading-state">
        <div class="loader"></div>
        <p>Chargement...</p>
      </div>
    {/if}
  </div>
</div>

<style>
  .account-page {
    min-height: calc(100vh - 128px);
    background-color: var(--color-bg-1);
    padding: var(--spacing-4xl) 0;
  }

  .page-header {
    text-align: center;
    margin-bottom: var(--spacing-5xl);
  }

  .page-header h1 {
    font-size: 2.25rem;
    font-weight: 900;
    margin-bottom: var(--spacing-sm);
    color: var(--color-text-primary);
  }

  .page-header p {
    color: var(--color-text-secondary);
    font-size: 1rem;
    max-width: 600px;
    margin: 0 auto;
  }

  .account-content {
    max-width: 800px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: var(--spacing-3xl);
  }

  .account-card {
    background: var(--color-bg-0);
    border-radius: var(--border-radius);
    padding: var(--spacing-3xl);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    border: 1px solid var(--color-border-light);
  }

  .section {
    margin-bottom: var(--spacing-3xl);
  }

  .section:last-child {
    margin-bottom: 0;
  }

  .section h2 {
    font-size: 1.25rem;
    font-weight: 700;
    margin-bottom: var(--spacing-lg);
    color: var(--color-text-primary);
  }

  .form-group {
    margin-bottom: var(--spacing-lg);
  }

  .form-group label {
    display: block;
    margin-bottom: var(--spacing-sm);
    font-weight: 500;
    color: var(--color-text-primary);
  }

  .form-group input[type="email"],
  .form-group input[type="text"] {
    width: 100%;
    padding: var(--spacing-md);
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius);
    font-size: 0.875rem;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
  }

  .form-group input:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px rgba(13, 128, 242, 0.1);
  }

  .checkbox-label {
    display: flex;
    align-items: flex-start;
    gap: var(--spacing-sm);
    cursor: pointer;
    font-weight: 400;
  }

  .checkbox-label input[type="checkbox"] {
    width: auto;
    margin: 0;
  }

  .checkbox-label small {
    display: block;
    color: var(--color-text-secondary);
    font-size: 0.75rem;
    margin-top: var(--spacing-xs);
  }

  .form-actions {
    margin-top: var(--spacing-2xl);
    padding-top: var(--spacing-2xl);
    border-top: 1px solid var(--color-border);
  }

  .account-sections {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-2xl);
  }

  .account-section {
    background: var(--color-bg-0);
    border-radius: var(--border-radius);
    padding: var(--spacing-2xl);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    border: 1px solid var(--color-border-light);
  }

  .danger-section {
    border-color: #EF4444;
    background: #FEF2F2;
  }

  .section-header {
    margin-bottom: var(--spacing-lg);
  }

  .section-header h3 {
    font-size: 1.125rem;
    font-weight: 600;
    margin-bottom: var(--spacing-xs);
    color: var(--color-text-primary);
  }

  .danger-section .section-header h3 {
    color: #DC2626;
  }

  .section-header p {
    color: var(--color-text-secondary);
    font-size: 0.875rem;
    margin: 0;
  }

  .section-actions {
    display: flex;
    gap: var(--spacing-sm);
    flex-wrap: wrap;
  }

  .account-info {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
  }

  .info-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--spacing-sm) 0;
    border-bottom: 1px solid var(--color-border-light);
  }

  .info-item:last-child {
    border-bottom: none;
  }

  .info-label {
    font-weight: 500;
    color: var(--color-text-primary);
    font-size: 0.875rem;
  }

  .info-value {
    color: var(--color-text-secondary);
    font-size: 0.875rem;
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

  .success {
    background: #ECFDF5;
    border: 1px solid #10B981;
    color: #065F46;
    padding: var(--spacing-md);
    border-radius: var(--border-radius);
    margin-bottom: var(--spacing-lg);
    font-size: 0.875rem;
  }

  .loading-state {
    text-align: center;
    padding: var(--spacing-6xl) var(--spacing-xl);
  }

  .loading-state p {
    color: var(--color-text-secondary);
    margin-top: var(--spacing-lg);
  }

  @media (max-width: 768px) {
    .account-page {
      padding: var(--spacing-2xl) 0;
    }

    .page-header h1 {
      font-size: 1.875rem;
    }

    .account-card {
      padding: var(--spacing-2xl);
    }

    .account-section {
      padding: var(--spacing-lg);
    }

    .info-item {
      flex-direction: column;
      align-items: flex-start;
      gap: var(--spacing-xs);
    }
  }

  @media (max-width: 480px) {
    .account-card {
      padding: var(--spacing-lg);
    }

    .section-actions .btn {
      width: 100%;
    }
  }
</style>