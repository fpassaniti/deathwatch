// src/lib/auth-guard.js
import { goto } from '$app/navigation';
import { browser } from '$app/environment';

/**
 * Vérifie si l'utilisateur est authentifié et redirige si nécessaire
 * @param {Object} session - La session Supabase
 * @param {string} redirectTo - URL de redirection si non authentifié
 * @param {boolean} requireAuth - Si true, nécessite une authentification
 */
export function checkAuth(session, redirectTo = '/auth/login', requireAuth = true) {
  if (!browser) return; // Ne pas exécuter côté serveur

  const isAuthenticated = !!session?.user;

  if (requireAuth && !isAuthenticated) {
    goto(redirectTo);
    return false;
  }

  if (!requireAuth && isAuthenticated) {
    goto('/persons'); // Rediriger vers le tableau de bord si déjà connecté
    return false;
  }

  return true;
}

/**
 * Hook pour protéger les routes qui nécessitent une authentification
 * @param {Object} session - La session Supabase
 */
export function requireAuth(session) {
  return checkAuth(session, '/auth/login', true);
}

/**
 * Hook pour les pages d'authentification (login, register)
 * qui doivent rediriger les utilisateurs déjà connectés
 * @param {Object} session - La session Supabase
 */
export function redirectIfAuthenticated(session) {
  return checkAuth(session, '/persons', false);
}

/**
 * Utilitaire pour obtenir le nom d'affichage de l'utilisateur
 * @param {Object} user - L'objet utilisateur Supabase
 * @returns {string} Le nom d'affichage de l'utilisateur
 */
export function getDisplayName(user) {
  if (!user) return '';

  if (user.user_metadata?.name) {
    return user.user_metadata.name;
  }

  if (user.user_metadata?.full_name) {
    return user.user_metadata.full_name;
  }

  if (user.email) {
    return user.email.split('@')[0];
  }

  return 'Utilisateur';
}

/**
 * Utilitaire pour obtenir les initiales de l'utilisateur
 * @param {Object} user - L'objet utilisateur Supabase
 * @returns {string} Les initiales de l'utilisateur
 */
export function getUserInitials(user) {
  if (!user) return 'U';

  const name = getDisplayName(user);

  if (name.includes(' ')) {
    const parts = name.split(' ');
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }

  return name.substring(0, 2).toUpperCase();
}

/**
 * Utilitaire pour vérifier les permissions utilisateur
 * @param {Object} user - L'objet utilisateur Supabase
 * @param {string} permission - La permission à vérifier
 * @returns {boolean} True si l'utilisateur a la permission
 */
export function hasPermission(user, permission) {
  if (!user) return false;

  // Pour l'instant, tous les utilisateurs connectés ont toutes les permissions
  // Cette fonction peut être étendue selon les besoins futurs
  const permissions = {
    'view_persons': true,
    'add_persons': true,
    'edit_persons': true,
    'delete_persons': true,
    'view_deaths': true,
    'manage_account': true
  };

  return permissions[permission] || false;
}

/**
 * Vérifie si l'utilisateur peut accéder à une route spécifique
 * @param {Object} session - La session Supabase
 * @param {string} route - La route à vérifier
 * @returns {boolean} True si l'utilisateur peut accéder à la route
 */
export function canAccessRoute(session, route) {
  const isAuthenticated = !!session?.user;

  // Routes publiques
  const publicRoutes = ['/', '/auth/login', '/auth/register', '/auth/callback'];
  if (publicRoutes.includes(route)) {
    return true;
  }

  // Routes protégées
  const protectedRoutes = ['/persons', '/persons/add', '/deaths', '/account'];
  if (protectedRoutes.some(r => route.startsWith(r))) {
    return isAuthenticated;
  }

  // Par défaut, autoriser l'accès
  return true;
}

/**
 * Gère la déconnexion de l'utilisateur
 * @param {Object} supabase - Le client Supabase
 * @returns {Promise} Promise de déconnexion
 */
export async function signOut(supabase) {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;

    // Rediriger vers la page d'accueil
    goto('/');

    return { success: true };
  } catch (error) {
    console.error('Erreur lors de la déconnexion:', error);
    return { success: false, error: error.message };
  }
}