"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { supabase } from "@/lib/supabaseClient";
import type { User } from "@supabase/supabase-js";
import { useGlobalToast } from "@/providers/ToastProvider";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}): React.ReactElement {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { showToast } = useGlobalToast();

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  useEffect(() => {
    let isMounted = true;

    const getInitialSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (isMounted) {
          setUser(session?.user ?? null);
          
          // In production, add delay to prevent flash. In dev, immediate for better DX
          const delay = process.env.NODE_ENV === 'production' ? 150 : 0;
          setTimeout(() => {
            if (isMounted) {
              setLoading(false);
            }
          }, delay);
        }
      } catch (error) {
        console.error('Error getting initial session:', error);
        if (isMounted) {
          setUser(null);
          const delay = process.env.NODE_ENV === 'production' ? 150 : 0;
          setTimeout(() => {
            if (isMounted) {
              setLoading(false);
            }
          }, delay);
        }
      }
    };

    getInitialSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (isMounted) {
        setUser(session?.user ?? null);
        
        // In production, be more careful about loading states
        if (process.env.NODE_ENV === 'production') {
          // Only set loading to false for explicit sign out
          if (event === 'SIGNED_OUT') {
            setLoading(false);
          }
        } else {
          // In development, be more responsive
          setLoading(false);
        }
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [showToast]);

  return (
    <AuthContext.Provider value={{ user, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
