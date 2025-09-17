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

// ✅ POST - add item to cart (with duplicate handling and vendor validation)
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { user_id, meal_id, quantity = 1, vendor_id } = body;

    if (!user_id || !meal_id) {
      return NextResponse.json(
        { error: "user_id and meal_id are required" },
        { status: 400 }
      );
    }

    // Check existing cart items for this user
    const { data: existingCart, error: cartCheckError } = await supabase
      .from("cart")
      .select(`
        cart_id, meal_id, quantity, vendor_id,
        meals (id, vendor_id)
      `)
      .eq("user_id", user_id);

    if (cartCheckError) {
      console.error("Supabase cart check error:", cartCheckError.message);
      return NextResponse.json({ error: cartCheckError.message }, { status: 500 });
    }

    // Get vendor_id from meal if not provided
    let itemVendorId = vendor_id;
    if (!itemVendorId) {
      const { data: mealData, error: mealError } = await supabase
        .from("meals")
        .select("vendor_id")
        .eq("id", meal_id)
        .single();

      if (mealError) {
        console.error("Supabase meal check error:", mealError.message);
        return NextResponse.json({ error: "Meal not found" }, { status: 404 });
      }
      itemVendorId = mealData.vendor_id;
    }

    // Define a type for the cart item
    type CartItem = {
      cart_id: string;
      meal_id: string;
      quantity: number;
      vendor_id: string;
      meals: Array<{
        id: string;
        vendor_id: string;
        [key: string]: unknown;
      }>;
    };

    // Check vendor restriction - if cart has items from different vendor, reject
    if (existingCart && existingCart.length > 0) {
      const firstItem = existingCart[0] as CartItem;
      const existingVendorId = firstItem.meals?.[0]?.vendor_id || firstItem.vendor_id;
      if (existingVendorId && existingVendorId !== itemVendorId) {
        return NextResponse.json({
          error: "Cannot add items from different vendors. Please clear your cart first.",
          needsClearCart: true,
          currentVendor: existingVendorId,
          newVendor: itemVendorId
        }, { status: 400 });
      }
    }

    // Check if this specific item already exists in cart
    const existingItem = existingCart?.find(item => item.meal_id === meal_id);

    let result;

    if (existingItem) {
      // Update existing item quantity
      const newQuantity = existingItem.quantity + quantity;
      const { data, error } = await supabase
        .from("cart")
        .update({ 
          quantity: newQuantity, 
          updated_at: new Date().toISOString(),
          vendor_id: itemVendorId
        })
        .eq("cart_id", existingItem.cart_id)
        .select();

      if (error) {
        console.error("Supabase UPDATE error:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
      result = data[0];
    } else {
      // Insert new item
      const { data, error } = await supabase
        .from("cart")
        .insert([{ user_id, meal_id, quantity, vendor_id: itemVendorId }])
        .select();

      if (error) {
        console.error("Supabase INSERT error:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
      result = data[0];
    }

    return NextResponse.json(result);
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
