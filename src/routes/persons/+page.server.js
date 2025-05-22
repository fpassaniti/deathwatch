// src/routes/persons/+page.server.js
import { redirect } from '@sveltejs/kit'

export async function load({ locals: { getSession } }) {
  const session = await getSession()

  if (!session) {
    throw redirect(303, '/auth/login')
  }

  return {
    session,
  }
}