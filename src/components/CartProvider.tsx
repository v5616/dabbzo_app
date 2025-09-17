"use client";

import { useCartIntegration } from '@/hooks/useCartIntegration';
import { ReactNode } from 'react';

interface CartProviderProps {
  children: ReactNode;
}

export default function CartProvider({ children }: CartProviderProps) {
  // This will automatically handle cart loading and syncing
  useCartIntegration();

  return <>{children}</>;
}
