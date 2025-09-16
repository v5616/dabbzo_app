"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ProfileClient from "@/components/profile/ProfileClient";
import { useAuth } from "@/providers/AuthProvider";

interface User {
  id: string;
  name?: string;
  email: string;
  phone?: string;
  address?: string;
  referralCode?: string;
  profilePicture?: string;
  created_at?: string;
  updated_at?: string;
}

async function fetchUserProfile(
  userId: string
): Promise<{ user?: User; error?: string }> {
  try {
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
      }/api/profile/${userId}`,
      {
        cache: "no-store", // Ensure fresh data on each request
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch user: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error);
    }

    return { user: data.user };
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return {
      error:
        error instanceof Error ? error.message : "Failed to fetch user profile",
    };
  }
}

export default function ClientOnlyProfile() {
  const { user: authUser, loading } = useAuth();
  const [profileUser, setProfileUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      if (!authUser) {
        setIsLoading(false);
        return;
      }

      try {
        const { user, error } = await fetchUserProfile(authUser.id);
        if (error) {
          setError(error);
        } else {
          setProfileUser(user || null);
        }
      } catch (err) {
        setError("Failed to load profile");
      } finally {
        setIsLoading(false);
      }
    }

    if (!loading) {
      loadProfile();
    }
  }, [authUser, loading]);

  if (loading || isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-8"></div>
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!authUser) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <h2 className="font-bold">Authentication Required</h2>
            <p>Please log in to view your profile.</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <h2 className="font-bold">Error loading profile</h2>
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            My Profile
          </h1>
        </div>

        {/* Pass client data to ProfileClient component for interactive features */}
        <ProfileClient initialUser={profileUser || undefined} userId={authUser.id} />

        {/* Order History Link */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <Link
            href="/history"
            className="p-6 flex justify-between items-center hover:bg-gray-50"
          >
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-3 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              <div>
                <h3 className="font-medium">View Order History</h3>
                <p className="text-sm text-gray-500">
                  Check your past orders and reorder favorites
                </p>
              </div>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
