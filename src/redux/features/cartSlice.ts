import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define types for cart items
export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  vendorId: string;
  vendorName: string;
  image?: string;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

// Initial state
const initialState: CartState = {
  items: [],
  isOpen: false,
};

// Create the slice
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        existingItem.quantity += action.payload.quantity || 1;
      } else {
        state.items.push(action.payload);
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },
    openCart: (state) => {
      state.isOpen = true;
    },
    closeCart: (state) => {
      state.isOpen = false;
    },
  },
});

// Export actions and reducer
export const { 
  addItem, 
  removeItem, 
  updateQuantity, 
  clearCart, 
  toggleCart,
  openCart,
  closeCart
} = cartSlice.actions;

// Selectors
export const selectCartItems = (state: { cart: CartState }) => state.cart.items;
export const selectCartTotal = (state: { cart: CartState }) => 
  state.cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
export const selectCartItemsCount = (state: { cart: CartState }) => 
  state.cart.items.reduce((count, item) => count + item.quantity, 0);
export const selectIsCartOpen = (state: { cart: CartState }) => state.cart.isOpen;

export default cartSlice.reducer;