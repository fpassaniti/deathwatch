// src/routes/auth/callback/+page.server.js
import { redirect } from '@sveltejs/kit'

export async function load({ url, locals: { supabase } }) {
  const code = url.searchParams.get('code')

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (error) {
      console.error('Error exchanging code for session:', error)
      throw redirect(303, '/auth/login?error=callback_error')
    }
  }

  throw redirect(303, '/persons')
}