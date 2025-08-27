"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/providers/AuthProvider";

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, loading } = useAuth(); // Use the useAuth hook instead

  const isActive = (path: string) => {
    return pathname === path;
  };

  console.log(user, "useruser"); // This will now show the user data

  // Remove the duplicate authentication logic
  // No need for the useEffect and supabase client here

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container-custom py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-orange-500">
              Dabbzo
            </span>
            <span className="hidden sm:inline-block bg-yellow-200 text-yellow-800 text-xs px-2 py-1 rounded-full font-semibold">
              Tiffin Service
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link
              href="/"
              className={`transition-all duration-300 ${
                isActive("/") ? "nav-link-active" : "hover:text-red-500"
              }`}
            >
              Home
            </Link>
            <Link
              href="/history"
              className={`transition-all duration-300 ${
                isActive("/history") ? "nav-link-active" : "hover:text-red-500"
              }`}
            >
              Order History
            </Link>
            <Link
              href="/my-subscriptions"
              className={`transition-all duration-300 ${
                isActive("/my-subscriptions")
                  ? "nav-link-active"
                  : "hover:text-red-500"
              }`}
            >
              My Subscriptions
            </Link>
            <Link
              href="/about"
              className={`transition-all duration-300 ${
                isActive("/about") ? "nav-link-active" : "hover:text-red-500"
              }`}
            >
              About
            </Link>
            <Link
              href="/terms"
              className={`transition-all duration-300 ${
                isActive("/terms") ? "nav-link-active" : "hover:text-red-500"
              }`}
            >
              Terms & Conditions
            </Link>
            <div className="h-5 w-px bg-gray-300 mx-2"></div>
            <Link
              href="/profile"
              className={`transition-all duration-300 ${
                isActive("/profile") ? "nav-link-active" : "hover:text-red-500"
              }`}
            >
              <div className="flex items-center space-x-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <span>Profile</span>
              </div>
            </Link>
            {!user && (
              <Link
                href="/login"
                className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-medium py-2 px-4 rounded-full transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-500 hover:text-gray-700 focus:outline-none p-2 rounded-md hover:bg-gray-100"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-3 animate-fadeIn">
            <Link
              href="/"
              className={`block px-3 py-2 rounded-md ${
                isActive("/")
                  ? "bg-red-50 text-red-500 font-medium"
                  : "hover:bg-gray-50 hover:text-red-500"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/history"
              className={`block px-3 py-2 rounded-md ${
                isActive("/history")
                  ? "bg-red-50 text-red-500 font-medium"
                  : "hover:bg-gray-50 hover:text-red-500"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Order History
            </Link>
            <Link
              href="/my-subscriptions"
              className={`block px-3 py-2 rounded-md ${
                isActive("/my-subscriptions")
                  ? "bg-red-50 text-red-500 font-medium"
                  : "hover:bg-gray-50 hover:text-red-500"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              My Subscriptions
            </Link>
            <Link
              href="/about"
              className={`block px-3 py-2 rounded-md ${
                isActive("/about")
                  ? "bg-red-50 text-red-500 font-medium"
                  : "hover:bg-gray-50 hover:text-red-500"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/terms"
              className={`block px-3 py-2 rounded-md ${
                isActive("/terms")
                  ? "bg-red-50 text-red-500 font-medium"
                  : "hover:bg-gray-50 hover:text-red-500"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Terms & Conditions
            </Link>
            <div className="border-t border-gray-200 my-2"></div>
            <Link
              href="/profile"
              className={`block px-3 py-2 rounded-md ${
                isActive("/profile")
                  ? "bg-red-50 text-red-500 font-medium"
                  : "hover:bg-gray-50 hover:text-red-500"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Profile
            </Link>
            {!user && (
              <Link
                href="/login"
                className="block w-full text-center bg-gradient-to-r from-red-500 to-orange-500 text-white font-medium py-2 px-4 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
