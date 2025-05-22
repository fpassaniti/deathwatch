import { writable } from 'svelte/store';
import { supabase } from './supabase';

export const user = writable(null);
export const loading = writable(true);

export async function initAuth() {
  const { data } = await supabase.auth.getSession();
  
  if (data.session) {
    user.set(data.session.user);
  }
  
  loading.set(false);
  
  // Listen for auth changes
  supabase.auth.onAuthStateChange((_, session) => {
    user.set(session?.user || null);
  });
}

export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  
  return { data, error };
}

export async function signUp(email, password) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password
  });
  
  return { data, error };
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  return { error };
}

export async function signInWithProvider(provider) {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider
  });
  
  return { data, error };
}

export async function updateProfile(userData) {
  const { data, error } = await supabase.auth.updateUser(userData);
  return { data, error };
}