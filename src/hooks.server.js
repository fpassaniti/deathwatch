import { createSupabaseServerClient } from '@supabase/auth-helpers-sveltekit';
import { redirect } from '@sveltejs/kit';
import { SUPABASE_SERVICE_KEY } from '$env/static/private';
import { PUBLIC_SUPABASE_URL } from '$env/static/public';

export async function handle({ event, resolve }) {
  event.locals.supabase = createSupabaseServerClient({
    supabaseUrl: PUBLIC_SUPABASE_URL,
    supabaseKey: SUPABASE_SERVICE_KEY,
    event,
  });

  // Get session from request
  event.locals.session = await event.locals.supabase.auth.getSession();

  // Protected routes
  const protectedRoutes = ['/persons', '/persons/add', '/deaths', '/account'];
  const isProtectedRoute = protectedRoutes.some(route => 
    event.url.pathname.startsWith(route)
  );
  
  // Auth routes that should redirect logged-in users away
  const authRoutes = ['/auth/login', '/auth/register'];
  const isAuthRoute = authRoutes.some(route => 
    event.url.pathname.startsWith(route)
  );

  if (isProtectedRoute && !event.locals.session.data.session) {
    throw redirect(303, '/auth/login');
  }

  if (isAuthRoute && event.locals.session.data.session) {
    throw redirect(303, '/persons');
  }

  return resolve(event, {
    filterSerializedResponseHeaders(name) {
      return name === 'content-range';
    },
  });
}