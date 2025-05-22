<script>
  import {goto} from '$app/navigation';
  import {supabase} from '$lib/supabase';
  import Button from '../../../components/Button.svelte';

  export let data;

  let email = '';
  let password = '';
  let loading = false;
  let error = null;

  async function handleLogin() {
    loading = true;
    error = null;

    try {
      const {error: authError} = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (authError) throw authError;

      // Redirect to persons page after login
      goto('/persons');
    } catch (e) {
      error = e.message;
    } finally {
      loading = false;
    }
  }

  async function signInWithProvider(provider) {
    try {
      const {error: authError} = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      });

      if (authError) throw authError;
    } catch (e) {
      error = e.message;
    }
  }
</script>

<div class="login-page">
  <div class="container">
    <div class="login-card">
      <div class="login-header">
        <h1>Welcome Back</h1>
        <p>Sign in to your account to continue</p>
      </div>

      {#if error}
        <div class="error">
          {error}
        </div>
      {/if}

      <form on:submit|preventDefault={handleLogin} class="login-form">
        <div class="form-group">
          <label for="email">Email Address</label>
          <input
            type="email"
            id="email"
            bind:value={email}
            required
            placeholder="Enter your email"
            autocomplete="email"
          />
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            bind:value={password}
            required
            placeholder="Enter your password"
            autocomplete="current-password"
          />
        </div>

        <Button type="submit" disabled={loading} loading={loading} class="login-btn">
          {loading ? 'Signing In...' : 'Sign In'}
        </Button>
      </form>

      <div class="divider">
        <span>or continue with</span>
      </div>

      <div class="social-buttons">
        <button type="button" class="social-btn google" on:click={() => signInWithProvider('google')}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
          Google
        </button>

        <button type="button" class="social-btn facebook" on:click={() => signInWithProvider('facebook')}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="#1877F2" />
          </svg>
          Facebook
        </button>
      </div>

      <div class="login-footer">
        <p>Don't have an account? <a href="/auth/register">Sign up</a></p>
        <a href="/auth/reset-password" class="forgot-password">Forgot your password?</a>
      </div>
    </div>
  </div>
</div>

<style>
  .login-page {
    min-height: calc(100vh - 128px);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--spacing-4xl) 0;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  }

  .login-card {
    background: var(--color-bg-0);
    border-radius: var(--border-radius);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    padding: var(--spacing-4xl);
    width: 100%;
    max-width: 400px;
    border: 1px solid var(--color-border-light);
  }

  .login-header {
    text-align: center;
    margin-bottom: var(--spacing-3xl);
  }

  .login-header h1 {
    font-size: 1.875rem;
    font-weight: 900;
    margin-bottom: var(--spacing-sm);
    color: var(--color-text-primary);
  }

  .login-header p {
    color: var(--color-text-secondary);
    margin: 0;
  }

  .login-form {
    margin-bottom: var(--spacing-2xl);
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

  .form-group input {
    width: 100%;
    padding: var(--spacing-md);
    font-size: 0.875rem;
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius);
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
  }

  .form-group input:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px rgba(13, 128, 242, 0.1);
  }

  .login-btn {
    width: 100%;
    height: 48px;
    margin-bottom: var(--spacing-lg);
  }

  .divider {
    position: relative;
    text-align: center;
    margin: var(--spacing-2xl) 0;
  }

  .divider::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 1px;
    background: var(--color-border);
  }

  .divider span {
    background: var(--color-bg-0);
    padding: 0 var(--spacing-lg);
    color: var(--color-text-secondary);
    font-size: 0.875rem;
  }

  .social-buttons {
    display: flex;
    gap: var(--spacing-md);
    margin-bottom: var(--spacing-2xl);
  }

  .social-btn {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-sm);
    padding: var(--spacing-md);
    background: var(--color-bg-0);
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius);
    font-weight: 500;
    font-size: 0.875rem;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .social-btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .social-btn.google {
    color: #1a73e8;
  }

  .social-btn.facebook {
    color: #1877f2;
  }

  .login-footer {
    text-align: center;
  }

  .login-footer p {
    margin-bottom: var(--spacing-sm);
    color: var(--color-text-secondary);
    font-size: 0.875rem;
  }

  .login-footer a {
    color: var(--color-primary);
    font-weight: 500;
    text-decoration: none;
  }

  .login-footer a:hover {
    text-decoration: underline;
  }

  .forgot-password {
    font-size: 0.875rem;
    color: var(--color-text-secondary);
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

  @media (max-width: 480px) {
    .login-card {
      margin: var(--spacing-lg);
      padding: var(--spacing-2xl);
    }

    .social-buttons {
      flex-direction: column;
    }
  }
</style>