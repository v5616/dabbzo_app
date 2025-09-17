import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (code) {
    console.log('Auth callback - Exchanging code for session')
    const supabase = createRouteHandlerClient(
      { cookies },
      {
        supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
        supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      }
    )
    
    console.log('Auth callback - Before exchangeCodeForSession')
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)
    console.log('Auth callback - After exchangeCodeForSession', { 
      hasError: !!error, 
      error: error?.message,
      hasSessionData: !!data?.session,
      hasUser: !!data?.user
    })
    
    if (error) {
      console.error('Error exchanging code for session:', error)
      const redirectUrl = new URL('/login', requestUrl.origin)
      redirectUrl.searchParams.set('error', 'oauth_error')
      return NextResponse.redirect(redirectUrl)
    }

    // Verify session is present after exchange
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession()
    console.log('Auth callback - Session verification:', {
      hasSession: !!sessionData?.session,
      hasUser: !!sessionData?.session?.user,
      error: sessionError?.message
    })

    if (!sessionData?.session) {
        console.error('No session found after exchangeCodeForSession', {
        codePresent: !!code,
        // Skip cookie logging to avoid TypeScript errors
      })
      return NextResponse.redirect(`${requestUrl.origin}/login?error=no_session`)
    }

    // Only proceed with profile creation and success flag if no error occurred

    // With the session set in cookies, upsert a profile record for this user.
    // This is resilient even if a DB trigger also exists (upsert on conflict id).
    try {
      const { data: userRes } = await supabase.auth.getUser()
      const user = userRes?.user

      if (user) {
        console.log('Processing user profile for:', user.email);
        
        // Get user metadata from OAuth provider
        const meta = user.user_metadata || {};
        
        // Prepare profile data with fallbacks
        const fullName = meta.full_name || 
                        meta.name || 
                        meta.display_name ||
                        (user.email ? user.email.split('@')[0] : 'User');
                        
        const avatarUrl = meta.avatar_url || meta.picture || null;

        // Try to insert/update the profile directly
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .upsert(
            {
              id: user.id,
              email: user.email,
              full_name: fullName,
              name: fullName, // Some schemas use name instead of full_name
              profile_image: avatarUrl,
              avatar_url: avatarUrl, // Some schemas use avatar_url
              preferences: {},
              updated_at: new Date().toISOString()
            },
            { onConflict: 'id' }
          )
          .select()
          .single();

        if (profileError) {
          console.error('Error creating/updating profile:', profileError);
          
          // Fallback: Try with minimal required fields
          const { error: minimalError } = await supabase
            .from('profiles')
            .upsert(
              { 
                id: user.id,
                email: user.email,
                name: fullName,
                updated_at: new Date().toISOString()
              },
              { onConflict: 'id' }
            );
            
          if (minimalError) {
            console.error('Minimal profile update also failed:', minimalError);
          }
        } else {
          console.log('Profile updated successfully:', profileData);
        }
      }
    } catch (upsertErr) {
      console.error('Unexpected error during profile upsert:', upsertErr)
    }
  }

  // Redirect to the original URL or home page after successful sign-in
  const redirectTo = request.cookies.get('redirectedFrom')?.value || '/'
  
  // Clear the redirect cookie
  const response = NextResponse.redirect(new URL(redirectTo, requestUrl.origin))
  response.cookies.delete('redirectedFrom')
  
  return response
}
