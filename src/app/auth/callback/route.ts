import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (code) {
    const supabase = createRouteHandlerClient({ cookies })
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (error) {
      console.error('Error exchanging code for session:', error)
      return NextResponse.redirect(`${requestUrl.origin}/login?error=oauth_error`)
    }

    // Only proceed with profile creation and success flag if no error occurred

    // With the session set in cookies, upsert a profile record for this user.
    // This is resilient even if a DB trigger also exists (upsert on conflict id).
    try {
      const { data: userRes } = await supabase.auth.getUser()
      const user = userRes?.user

      if (user) {
        type UserMetadata = {
          full_name?: string;
          display_name?: string;
          name?: string;
          avatar_url?: string;
          picture?: string;
        };

        const meta: UserMetadata = user.user_metadata || {};

        const profilePayload = {
          id: user.id,
          email: user.email,
          full_name:
            meta.full_name ||
            meta.display_name ||
            meta.name ||
            (user.email ? user.email.split('@')[0] : 'User'),
          profile_image: meta.avatar_url || meta.picture || null,
          preferences: {},
        }

        let { error: profileError } = await supabase
          .from('profiles')
          .upsert(profilePayload, { onConflict: 'id' })

        if (profileError) {
          // Retry with alternative column names some schemas use
          const altPayload: Record<string, string | null> = {
            id: user.id,
            // some projects use `name` and `avatar_url` instead
            name:
              profilePayload.full_name,
            avatar_url:
              profilePayload.profile_image,
          }

          const retry1 = await supabase
            .from('profiles')
            .upsert(altPayload, { onConflict: 'id' })

          profileError = retry1.error

          if (profileError) {
            // Final fallback: ensure at least the row exists
            const retry2 = await supabase
              .from('profiles')
              .upsert({ id: user.id }, { onConflict: 'id' })
            if (retry2.error) {
              console.error('Profile upsert failed (all attempts):', retry2.error)
            }
          }
        }
      }
    } catch (upsertErr) {
      console.error('Unexpected error during profile upsert:', upsertErr)
    }
  }

  // Only add signed_in flag if code exchange was successful (no error above)
  return NextResponse.redirect(`${requestUrl.origin}?signed_in=1`)
}
