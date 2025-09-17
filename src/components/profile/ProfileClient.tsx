"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/providers/AuthProvider";
import Image from "next/image";

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

interface ProfileClientProps {
  initialUser: User | undefined;
  userId: string;
}

export default function ProfileClient({
  initialUser,
  userId,
}: ProfileClientProps) {
  const { user: authUser, signOut } = useAuth();

  // Use initialUser from SSR as base, merge with authUser if available
  const userData = initialUser || authUser;

  const [userState, setUser] = useState({
    name: (userData as User)?.name || "John Doe",
    email: (userData as User)?.email || "john.doe@example.com",
    phone: (userData as User)?.phone || "+91 9876543210",
    address: (userData as User)?.address || "123 Food Street, Foodville, Mumbai - 400001",
    referralCode: (userData as User)?.referralCode || "JOHN2024",
    profilePicture: (userData as User)?.profilePicture || "",
  });

  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [newAddress, setNewAddress] = useState(userState.address);
  const [newName, setNewName] = useState(userState.name);
  const [referralCopied, setReferralCopied] = useState(false);
  const [showReferralSuccess, setShowReferralSuccess] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  // Update local state when userData changes
  useEffect(() => {
    if (userData) {
      const newUserState = {
        name: (userData as User).name || "John Doe",
        email: (userData as User).email || "john.doe@example.com",
        phone: (userData as User).phone || "+91 9876543210",
        address:
          (userData as User).address || "123 Food Street, Foodville, Mumbai - 400001",
        referralCode: (userData as User).referralCode || "JOHN2024",
        profilePicture: (userData as User).profilePicture || "",
      };
      setUser(newUserState);
      setNewAddress(newUserState.address);
      setNewName(newUserState.name);
    }
  }, [userData]);

  const handleAddressUpdate = async () => {
    if (!userId) return;

    setIsUpdating(true);
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ address: newAddress }),
      });

      if (response.ok) {
        setUser({ ...userState, address: newAddress });
        setIsEditingAddress(false);
      } else {
        console.error("Failed to update address");
      }
    } catch (error) {
      console.error("Error updating address:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleNameUpdate = async () => {
    if (!userId) return;

    setIsUpdating(true);
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newName }),
      });

      if (response.ok) {
        setUser({ ...userState, name: newName });
        setIsEditingName(false);
      } else {
        console.error("Failed to update name");
      }
    } catch (error) {
      console.error("Error updating name:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleProfilePictureChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files[0] && userId) {
      const file = e.target.files[0];

      // Create a preview URL for immediate feedback
      const reader = new FileReader();
      reader.onload = async () => {
        const base64String = reader.result as string;
        setUser({ ...userState, profilePicture: base64String });

        // Update in database
        try {
          const response = await fetch(`/api/users/${userId}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ profilePicture: base64String }),
          });

          if (!response.ok) {
            console.error("Failed to update profile picture");
            // Revert on error
            setUser({
              ...userState,
              profilePicture: (userData as User)?.profilePicture || "",
            });
          }
        } catch (error) {
          console.error("Error updating profile picture:", error);
          // Revert on error
          setUser({
            ...userState,
            profilePicture: (userData as User)?.profilePicture || "",
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const copyReferralCode = () => {
    navigator.clipboard.writeText(userState.referralCode);
    setReferralCopied(true);
    setTimeout(() => setReferralCopied(false), 2000);
  };

  const shareReferral = () => {
    setShowReferralSuccess(true);
    setTimeout(() => setShowReferralSuccess(false), 3000);
  };

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <>
      {/* Logout Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={handleLogout}
          className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          Logout
        </button>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
        <div className="p-6">
          <div className="flex items-center mb-6">
            <div className="bg-gradient-to-r from-primary to-secondary rounded-full p-1 relative">
              <div className="bg-white rounded-full p-1">
                {userState.profilePicture ? (
                  <Image
                    src={userState.profilePicture}
                    alt={userState.name}
                    className="h-20 w-20 rounded-full object-cover"
                  />
                ) : (
                  <div className="h-20 w-20 rounded-full bg-gray-200 flex items-center justify-center text-2xl font-bold text-gray-600">
                    {userState.name
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")}
                  </div>
                )}
              </div>
              <label
                htmlFor="profile-upload"
                className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-md cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </label>
              <input
                id="profile-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleProfilePictureChange}
              />
            </div>
            <div className="ml-6">
              {isEditingName ? (
                <div>
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="text-2xl font-bold border-b border-gray-300 focus:outline-none focus:border-primary pb-1 w-full"
                    disabled={isUpdating}
                  />
                  <div className="mt-2 flex space-x-2">
                    <button
                      onClick={handleNameUpdate}
                      disabled={isUpdating}
                      className="px-3 py-1 text-sm bg-primary text-white rounded-md hover:bg-primary-dark disabled:opacity-50"
                    >
                      {isUpdating ? "Saving..." : "Save"}
                    </button>
                    <button
                      onClick={() => {
                        setNewName(userState.name);
                        setIsEditingName(false);
                      }}
                      disabled={isUpdating}
                      className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center">
                  <h1 className="text-2xl font-bold">{userState.name}</h1>
                  <button
                    onClick={() => setIsEditingName(true)}
                    className="ml-2 text-primary hover:text-primary-dark"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      />
                    </svg>
                  </button>
                </div>
              )}
              <span className="font-medium">{userState.email}</span>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">
                Phone Number
              </h3>
              <span className="font-medium">{userState.phone}</span>
            </div>

            <div>
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium text-gray-500">
                  Delivery Address
                </h3>
                <button
                  onClick={() => setIsEditingAddress(true)}
                  className="text-blue-500 hover:underline ml-2"
                >
                  Edit
                </button>
              </div>

              {isEditingAddress ? (
                <div className="mt-1">
                  <textarea
                    value={newAddress}
                    onChange={(e) => setNewAddress(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                    placeholder={userState.address}
                    disabled={isUpdating}
                    rows={3}
                  />
                  <div className="mt-2 flex space-x-2">
                    <button
                      onClick={handleAddressUpdate}
                      disabled={isUpdating}
                      className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark disabled:opacity-50"
                    >
                      {isUpdating ? "Saving..." : "Save"}
                    </button>
                    <button
                      onClick={() => {
                        setNewAddress(userState.address);
                        setIsEditingAddress(false);
                      }}
                      disabled={isUpdating}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <p className="mt-1 text-lg">{userState.address}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Referral Card */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            Refer a Friend
          </h2>

          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4 rounded-lg mb-4">
            <p className="text-gray-700 mb-2">
              Share your referral code with friends and get one meal free when
              they sign up!
            </p>
            <div className="flex items-center">
              <div className="bg-white border border-gray-300 rounded-l-md px-4 py-2 font-mono font-medium flex-grow">
                {userState.referralCode}
              </div>
              <button
                onClick={copyReferralCode}
                className="bg-primary text-white px-4 py-2 rounded-r-md hover:bg-primary-dark"
              >
                {referralCopied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={shareReferral}
              className="flex-1 bg-primary text-white px-4 py-3 rounded-md hover:bg-primary-dark flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                />
              </svg>
              Share with Friends
            </button>
            <Link
              href="/vendors"
              className="flex-1 bg-gray-100 text-gray-700 px-4 py-3 rounded-md hover:bg-gray-200 flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              Order Now
            </Link>
          </div>

          {showReferralSuccess && (
            <div className="mt-4 bg-green-100 text-green-800 p-3 rounded-md animate-fadeIn">
              Referral link shared successfully! Your friend will get a
              notification.
            </div>
          )}
        </div>
      </div>
    </>
  );
}
