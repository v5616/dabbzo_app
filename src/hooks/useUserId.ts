"use client";

import { useState, useEffect } from 'react';
import { userStorage } from '@/lib/userStorage';

// Client-side hook to get userId from localStorage
export const useUserId = () => {
  const [userId, setUserId] = useState<string>('');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Initialize userId from localStorage on client-side
    const id = userStorage.initializeUserId();
    setUserId(id);
    setIsLoaded(true);
  }, []);

  const updateUserId = (newUserId: string) => {
    userStorage.setUserId(newUserId);
    setUserId(newUserId);
  };

  const clearUserId = () => {
    userStorage.clearUserId();
    setUserId('');
  };

  return {
    userId,
    isLoaded,
    updateUserId,
    clearUserId
  };
};
