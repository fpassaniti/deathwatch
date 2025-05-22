import { createBrowserClient, createServerClient, isBrowser } from '@supabase/ssr'
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public'
import { invalidate } from '$app/navigation'

export async function load({ fetch, data, depends }) {
  depends('supabase:auth')

  const supabase = isBrowser()
    ? createBrowserClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
      global: {
        fetch,
      },
      cookies: {
        get(key) {
          const cookie = document.cookie
            .split('; ')
            .find((x) => x.startsWith(`${key}=`))
          return cookie?.split('=')[1]
        },
        set(key, value, options) {
          document.cookie = `${key}=${value}; path=/; ${
            options?.maxAge ? `max-age=${options.maxAge};` : ''
          } SameSite=Lax; secure`
        },
        remove(key, options) {
          document.cookie = `${key}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Lax; secure`
        },
      },
    })
    : createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
      global: {
        fetch,
      },
      cookies: {
        get() {
          return JSON.stringify(data.session)
        },
        set() {},
        remove() {},
      },
    })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Set up auth state change listener only on client
  if (isBrowser()) {
    supabase.auth.onAuthStateChange((event, _session) => {
      if (_session?.expires_at !== session?.expires_at) {
        invalidate('supabase:auth')
      }
    })
  }

  return { supabase, session }
}