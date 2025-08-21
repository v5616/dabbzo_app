import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface MenuItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

export interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartStore {
  vendorId: string | null;
  vendorName: string | null;
  items: CartItem[];
  addItem: (vendorId: string, vendorName: string, item: MenuItem) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      vendorId: null,
      vendorName: null,
      items: [],
      
      addItem: (vendorId, vendorName, item) => {
        const { items, vendorId: currentVendorId } = get();
        
        // If adding from a different vendor, clear the cart first
        if (currentVendorId && currentVendorId !== vendorId) {
          set({ items: [], vendorId, vendorName });
        }
        
        // Check if item already exists in cart
        const existingItem = items.find((cartItem) => cartItem._id === item._id);
        
        if (existingItem) {
          // Update quantity if item exists
          set({
            items: items.map((cartItem) =>
              cartItem._id === item._id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
            ),
            vendorId,
            vendorName,
          });
        } else {
          // Add new item
          set({
            items: [...items, { _id: item._id, name: item.name, price: item.price, quantity: 1 }],
            vendorId,
            vendorName,
          });
        }
      },
      
      removeItem: (itemId) => {
        const { items } = get();
        set({
          items: items.filter((item) => item._id !== itemId),
        });
        
        // If cart is empty, reset vendor info
        if (items.length === 1) {
          set({ vendorId: null, vendorName: null });
        }
      },
      
      updateQuantity: (itemId, quantity) => {
        const { items } = get();
        
        if (quantity <= 0) {
          set({
            items: items.filter((item) => item._id !== itemId),
          });
        } else {
          set({
            items: items.map((item) =>
              item._id === itemId ? { ...item, quantity } : item
            ),
          });
        }
      },
      
      clearCart: () => {
        set({ items: [], vendorId: null, vendorName: null });
      },
      
      getTotalItems: () => {
        const { items } = get();
        return items.reduce((total, item) => total + item.quantity, 0);
      },
      
      getTotalPrice: () => {
        const { items } = get();
        return items.reduce((total, item) => total + item.price * item.quantity, 0);
      },
    }),
    {
      name: 'dabbzo-cart',
    }
  )
);