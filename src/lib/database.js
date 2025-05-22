import { supabase } from './supabase';

// Persons API
export async function getPersons(userId) {
  const { data, error } = await supabase
    .from('persons')
    .select('*')
    .eq('user_id', userId)
    .order('last_name', { ascending: true });
    
  return { data, error };
}

export async function getPerson(id, userId) {
  const { data, error } = await supabase
    .from('persons')
    .select('*')
    .eq('id', id)
    .eq('user_id', userId)
    .single();
    
  return { data, error };
}

export async function createPerson(personData) {
  const { data, error } = await supabase
    .from('persons')
    .insert([personData])
    .select();
    
  return { data, error };
}

export async function updatePerson(id, personData) {
  const { data, error } = await supabase
    .from('persons')
    .update(personData)
    .eq('id', id)
    .select();
    
  return { data, error };
}

export async function deletePerson(id) {
  const { error } = await supabase
    .from('persons')
    .delete()
    .eq('id', id);
    
  return { error };
}

// Deaths API
export async function getDeaths(filters = {}) {
  let query = supabase
    .from('deaths')
    .select('*')
    .order('death_date', { ascending: false });
  
  if (filters.city) {
    query = query.eq('city', filters.city);
  }
  
  if (filters.limit) {
    query = query.limit(filters.limit);
  }
  
  const { data, error } = await query;
  
  return { data, error };
}

export async function getDeath(id) {
  const { data, error } = await supabase
    .from('deaths')
    .select('*')
    .eq('id', id)
    .single();
    
  return { data, error };
}

// Cities API
export async function getCities() {
  const { data, error } = await supabase
    .from('deaths')
    .select('city')
    .order('city')
    .distinct();
    
  return { data, error };
}