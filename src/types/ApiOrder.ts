// TypeScript interface for Order API response
export interface ApiOrder {
  order_id: number;
  user_id: string;
  quantity: number;
  price: number;
  subscription_type: 'one-time' | 'daily' | 'weekly' | 'monthly';
  delivery_date: string; // ISO date string
  delivery_address: string;
  payment_status: 'pending' | 'paid' | 'failed';
  order_status: 'pending' | 'confirmed' | 'delivered' | 'cancelled';
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
}

// Array type for multiple orders
export type ApiOrdersResponse = ApiOrder[];
