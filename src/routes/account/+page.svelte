<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { supabase } from '$lib/supabase';
  import Button from '../../components/Button.svelte';
  
  export let data;
  const { session } = data;
  
  let user = null;
  let loading = true;
  let error = null;
  let successMessage = null;
  
  let email = '';
  let name = '';
  let notificationsEnabled = true;
  
  onMount(async () => {
    try {
      if (!session) {
        goto('/auth/login');
        return;
      }
      
      user = session.user;
      
      email = user.email;
      name = user.user_metadata?.name || '';
      notificationsEnabled = user.user_metadata?.notifications_enabled !== false;
    } catch (e) {
      error = e.message;
    } finally {
      loading = false;
    }
  });
  
  async function updateProfile() {
    loading = true;
    error = null;
    successMessage = null;
    
    try {
      const { error: authError } = await supabase.auth.updateUser({
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

<div class="container">
  <h1>Mon compte</h1>
  
  {#if loading && !user}
    <p>Chargement...</p>
  {:else}
    <div class="card">
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
        <h2>Informations personnelles</h2>
        
        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            bind:value={email}
            required
            placeholder="Votre adresse email"
          />
        </div>
        
        <div class="form-group">
          <label for="name">Nom</label>
          <input
            type="text"
            id="name"
            bind:value={name}
            placeholder="Votre nom"
          />
        </div>
        
        <h2>Préférences</h2>
        
        <div class="form-group">
          <label class="checkbox-label">
            <input
              type="checkbox"
              bind:checked={notificationsEnabled}
            />
            Recevoir des notifications par email
          </label>
        </div>
        
        <Button type="submit" disabled={loading} loading={loading}>
          {loading ? 'Mise à jour...' : 'Mettre à jour le profil'}
        </Button>
      </form>
      
      <div class="account-section">
        <h2>Sécurité</h2>
        <a href="/account/change-password"><Button type="button">Changer de mot de passe</Button></a>
      </div>
      
      <div class="account-section">
        <h2>Déconnexion</h2>
        <Button type="button" variant="danger" on:click={handleSignOut}>Se déconnecter</Button>
      </div>
    </div>
  {/if}
</div>

<style>
  h1 {
    margin-bottom: 1.5rem;
  }
  
  h2 {
    margin: 1.5rem 0 1rem;
    font-size: 1.25rem;
  }
  
  .card {
    max-width: 600px;
    margin: 0 auto;
  }
  
  .error {
    padding: 0.5rem;
    background-color: #fee2e2;
    border: 1px solid #ef4444;
    border-radius: 0.25rem;
    color: #b91c1c;
    margin-bottom: 1rem;
  }
  
  .success {
    padding: 0.5rem;
    background-color: #ecfdf5;
    border: 1px solid #10b981;
    border-radius: 0.25rem;
    color: #065f46;
    margin-bottom: 1rem;
  }
  
  .checkbox-label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
  }
  
  .checkbox-label input {
    width: auto;
  }
  
  .account-section {
    margin: 2rem 0;
    padding-top: 1rem;
    border-top: 1px solid #e5e7eb;
  }
  
  .danger {
    background-color: #ef4444;
  }
  
  .danger:hover {
    background-color: #dc2626;
  }
</style>