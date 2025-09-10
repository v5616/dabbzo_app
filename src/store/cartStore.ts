import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface MenuItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  cart_id?: string; // For backend sync
}

interface CartStore {
  vendorId: string | null;
  vendorName: string | null;
  items: CartItem[];
  isLoading: boolean;
  error: string | null;
  addItem: (
    vendorId: string,
    vendorName: string,
    item: MenuItem,
    userId?: string
  ) => Promise<void>;
  removeItem: (itemId: string, userId?: string) => Promise<void>;
  updateQuantity: (
    itemId: string,
    quantity: number,
    userId?: string
  ) => Promise<void>;
  clearCart: (userId?: string) => Promise<void>;
  loadCartFromBackend: (userId: string) => Promise<void>;
  syncWithBackend: (userId: string) => Promise<void>;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      vendorId: null,
      vendorName: null,
      items: [],
      isLoading: false,
      error: null,

      addItem: async (vendorId, vendorName, item, userId) => {
        const { items, vendorId: currentVendorId } = get();
        set({ isLoading: true, error: null });

        try {
          // If adding from a different vendor, clear the cart first
          if (currentVendorId && currentVendorId !== vendorId) {
            if (userId) {
              await get().clearCart(userId);
            }
            set({ items: [], vendorId, vendorName });
          }

          // Check if item already exists in cart
          const existingItem = items.find(
            (cartItem) => cartItem.id === item._id
          );

          if (existingItem) {
            // Update quantity if item exists
            const newQuantity = existingItem.quantity + 1;
            if (userId && existingItem.cart_id) {
              // Update in backend
              await fetch("/api/cart", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  cart_id: existingItem.cart_id,
                  quantity: newQuantity,
                }),
              });
            }

            set({
              items: items.map((cartItem) =>
                cartItem.id === item._id
                  ? { ...cartItem, quantity: newQuantity }
                  : cartItem
              ),
              vendorId,
              vendorName,
            });
          } else {
            // Add new item
            let cart_id;
            if (userId) {
              // Add to backend
              const response = await fetch("/api/cart", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  user_id: userId,
                  meal_id: item._id,
                  quantity: 1,
                }),
              });
              const result = await response.json();
              cart_id = result.cart_id;
            }

            set({
              items: [
                ...items,
                {
                  id: item._id,
                  name: item.name,
                  price: item.price,
                  quantity: 1,
                  cart_id,
                },
              ],
              vendorId,
              vendorName,
            });
          }
        } catch (error) {
          set({
            error:
              error instanceof Error ? error.message : "Failed to add item",
          });
        } finally {
          set({ isLoading: false });
        }
      },

      removeItem: async (itemId, userId) => {
        const { items } = get();
        set({ isLoading: true, error: null });

        try {
          const itemToRemove = items.find((item) => item.id === itemId);

          if (userId && itemToRemove?.cart_id) {
            // Remove from backend
            await fetch(`/api/cart?cart_id=${itemToRemove.cart_id}`, {
              method: "DELETE",
            });
          }

          set({
            items: items.filter((item) => item.id !== itemId),
          });

          // If cart is empty, reset vendor info
          if (items.length === 1) {
            set({ vendorId: null, vendorName: null });
          }
        } catch (error) {
          set({
            error:
              error instanceof Error ? error.message : "Failed to remove item",
          });
        } finally {
          set({ isLoading: false });
        }
      },

      updateQuantity: async (itemId, quantity, userId) => {
        const { items } = get();
        set({ isLoading: true, error: null });

        try {
          const itemToUpdate = items.find((item) => item.id === itemId);

          if (quantity <= 0) {
            await get().removeItem(itemId, userId);
            return;
          }

          if (userId && itemToUpdate?.cart_id) {
            // Update in backend
            await fetch("/api/cart", {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                cart_id: itemToUpdate.cart_id,
                quantity,
              }),
            });
          }

          set({
            items: items.map((item) =>
              item.id === itemId ? { ...item, quantity } : item
            ),
          });
        } catch (error) {
          set({
            error:
              error instanceof Error
                ? error.message
                : "Failed to update quantity",
          });
        } finally {
          set({ isLoading: false });
        }
      },

      clearCart: async (userId) => {
        const { items } = get();
        set({ isLoading: true, error: null });

        try {
          if (userId) {
            // Clear from backend
            await Promise.all(
              items.map((item) =>
                item.cart_id
                  ? fetch(`/api/cart?cart_id=${item.cart_id}`, {
                      method: "DELETE",
                    })
                  : Promise.resolve()
              )
            );
          }

          set({ items: [], vendorId: null, vendorName: null });
        } catch (error) {
          set({
            error:
              error instanceof Error ? error.message : "Failed to clear cart",
          });
        } finally {
          set({ isLoading: false });
        }
      },

      loadCartFromBackend: async (userId) => {
        set({ isLoading: true, error: null });

        try {
          const response = await fetch(`/api/cart?user_id=${userId}`);
          const cartData = await response.json();

          if (response.ok) {
            const items: CartItem[] = cartData.map(
              (item: {
                cart_id: string;
                quantity: number;
                meals: { id: string; name: string; price: number };
              }) => ({
                _id: item.meals.id,
                name: item.meals.name,
                price: item.meals.price,
                quantity: item.quantity,
                cart_id: item.cart_id,
              })
            );

            set({ items });
          } else {
            set({ error: cartData.error || "Failed to load cart" });
          }
        } catch (error) {
          set({
            error:
              error instanceof Error ? error.message : "Failed to load cart",
          });
        } finally {
          set({ isLoading: false });
        }
      },

      syncWithBackend: async (userId) => {
        await get().loadCartFromBackend(userId);
      },

      getTotalItems: () => {
        const { items } = get();
        return items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        const { items } = get();
        return items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },
    }),
    {
      name: "dabbzo-cart",
    }
  )
);
