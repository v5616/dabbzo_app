import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// ✅ GET - fetch cart items for a user
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("user_id");

  if (!userId) {
    return NextResponse.json({ error: "user_id is required" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("cart")
    .select(
      `
      cart_id, quantity, created_at, updated_at,
      meals (id, name, price, image_url)
    `
    )
    .eq("user_id", userId);

  if (error) {
    console.error("Supabase GET error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

// ✅ POST - add item to cart
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { user_id, meal_id, quantity } = body;

    if (!user_id || !meal_id) {
      return NextResponse.json(
        { error: "user_id and meal_id are required" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("cart")
      .insert([{ user_id, meal_id, quantity }])
      .select();

    if (error) {
      console.error("Supabase POST error:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data[0]);
  } catch (err: unknown) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Unknown error' }, { status: 500 });
  }
}

// ✅ PUT - update quantity in cart
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { cart_id, quantity } = body;

    if (!cart_id || !quantity) {
      return NextResponse.json(
        { error: "cart_id and quantity are required" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("cart")
      .update({ quantity })
      .eq("cart_id", cart_id)
      .select();

    if (error) {
      console.error("Supabase PUT error:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data[0]);
  } catch (err: unknown) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Unknown error' }, { status: 500 });
  }
}

// ✅ DELETE - remove item from cart
export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const cartId = searchParams.get("cart_id");

  if (!cartId) {
    return NextResponse.json({ error: "cart_id is required" }, { status: 400 });
  }

  const { error } = await supabase.from("cart").delete().eq("cart_id", cartId);

  if (error) {
    console.error("Supabase DELETE error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
