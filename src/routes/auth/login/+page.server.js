// src/routes/auth/login/+page.server.js and src/routes/auth/register/+page.server.js
import { redirect } from '@sveltejs/kit'

export async function load({ locals: { getSession } }) {
  const session = await getSession()

  // Redirect to dashboard if already logged in
  if (session) {
    throw redirect(303, '/persons')
  }

  return {}
}