import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    const supabase = createRouteHandlerClient({ cookies }, {
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
      supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    });

    const { data: { session }, error } = await supabase.auth.getSession();

    return NextResponse.json({
      ok: true,
      hasSession: !!session,
      user: session?.user ?? null,
      error: error?.message ?? null,
    }, { status: 200 });
  } catch (e: unknown) {
    const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred';
    return NextResponse.json({ ok: false, error: errorMessage }, { status: 500 });
  }
}
