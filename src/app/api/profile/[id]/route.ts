import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

type UserMetadata = {
  full_name?: string;
  name?: string;
  picture?: string;
  address?: string;
  referralCode?: string;
  [key: string]: unknown;
};

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const userId = params.id;

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const hasServiceKey = !!process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (hasServiceKey) {
      // ✅ Use admin client with service role key
      const admin = createClient(
        supabaseUrl,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
      );

      const { data: authRes, error: authError } =
        await admin.auth.admin.getUserById(userId);
      if (authError) throw authError;

      const authUser = authRes?.user || null;
      if (!authUser) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }

      const metadata = authUser.user_metadata as UserMetadata | undefined;

      const user = {
        id: authUser.id,
        email: authUser.email ?? "",
        name:
          metadata?.full_name ||
          metadata?.name ||
          (authUser.email ? authUser.email.split("@")[0] : ""),
        phone: authUser.phone ?? null,
        address: metadata?.address ?? null,
        referralCode: metadata?.referralCode ?? null,
        profilePicture: metadata?.picture ?? null,
        created_at: authUser.created_at ?? null,
        updated_at: authUser.updated_at ?? null,
      };

      return NextResponse.json({ user });
    }

    // ✅ Fallback: cookie-bound client with RLS
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

    // Directly return session user info
    const metadata = sessionRes.user.user_metadata as UserMetadata | undefined;

    const user = {
      id: sessionRes.user.id,
      email: sessionRes.user.email ?? "",
      name:
        metadata?.full_name ||
        metadata?.name ||
        (sessionRes.user.email ? sessionRes.user.email.split("@")[0] : ""),
      phone: sessionRes.user.phone ?? null,
      address: metadata?.address ?? null,
      referralCode: metadata?.referralCode ?? null,
      profilePicture: metadata?.picture ?? null,
      created_at: sessionRes.user.created_at ?? null,
      updated_at: sessionRes.user.updated_at ?? null,
    };

    return NextResponse.json({ user });
  } catch (error: unknown) {
    console.error("Profile API Error:", error);
    const message =
      error instanceof Error ? error.message : JSON.stringify(error);
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
