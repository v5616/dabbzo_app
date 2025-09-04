import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Create Supabase client (server-side)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! // Service key (not anon key)
);

// ✅ GET - fetch order history for a user
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("user_id");

  if (!userId) {
    return NextResponse.json({ error: "user_id is required" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("order_history")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

// ✅ POST - add a new order
export async function POST(req: Request) {
  const body = await req.json();

  const {
    user_id,
    quantity,
    price,
    subscription_type,
    delivery_date,
    delivery_address,
    payment_status,
    order_status,
  } = body;

  if (!user_id || !quantity || !price || !delivery_date) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("order_history")
    .insert([
      {
        user_id,
        quantity,
        price,
        subscription_type,
        delivery_date,
        delivery_address,
        payment_status,
        order_status,
      },
    ])
    .select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data[0]);
}
