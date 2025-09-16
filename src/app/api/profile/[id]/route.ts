import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

type ProfilePreferences = {
  address?: string;
  referralCode?: string;
  [key: string]: unknown;
};

type ProfileRow = {
  id: string;
  email: string | null;
  full_name: string | null;
  profile_image: string | null;
  preferences: ProfilePreferences | null;
  created_at: string | null;
  updated_at: string | null;
};
type UserMetadata = {
  full_name?: string;
  name?: string;
  picture?: string;
  address?: string;
  referralCode?: string;
  [key: string]: unknown; // fallback for extra keys
};

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params;
  const userId = resolvedParams.id;

  try {
    const hasServiceKey = !!process.env.SUPABASE_SERVICE_ROLE_KEY;
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;

    if (hasServiceKey) {
      // Server-side admin path (preferred for API routes)
      const admin = createClient(
        supabaseUrl,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
      );

      // 1) Fetch profile from your own table first
      const { data: profile, error: profileError } = await admin
        .from("profiles")
        .select(
          "id,email,full_name,profile_image,preferences,created_at,updated_at"
        )
        .eq("id", userId)
        .single<ProfileRow>();

      if (profileError && profileError.code !== "PGRST116") {
        throw profileError;
      }

      // 2) Optionally enrich with auth user details
      const { data: authRes } = await admin.auth.admin.getUserById(userId);
      const authUser = authRes?.user || null;

      const metadata = authUser?.user_metadata as UserMetadata | undefined;

      const user = {
        id: userId,
        email: profile?.email ?? authUser?.email ?? "",
        name:
          profile?.full_name ||
          metadata?.full_name ||
          metadata?.name ||
          (authUser?.email ? authUser.email.split("@")[0] : ""),
        phone: authUser?.phone ?? null,
        address: profile?.preferences?.address ?? null,
        referralCode: profile?.preferences?.referralCode ?? null,
        profilePicture: profile?.profile_image || metadata?.picture || null,
        created_at: profile?.created_at ?? authUser?.created_at ?? null,
        updated_at: profile?.updated_at ?? null,
      };

      return NextResponse.json({ user });
    }

    // Fallback: use a cookie-bound client with RLS (requires user to be signed in)
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

    const { data: sessionRes, error: sessionErr } =
      await supabase.auth.getUser();
    if (sessionErr || !sessionRes?.user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }
    if (sessionRes.user.id !== userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select(
        "id,email,full_name,profile_image,preferences,created_at,updated_at"
      )
      .eq("id", userId)
      .single<ProfileRow>();

    if (profileError) {
      return NextResponse.json(
        { error: profileError.message },
        { status: 400 }
      );
    }

    const user = {
      id: userId,
      email: profile?.email ?? sessionRes.user.email ?? "",
      name: profile?.full_name || (sessionRes.user.email?.split("@")[0] ?? ""),
      phone: sessionRes.user.phone ?? null,
      address: profile?.preferences?.address ?? null,
      referralCode: profile?.preferences?.referralCode ?? null,
      profilePicture: profile?.profile_image ?? null,
      created_at: profile?.created_at ?? null,
      updated_at: profile?.updated_at ?? null,
    };

    return NextResponse.json({ user });
  } catch (error: unknown) {
    console.error("Profile API Error:", error);
    const message = error instanceof Error ? error.message : "Unexpected error";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
