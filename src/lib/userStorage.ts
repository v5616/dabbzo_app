// Utility functions for managing userId in localStorage
// This makes it easy to replace with API-based userId in the future

const USER_ID_KEY = 'dabbzo_user_id';
const FALLBACK_USER_ID = '26ee0f1c-09db-42c9-b3dd-2df094a6d7af';

export const userStorage = {
  // Get userId from localStorage, with fallback
  getUserId(): string {
    if (typeof window === 'undefined') {
      // Server-side rendering fallback
      return FALLBACK_USER_ID;
    }
    
    const storedUserId = localStorage.getItem(USER_ID_KEY);
    return storedUserId || FALLBACK_USER_ID;
  },

  // Set userId in localStorage
  setUserId(userId: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(USER_ID_KEY, userId);
    }
  },

  // Remove userId from localStorage
  clearUserId(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(USER_ID_KEY);
    }
  },

  // Initialize with fallback userId if none exists
  initializeUserId(): string {
    const userId = this.getUserId();
    if (userId === FALLBACK_USER_ID && typeof window !== 'undefined') {
      // Set the fallback in localStorage for consistency
      this.setUserId(FALLBACK_USER_ID);
    }
    return userId;
  }
};
