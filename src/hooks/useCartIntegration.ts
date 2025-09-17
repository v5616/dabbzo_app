import { useEffect } from 'react';
import { useCartStore } from '@/store/cartStore';
import { useUserId } from '@/hooks/useUserId';

export const useCartIntegration = () => {
  const { userId, isLoaded } = useUserId();
  const { loadCartHybrid, syncWithBackend, items } = useCartStore();

  // Load cart using hybrid approach (API + localStorage) when userId is available
  useEffect(() => {
    if (isLoaded && userId) {
      console.log('Loading cart using hybrid approach for userId:', userId);
      loadCartHybrid(userId);
    }
  }, [userId, isLoaded, loadCartHybrid]);

  // Sync cart periodically when userId is available
  useEffect(() => {
    if (!isLoaded || !userId) return;

    const syncInterval = setInterval(() => {
      syncWithBackend(userId);
    }, 30000); // Sync every 30 seconds

    return () => clearInterval(syncInterval);
  }, [userId, isLoaded, syncWithBackend]);

  return {
    isLoggedIn: isLoaded && !!userId,
    cartItemCount: items.length,
    userId: userId
  };
};
